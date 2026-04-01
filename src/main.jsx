import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import 'iconoir/css/iconoir.css'
import '@1doc/1ds-tokens/dist/css/primitives.css'
import '@1doc/1ds-tokens/dist/css/semantic.css'
import '@1doc/1ds-tokens/dist/css/theme-1doc.css'
import './index.css'
import App from './App.jsx'
import { initTheme } from '@1doc/1ds-react'

initTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
