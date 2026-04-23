import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ConsultationCard from './components/ConsultationCard'
import PricingSection from './components/PicingSection'
import TermsSection from './components/TermsSection'
import Footer from './components/Footer'
import { Toaster } from 'sonner'

const App = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.
  getItem('theme') : 'light'
)
  return (
    <div className='dark:bg-black relative'>
      <Toaster
        position="top-right" 
        richColors 
        closeButton
      />
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <PricingSection />
      <ConsultationCard />
      <TermsSection />
      <Footer />
    </div>
  )
}

export default App
