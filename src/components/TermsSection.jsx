import React from 'react'
import { motion } from "motion/react"

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

const TermsSection = () => {
  const terms = [
    {
      title: 'Consultation Policy',
      content: 'Consultations guide the client on fit, colour, fabric choice and design. Clients should share style inspirations for custom garments. Consultations may be virtual or in person, and the GHS 1,000 fee is paid after the date and time are scheduled. A client may attend with a partner, family member or friend, limited to two accompanying persons. Consultation fees are non-refundable.'
    },
    {
      title: 'Payment Policies',
      content: '70% of the total cost is due as a deposit to secure the date upon agreement between Angela Hayford and the client. The remaining 30% is due one week before the pickup date. The dress remains in the studio until payment is completed before pickup or delivery. Payment validates the booking.'
    },
    {
      title: 'Dress Details & Changes',
      content: 'Major changes to the approved final design may be requested within three weeks after consultation. Minor changes, where applicable, may be requested within an additional two weeks, making five weeks in total. Major changes after five weeks attract a fee of 30% of the total gown cost. Additional fabric, trims, embellishments and materials required by changes are paid for by the client and approved before work begins. Changing the entire design after five weeks with the same fabric requires an additional 50% of the total cost. A totally different design is charged at a new ratecard price, with fabric costs charged separately where applicable.'
    },
    {
      title: 'Cancellation & Change of Dates',
      content: 'If the contract is cancelled by the client two months or less before the booked date and sewing has not started, the deposit is refundable after three months less a 20% cancellation fee of the total amount deposited. If sewing has started, the fabric and unfinished or finished garment will be returned to the client, and the total fabric and sewing costs will be deducted from the deposit. Clients must attend at least two fittings before collection; otherwise, the designer is not responsible for fitting problems or alteration costs.'
    },
    {
      title: 'Measurements',
      content: 'Clients must be available for measurements and disclose pregnancy, weight loss or weight gain before production of the final garment. Angela Hayford is not responsible for fit issues caused by failure or delay in communicating these changes. If a client is unavailable, they should engage another individual or professional to take accurate measurements, including all relevant body parts.'
    },
    {
      title: 'Fittings',
      content: 'Achieving the perfect fit drives the quality of the work. Three fittings are conducted at different stages of garment production, and clients should attend all three. Fittings should be scheduled three weeks before the event. For clients outside Ghana, the garment may be delivered to the destination and returned if alterations or other work is needed. Angela Hayford is not responsible for fit disparities when a client chooses to forgo fittings.'
    },
    {
      title: 'Transportation & Accommodation',
      content: 'Transportation is discussed based on location. Bridal dress-up is GHS 1,000–1,500 within Accra, GHS 1,500–2,000 outside Accra, and GHS 2,500–3,500 outside Ghana. The client is responsible for travel, accommodation and feeding for events outside Accra. Clients outside Ghana, as well as clients outside Accra including Kumasi, Takoradi, the North and Brong Ahafo, are responsible for booking round-trip flights.'
    },
    {
      title: 'Confidentiality',
      content: 'Angela Hayford will hold all client data and sensitive information shared during consultation in confidence.'
    },
    {
      title: 'Agreement',
      content: 'No changes may be made to details agreed upon after consultation without the applicable penalties. The client confirms that all information that may affect the fit of the garment, including pregnancy or an intention to lose weight, has been disclosed. This agreement represents all terms and conditions agreed by the parties; no other oral or written understanding regarding the agreement is binding.'
    }
  ]

  return (
    <motion.section
      id='terms'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1 }}
      className='mx-auto max-w-4xl bg-white px-4 py-16 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 print:bg-white print:text-black sm:px-6 sm:py-24'
    >
      <motion.h2 variants={fadeUp} className='mb-6 text-2xl font-bold text-zinc-900 dark:text-white sm:mb-8 sm:text-3xl md:text-4xl print:text-black'>
        Terms & Conditions
      </motion.h2>
      <div className='space-y-3 sm:space-y-4'>
        {terms.map((term, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className='rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5 print:border-gray-300 print:bg-white print:shadow-none sm:rounded-2xl sm:p-6'
          >
            <h3 className='mb-2 text-sm font-semibold text-zinc-900 dark:text-white print:text-black sm:text-base'>
              {term.title}
            </h3>
            <p className='text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 print:text-gray-700 sm:text-sm'>
              {term.content}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default TermsSection