import React from 'react'
import assets from '../assets/assets'
import ThemeTogleBtn from './ThemeTogleBtn.jsx'
import { motion } from "motion/react"

const Navbar = ({theme, setTheme}) => {
  return (
    <motion.header
      initial={{opacity:0, y:-20}}
      animate={{ opacity: 1, y:0 }}
      transition={{duration: 0.5}}
      className='sticky top-0 z-50 border-b border-white/10 bg-black/60 px-6 py-4 backdrop-blur-xl lg:px-12'
    >
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
        <img
          src={assets.logo}
          className='h-10 w-auto rounded-full'
          alt='Angela Hayford Bridal'
        />

        <nav className='hidden items-center gap-6 text-sm font-medium text-zinc-300 md:flex'>
          <a href="#pricing" className='transition-colors hover:text-white'>Packages</a>
          <a href="#consultation" className='transition-colors hover:text-white'>Consultation</a>
          <a href="#intake" className='transition-colors hover:text-white'>Book Now</a>
          <a href="#terms" className='transition-colors hover:text-white'>T&C</a>
          <ThemeTogleBtn theme={theme} setTheme={setTheme}/>
        </nav>
      </div>
    </motion.header>
  )
}

export default Navbar