// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { SupabaseProvider } from '../lib/context/supabaseProvider.js'
import Home from './components/Home/Home.jsx'
import './index.css'
import { SupabaseProvider } from '../lib/context/SupabaseProvider.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <SupabaseProvider>
    <Home />
  </SupabaseProvider>
  // </StrictMode>,
)
