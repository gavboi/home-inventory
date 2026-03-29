import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Scanner from './pages/scanner'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/inventory" element={<></>} />
      <Route path="/recipes" element={<></>} />
    </Routes>
  )
}

export default App
