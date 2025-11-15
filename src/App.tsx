import { Routes, Route, } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Catalog from './pages/Catalog'
import Footer from './components/Footer'
import Background from './components/Background'

export default function App() {

  return (
    <div className="relative min-h-screen flex flex-col bg-white dark:bg-neutral-950">
    <Background />
      {/* Contenido por encima del fondo */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acerca" element={<About />} />
          <Route path="/consumo" element={<Catalog />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}
