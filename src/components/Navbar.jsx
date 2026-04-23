import React, { useState } from 'react'
import assets from '../assets/assets'
import ThemeTogleBtn from './ThemeTogleBtn.jsx'
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from 'lucide-react'

const Navbar = ({theme, setTheme}) => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Packages', href: '#pricing' },
    { label: 'Consultation', href: '#consultation' },
    { label: 'T&C', href: '#terms' },
  ]

  return (
    <motion.header
      initial={{opacity:0, y:-20}}
      animate={{ opacity: 1, y:0 }}
      transition={{duration: 0.5}}
      className='sticky top-0 z-50 border-b border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4 lg:px-12'
    >
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
        <img
          src={assets.logo}
          className='h-8 w-auto rounded-full sm:h-10'
          alt='Angela Hayford Bridal'
        />

        {/* Desktop nav */}
        <nav className='hidden items-center gap-6 text-sm font-medium text-zinc-300 md:flex'>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className='transition-colors hover:text-white'>
              {link.label}
            </a>
          ))}
          <ThemeTogleBtn theme={theme} setTheme={setTheme}/>
        </nav>

        {/* Mobile hamburger */}
        <div className='flex items-center gap-3 md:hidden'>
          <ThemeTogleBtn theme={theme} setTheme={setTheme}/>
          <button onClick={() => setIsOpen(!isOpen)} className='p-2 text-white'>
            {isOpen? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='overflow-hidden md:hidden'
          >
            <div className='space-y-1 pb-3 pt-2'>
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className='block rounded-lg px-3 py-2 text-base font-medium text-zinc-300 hover:bg-white/5 hover:text-white'
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar