import React from 'react'
import { motion } from "motion/react"

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

const ClientIntakeForm = () => {
  const fields = [
    { label: 'Full Name', type: 'text', span: 'md:col-span-2' },
    { label: 'Email Address', type: 'email' },
    { label: 'Emergency Number', type: 'tel' },
    { label: 'Package Chosen', type: 'select', options: ['Wedding Gown', 'Thanksgiving', 'Bridal Shower', 'Engagement'], span: 'md:col-span-2' },
    { label: 'Engagement Date', type: 'date' },
    { label: 'Wedding Date', type: 'date' },
    { label: 'Bridal Address', type: 'text', span: 'md:col-span-2' },
  ]

  return (
    <motion.section
      id='intake'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.08 }}
      className='m-3 mx-auto max-w-4xl bg-white px-6 py-24 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100'
    >
      <motion.div
        variants={fadeUp}
        className='rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none md:p-12'
      >
        <h2 className='mb-10 bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-4xl font-black text-transparent dark:from-white dark:to-zinc-400 md:text-5xl'>
          Client Details & Agreement
        </h2>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {fields.map((field) => (
            <motion.div key={field.label} variants={fadeUp} className={`group ${field.span || ''}`}>
              <label className='mb-2 block text-sm font-medium text-zinc-600 group-focus-within:text-rose-600 dark:text-zinc-400 dark:group-focus-within:text-rose-300'>
                {field.label}
              </label>
              {field.type === 'select'? (
                <select className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-rose-400/50'>
                  <option value="">Select package</option>
                  {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type={field.type}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-rose-400/50'
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.button
          variants={fadeUp}
          className='mt-10 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 font-semibold text-white transition-transform hover:scale-[1.01] active:scale-[0.99] dark:text-zinc-900 md:w-auto md:px-8'
        >
          Submit Inquiry
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

export default ClientIntakeForm