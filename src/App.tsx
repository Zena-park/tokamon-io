import { useEffect, useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Footer from './components/Footer'
import FloatingCoins from './components/FloatingCoins'
import Navbar from './components/Navbar'

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <FloatingCoins />
      <Navbar scrollY={scrollY} />
      <Hero />
      <About />
      <Services />
      <Footer />
    </div>
  )
}

export default App
