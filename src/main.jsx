import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { preload } from 'react-dom'
import './index.css'
import App from './App.jsx'

// Preload critical resources
preload('/SteamAction_Logo.png', {
  as: 'image',
  fetchpriority: 'high'
})

// Preload vacuum image
preload('/vacuum.png', {
  as: 'image',
  fetchpriority: 'high'
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)




