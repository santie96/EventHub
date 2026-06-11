import { useEffect } from 'react';

function useSEO({ title, description }) {
  useEffect(() => {
    // Aggiorna il titolo della pagina
    if (title) {
      document.title = `${title} | EventHub`;
    } else {
      document.title = 'EventHub';
    }

    // Aggiorna la meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }

    // Cleanup opzionale (in genere non necessario per il SEO globale, 
    // ma utile se si vuole ripristinare il titolo precedente)
  }, [title, description]);
}

export default useSEO;
