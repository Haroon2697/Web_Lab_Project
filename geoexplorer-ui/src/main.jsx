import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import 'leaflet/dist/leaflet.css'
import './styles/index.css'
import App from './App'

/* Map marker pulse animation (injected globally) */
const style = document.createElement('style')
style.textContent = `
  @keyframes mapPulse {
    0%   { transform: scale(1);   opacity: 0.7; }
    70%  { transform: scale(2.2); opacity: 0; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  .leaflet-container {
    background: #0f0f19 !important;
    font-family: inherit;
  }
  .leaflet-popup-content-wrapper {
    background: rgba(15,15,25,0.95) !important;
    border: 1px solid rgba(121,80,229,0.3) !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4) !important;
    backdrop-filter: blur(8px);
  }
  .leaflet-popup-tip {
    background: rgba(15,15,25,0.95) !important;
  }
  .leaflet-popup-close-button {
    color: #888 !important;
  }
  .leaflet-control-zoom a {
    background: rgba(15,15,25,0.9) !important;
    color: #ccc !important;
    border-color: rgba(121,80,229,0.2) !important;
  }
  .leaflet-control-zoom a:hover {
    background: rgba(121,80,229,0.3) !important;
    color: #fff !important;
  }
`
document.head.appendChild(style)

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
