import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/globals.css'
import { App } from './App'
import { LanguageRoot } from './i18n/LanguageRoot'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageRoot><App /></LanguageRoot>
    </BrowserRouter>
  </StrictMode>,
)
