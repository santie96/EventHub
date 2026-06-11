import { createContext, useContext, useState } from 'react'
import { registrationsAPI } from '../services/api'

const RegistrationsContext = createContext(null)

// Provider
export function RegistrationsProvider({ children }) {

  const [registrazioni, setRegistrazioni] = useState([])
  const [loading, setLoading] = useState(false)
  const [errore, setErrore] = useState(null)

  const caricaRegistrazioni = async () => {
    setLoading(true)
    setErrore(null)

    try {
      const datiRegistrazioni = await registrationsAPI.getAll()
      setRegistrazioni(datiRegistrazioni)
    } catch (err) {
      setErrore(err.message)
    } finally {
      setLoading(false)
    }
  }

  const caricaRegistrazioniEvento = async (id) => {
    setLoading(true)
    setErrore(null)

    try {
      const datiRegistrazioni = await registrationsAPI.getPublicByEventId(id)
      setRegistrazioni(datiRegistrazioni)
    } catch (err) {
      setErrore(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <RegistrationsContext.Provider value={{ registrazioni, loading, errore, caricaRegistrazioni, caricaRegistrazioniEvento }}>
      {children}
    </RegistrationsContext.Provider>
  )
}

export function useRegistrations() {
  return useContext(RegistrationsContext)
}
