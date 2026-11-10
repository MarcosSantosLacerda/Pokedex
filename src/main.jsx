import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './css/App.css'
import './css/Common.css'
import './css/Header.css'
import './css/Toolbar.css'
import './css/PokemonList.css'
import './css/PokemonCard.css'
import './css/Modal.css'
import './css/PokemonDetails.css'
import './css/Compare.css'
import './css/Trainers.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
