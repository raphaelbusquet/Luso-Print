import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Wait for page to render before scrolling to element
      const id = hash.slice(1)
      const attempt = (tries = 0) => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else if (tries < 10) {
          setTimeout(() => attempt(tries + 1), 50)
        }
      }
      attempt()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}
