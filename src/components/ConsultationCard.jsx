import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "motion/react"
import { Info, Clock, AlertCircle, Scissors, CalendarCheck, X, ArrowLeft, CheckCircle2, CreditCard } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

const ConsultationCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState('details') // 'details' | 'payment' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
  })

  const details = [
    { icon: <Info className='h-5 w-5' />, title: 'Consultation Fee', desc: 'GHS 800 for 30-minute session with lead designer' },
    { icon: <Clock className='h-5 w-5' />, title: 'Booking Timeline', desc: 'Book 3–6 months or up to 1 year before event date' },
    { icon: <AlertCircle className='h-5 w-5' />, title: 'Style Preparation', desc: 'Bring style inspirations. Indecisive clients should book consultation first' },
    { icon: <Scissors className='h-5 w-5' />, title: 'Mock-ups', desc: 'Style inspiration mock-ups charged separately. Price set by designer after consultation' },
  ]

  // Close modal on ESC + lock body scroll
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && closeModal()
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEsc)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isModalOpen])

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setStep('details'), 300) // reset after animation
  }

  const handleDetailsSubmit = (e) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    // YOU HANDLE PAYSTACK HERE
    // Example: paystackInit({ email: formData.email, amount: 80000 })
    //.then(() => setStep('success'))

    // For now just simulate success
    setTimeout(() => setStep('success'), 800)
  }

  const updateField = (field, value) => {
    setFormData(prev => ({...prev, [field]: value }))
  }

  return (
    <>
      <motion.section
        id='consultation'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className='m-3 mx-auto max-w-4xl bg-white px-6 py-24 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100'
      >
        <motion.div
          variants={fadeUp}
          className='rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none md:p-12'
        >
          <h2 className='mb-8 text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl'>
            Before You Book
          </h2>
          <div className='space-y-6'>
            {details.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className='flex gap-4'>
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300'>
                  {item.icon}
                </div>
                <div>
                  <h3 className='font-semibold text-zinc-900 dark:text-white'>{item.title}</h3>
                  <p className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            variants={fadeUp}
            onClick={() => setIsModalOpen(true)}
            whileTap={{ scale: 0.97 }}
            className='mt-10 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] dark:text-zinc-900 md:w-auto md:px-8'
          >
            <CalendarCheck className='h-4 w-4' />
            Book Consultation
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm'
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              className='fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2'
            >
              <div className='rounded-3xl border border-zinc-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-zinc-900'>

                {/* Step 1: Details */}
                {step === 'details' && (
                  <>
                    <div className='flex items-start justify-between'>
                      <div>
                        <h3 className='text-2xl font-bold text-zinc-900 dark:text-white'>
                          Book Your Consultation
                        </h3>
                        <p className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>
                          GHS 800 • 30 minutes with lead designer
                        </p>
                      </div>
                      <button
                        onClick={closeModal}
                        className='rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white'
                      >
                        <X className='h-5 w-5' />
                      </button>
                    </div>

                    <form onSubmit={handleDetailsSubmit} className='mt-6 space-y-4'>
                      <div>
                        <label className='mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
                          Full Name
                        </label>
                        <input
                          type='text'
                          required
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white'
                          placeholder='Enter your name'
                        />
                      </div>

                      <div>
                        <label className='mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
                          Email
                        </label>
                        <input
                          type='email'
                          required
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white'
                          placeholder='your@email.com'
                        />
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <label className='mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
                            Phone
                          </label>
                          <input
                            type='tel'
                            required
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white'
                            placeholder='+233...'
                          />
                        </div>
                        <div>
                          <label className='mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
                            Preferred Date
                          </label>
                          <input
                            type='date'
                            required
                            value={formData.date}
                            onChange={(e) => updateField('date', e.target.value)}
                            className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:[color-scheme:dark]'
                          />
                        </div>
                      </div>

                      <button
                        type='submit'
                        className='mt-2 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white hover:scale-[1.02] active:scale-[0.98] dark:text-zinc-900'
                      >
                        Continue to Payment
                      </button>
                    </form>
                  </>
                )}

                {/* Step 2: Payment */}
                {step === 'payment' && (
                  <>
                    <div className='flex items-start justify-between'>
                      <div className='flex items-center gap-3'>
                        <button
                          onClick={() => setStep('details')}
                          className='rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white'
                        >
                          <ArrowLeft className='h-5 w-5' />
                        </button>
                        <div>
                          <h3 className='text-2xl font-bold text-zinc-900 dark:text-white'>
                            Checkout
                          </h3>
                          <p className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>
                            Pay GHS 800 to confirm your slot
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={closeModal}
                        className='rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white'
                      >
                        <X className='h-5 w-5' />
                      </button>
                    </div>

                    <div className='mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-zinc-600 dark:text-zinc-400'>Consultation Fee</span>
                        <span className='font-semibold text-zinc-900 dark:text-white'>GHS 800.00</span>
                      </div>
                      <div className='mt-2 flex justify-between text-sm'>
                        <span className='text-zinc-600 dark:text-zinc-400'>For</span>
                        <span className='font-medium text-zinc-900 dark:text-white'>{formData.name}</span>
                      </div>
                    </div>

                    <form onSubmit={handlePaymentSubmit} className='mt-6'>
                      <div className='rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200'>
                        <div className='flex gap-2'>
                          <CreditCard className='h-5 w-5 shrink-0' />
                          <p>Clicking “Pay Now” will initialize Paystack. You’ll be redirected to complete payment securely.</p>
                        </div>
                      </div>

                      <button
                        type='submit'
                        className='mt-6 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white hover:scale-[1.02] active:scale-[0.98] dark:text-zinc-900'
                      >
                        Pay GHS 800 with Paystack
                      </button>
                    </form>
                  </>
                )}

                {/* Step 3: Success */}
                {step === 'success' && (
                  <div className='text-center'>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                      className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10'
                    >
                      <CheckCircle2 className='h-8 w-8 text-emerald-600 dark:text-emerald-400' />
                    </motion.div>

                    <h3 className='mt-6 text-2xl font-bold text-zinc-900 dark:text-white'>
                      Booking Confirmed!
                    </h3>
                    <p className='mt-2 text-balance text-sm text-zinc-600 dark:text-zinc-400'>
                      We’ve sent confirmation details to <span className='font-semibold text-zinc-900 dark:text-white'>{formData.email}</span>.
                      Our team will reach out within 24 hours to finalize your session.
                    </p>

                    <div className='mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-left text-sm dark:border-white/10 dark:bg-white/5'>
                      <div className='flex justify-between'>
                        <span className='text-zinc-600 dark:text-zinc-400'>Name</span>
                        <span className='font-medium text-zinc-900 dark:text-white'>{formData.name}</span>
                      </div>
                      <div className='mt-2 flex justify-between'>
                        <span className='text-zinc-600 dark:text-zinc-400'>Date</span>
                        <span className='font-medium text-zinc-900 dark:text-white'>{formData.date}</span>
                      </div>
                      <div className='mt-2 flex justify-between'>
                        <span className='text-zinc-600 dark:text-zinc-400'>Amount Paid</span>
                        <span className='font-semibold text-emerald-600 dark:text-emerald-400'>GHS 800.00</span>
                      </div>
                    </div>

                    <button
                      onClick={closeModal}
                      className='mt-8 w-full rounded-xl border border-zinc-300 bg-white py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
                    >
                      Back to Page
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ConsultationCard