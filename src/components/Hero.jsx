import React from 'react'
import assets from '../assets/assets'
import { motion } from "motion/react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
}

const Hero = () => {
  return (
    <section id='hero' className='relative overflow-hidden px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-12 lg:py-32'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <img
          src={assets.wedding}
          alt=""
          className='h-full w-full object-cover opacity-20'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black' />
      </div>

      <motion.div
        initial='hidden'
        animate='visible'
        transition={{ staggerChildren: 0.15 }}
        className='mx-auto max-w-4xl'
      >
        <motion.div
          variants={fadeUp}
          className='mb-4 inline-flex rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1 text- font-medium text-rose-200 backdrop-blur sm:mb-6 sm:px-4 sm:py-1.5 sm:text-xs'
        >
          Angela Hayford Atelier
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className='bg-gradient-to-br from-white via-white to-zinc-400 bg-clip-text text-4xl font-black leading-tight tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl'
        >
          2026 Bridal <span className='bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text'>Ratecard</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className='mx-auto mt-4 max-w-2xl text-balance text-sm text-zinc-300 sm:mt-6 sm:text-base lg:text-lg'
        >
          Bespoke wedding gowns, bridal shower looks, thanksgiving & engagement kente. Transparent pricing, intentional craft.
        </motion.p>

        <motion.div variants={fadeUp} className='mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4'>
          <a
            href="#pricing"
            className='w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:px-8 sm:text-base'
          >
            View Packages
          </a>
          <a
            href="#intake"
            className='w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10 sm:w-auto sm:px-8 sm:text-base'
          >
            Start Your Inquiry
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero