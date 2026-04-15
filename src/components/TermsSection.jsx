import React from 'react'
import { motion } from "motion/react"

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

const TermsSection = () => {
  const terms = [
    {
      title: 'Payment Policies',
      content: '70% deposit due to secure the date upon agreement between Angela Hayford and Client. 30% balance due one week before collection. Payment validates booking.'
    },
    {
      title: 'Cancellation & Date Changes',
      content: 'Cancelled 2 months or less before booked date: deposits refundable after 2 months with 20% cancellation fee if sewing has not started. If sewing has started: fabric + unfinished/finished garment returned to client, fabric and sewing costs deducted from deposit.'
    },
    {
      title: 'Fittings',
      content: 'Clients must attend at least two fittings before collection of outfits. Failure to do so means designer is not liable for fitting problems or alteration costs.'
    },
    {
      title: 'Transportation & Accommodation',
      content: 'Transportation discussed based on location. Bridal dress up: Accra GHS 600, Outside Accra GHS 1500, Outside Ghana GHS 2500–3500. Client responsible for travel, accommodation, and feeding for events outside Accra. Flights booked by client for locations outside Ghana and outside Accra like Kumasi, Takoradi, North, Brong Ahafo.'
    }
  ]

  return (
    <motion.section
      id='terms'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1 }}
      className='m-3 mx-auto max-w-4xl bg-white px-6 py-24 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 print:bg-white print:text-black'
    >
      <motion.h2 variants={fadeUp} className='mb-8 text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl print:text-black'>
        Terms & Conditions
      </motion.h2>
      <div className='space-y-4'>
        {terms.map((term, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className='rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5 print:border-gray-300 print:bg-white print:shadow-none'
          >
            <h3 className='mb-2 font-semibold text-zinc-900 dark:text-white print:text-black'>
              {term.title}
            </h3>
            <p className='text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 print:text-gray-700'>
              {term.content}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default TermsSection