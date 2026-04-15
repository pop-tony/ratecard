import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ClientIntakeForm from './components/ClientIntakeForm'
import ConsultationCard from './components/ConsultationCard'
import PricingSection from './components/PicingSection'
import TermsSection from './components/TermsSection'
import Footer from './components/Footer'

const App = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.
  getItem('theme') : 'light'
)
  return (
    <div className='dark:bg-black relative'>
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <PricingSection />
      <ConsultationCard />
      <ClientIntakeForm />
      <TermsSection />
      <Footer />
    </div>
  )
}

export default App
