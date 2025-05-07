import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Intro from './components/Intro'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Intro />
    <App />
  </StrictMode>,
)
