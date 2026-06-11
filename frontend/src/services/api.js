const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

if (!import.meta.env.VITE_API_URL) {
  console.warn(
    '[api2.js] VITE_API_URL non definita nel file .env.\n' +
    'Usando il fallback: http://localhost:3000/api\n' +
    'Copia .env.example in .env per risolvere.'
  )
}

function getToken() {
  return localStorage.getItem('token')
}

async function request(method, path, body = null, baseUrl = BASE_URL) {
  const token = getToken()

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }

  if (body) options.body = JSON.stringify(body)

  let res
  try {
    res = await fetch(`${baseUrl}${path}`, options)
  } catch {
    throw new Error('Impossibile contattare il server. Controlla che il backend sia in esecuzione.')
  }

  const data = await res.json()

  if (res.status === 401) {
    window.dispatchEvent(new Event('auth:unauthorized'))
  }

  if (!data.successo) {
    const messaggioValidazione = data.errori?.map((errore) => errore.msg).join('\n')
    const err = new Error(data.errore || messaggioValidazione || 'Errore sconosciuto')
    err.status = res.status
    throw err
  }

  return data.dati
}

async function uploadRequest(method, path, formData, baseUrl = BASE_URL) {
  const token = getToken()

  const options = {
    method,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  }

  let res
  try {
    res = await fetch(`${baseUrl}${path}`, options)
  } catch {
    throw new Error('Impossibile contattare il server. Controlla che il backend sia in esecuzione.')
  }

  const data = await res.json()

  if (res.status === 401) {
    window.dispatchEvent(new Event('auth:unauthorized'))
  }

  if (!data.successo) {
    const messaggioValidazione = data.errori?.map((errore) => errore.msg).join('\n')
    const err = new Error(data.errore || messaggioValidazione || 'Errore sconosciuto')
    err.status = res.status
    throw err
  }

  return data.dati
}


// ── Autenticazione ────────────────────────────────────────────
export const authAPI = {
  login: (email, password) =>
    request('POST', '/users/login', { email, password }),

  registra: (dati) =>
    request('POST', '/users/registra', dati),
}

// ── Users ─────────────────────────────────────────────────────
export const usersAPI = {
  getAll: () => request('GET', '/users'),
  getById: (id) => request('GET', `/users/${id}`),
  aggiorna: (id, dati) => request('PATCH', `/users/${id}`, dati),
  aggiornaImmagineProfilo: (id, file) => {
    const formData = new FormData()
    formData.append('img_profile', file)
    return uploadRequest('PATCH', `/users/${id}/img-profile`, formData)
  },
  promuovi: (id, dati) => request('PATCH', `/users/${id}/promuovi`, dati),
  elimina: (id) => request('DELETE', `/users/${id}`),
}

// ── Events ────────────────────────────────────────────────────
export const eventsAPI = {
  getAll: () => request('GET', '/events'),
  getById: (id) => request('GET', `/events/${id}`),
  getByCategory: (category) => request('GET', `/events/category/${category}`),
  getByOrganizerId: (id) => request('GET', `/events/organizer/${id}`),
  crea: (dati) => request('POST', '/events', dati),
  aggiorna: (id, dati) => request('PATCH', `/events/${id}`, dati),
  aggiornaImmagine: (id, file) => {
    const formData = new FormData()
    formData.append('image', file)
    return uploadRequest('PATCH', `/events/${id}/image`, formData)
  },
  elimina: (id) => request('DELETE', `/events/${id}`),
}

// ── Registrations ─────────────────────────────────────────────
export const registrationsAPI = {
  getAll: () => request('GET', '/registrations'),
  getById: (id) => request('GET', `/registrations/${id}`),
  getByEventId: (id) => request('GET', `/registrations/event/${id}`),
  getPublicByEventId: (id) => request('GET', `/registrations/event/${id}/public`),
  getByUserId: (id) => request('GET', `/registrations/user/${id}`),
  crea: (dati) =>
    request('POST', '/registrations', typeof dati === 'object' ? dati : { event_id: dati }),
  elimina: (id) => request('DELETE', `/registrations/${id}`),
}
