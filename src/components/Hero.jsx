import React from 'react'
import assets from '../assets/assets'
import { motion } from "motion/react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
}

const Hero = () => {
  return (
    <section id='hero' className='relative overflow-hidden px-6 py-32 text-center lg:px-12'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <img src={assets.wedding} alt="" className='h-full w-full object-cover opacity-20' />
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/90 to-black' />
      </div>

      <motion.div
        initial='hidden'
        animate='visible'
        transition={{ staggerChildren: 0.15 }}
        className='mx-auto max-w-4xl'
      >
        <motion.div
          variants={fadeUp}
          className='mb-6 inline-flex rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-1.5 text-xs font-medium text-rose-200 backdrop-blur'
        >
          Angela Hayford Atelier
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className='bg-gradient-to-br from-white via-white to-zinc-400 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl'
        >
          2026 Bridal <span className='bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text'>Ratecard</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className='mx-auto mt-6 max-w-2xl text-lg text-zinc-300'
        >
          Bespoke wedding gowns, bridal shower looks, thanksgiving & engagement kente. Transparent pricing, intentional craft.
        </motion.p>

        <motion.div variants={fadeUp} className='mt-10 flex flex-col justify-center gap-4 sm:flex-row'>
          <a href="#pricing" className='rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 px-8 py-3 font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]'>
            View Packages
          </a>
          <a href="#intake" className='rounded-xl border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white/10'>
            Start Your Inquiry
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero