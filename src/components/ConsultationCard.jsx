import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from "motion/react"
import { Info, Clock, AlertCircle, Scissors, CalendarCheck, X, ArrowLeft, CheckCircle2, CreditCard } from 'lucide-react'
import axios from 'axios'

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

  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const details = [
    { icon: <Info className='h-5 w-5' />, title: 'Consultation Fee', desc: 'GHS 800 for 30-minute session with lead designer' },
    { icon: <Clock className='h-5 w-5' />, title: 'Booking Timeline', desc: 'Book 3–6 months or up to 1 year before event date' },
    { icon: <AlertCircle className='h-5 w-5' />, title: 'Style Preparation', desc: 'Bring style inspirations. Indecisive clients should book consultation first' },
    { icon: <Scissors className='h-5 w-5' />, title: 'Mock-ups', desc: 'Style inspiration mock-ups charged separately. Price set by designer after consultation' },
  ]

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
    setTimeout(() => setStep('details'), 300)
  }

  const handleDetailsSubmit = (e) => {
    e.preventDefault()
    setStep('payment')
  }

  const updateField = (field, value) => {
    setFormData(prev => ({...prev, [field]: value }))
  }

  const key = import.meta.env.VITE_PAYSTACK_LIVE_PUBLIC_KEY

  const payWithPaystack = async (e) => {
    e.preventDefault()
    if (!window.PaystackPop) {
      toast.error('Payment service not loaded. Please refresh.')
      return
    }
    try {
      const handler = window.PaystackPop.setup({
        key: key,
        email: formData.email,
        amount: 80000,
        currency: 'GHS',
        ref: `${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
        onClose: () => toast.info('Payment window closed'),
        callback: (response) => {
          toast.success(`Payment complete! Ref: ${response.reference}`)
          setStep('success')
          setPaymentSuccess(true)
          onSubmitHandler()
        },
      })
      handler.openIframe()
    } catch (error) {
      console.error(error)
      toast.error('Error processing payment')
    }
  }

  const creatOrder = async()=>{
    console.log(paymentSuccess)
    if(!paymentSuccess) return;
    
    try {
      const consult = await axios.post("https://sojamart-backend.vercel.app/api/order/consult", {formData});
      if(consult.success){
        toast.success("Consultation successfully booked!")
        setPaymentSuccess(false)
      }
    } catch (error) {
      toast.error("Unable to book.. try again")
     console.log(error) 
    }

  }

  const handlePaymentSubmit = async(e) => {
    e.preventDefault()
    await payWithPaystack(e)
  }

  useEffect(()=>{
    if(paymentSuccess) creatOrder();
  },[paymentSuccess, step, setStep])

  return (
    <>
      <motion.section
        id='consultation'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className='my-4 mx-auto max-w-4xl bg-white px-4 py-16 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 sm:px-6 sm:py-24'
      >
        <motion.div
          variants={fadeUp}
          className='rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none sm:rounded-3xl sm:p-8 md:p-12'
        >
          <h2 className='mb-6 text-2xl font-bold text-zinc-900 dark:text-white sm:mb-8 sm:text-3xl md:text-4xl'>
            Before You Book
          </h2>
          <div className='space-y-5 sm:space-y-6'>
            {details.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className='flex gap-3 sm:gap-4'>
                <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300 sm:h-10 sm:w-10'>
                  {item.icon}
                </div>
                <div>
                  <h3 className='text-sm font-semibold text-zinc-900 dark:text-white sm:text-base'>{item.title}</h3>
                  <p className='mt-1 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm'>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            variants={fadeUp}
            onClick={() => setIsModalOpen(true)}
            whileTap={{ scale: 0.97 }}
            className='mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.98] dark:text-zinc-900 sm:mt-10 md:w-auto md:px-8'
          >
            <CalendarCheck className='h-4 w-4' />
            Book Consultation
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Modal - bottom sheet on mobile, centered on desktop */}
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
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              className='fixed inset-x-0 bottom-0 z-50 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-[calc(100%-2rem)] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2'
            >
              <div className='max-h- overflow-y-auto rounded-t-3xl border border-zinc-200 bg-white shadow-2xl dark:border-white/10 dark:bg-zinc-900 sm:max-h- sm:rounded-3xl'>

                {/* Step 1: Details */}
                {step === 'details' && (
                  <div className='p-5 sm:p-8'>
                    <div className='flex items-start justify-between gap-3'>
                      <div>
                        <h3 className='text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl'>
                          Book Your Consultation
                        </h3>
                        <p className='mt-1 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm'>
                          GHS 800 • 30 minutes with lead designer
                        </p>
                      </div>
                      <button
                        onClick={closeModal}
                        className='-mr-2 -mt-2 rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white'
                      >
                        <X className='h-5 w-5' />
                      </button>
                    </div>

                    <form onSubmit={handleDetailsSubmit} className='mt-5 space-y-3 sm:mt-6 sm:space-y-4'>
                      <div>
                        <label className='mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300 sm:mb-2 sm:text-sm'>
                          Full Name
                        </label>
                        <input
                          type='text'
                          required
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          className='w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white sm:px-4 sm:py-3'
                          placeholder='Enter your name'
                        />
                      </div>

                      <div>
                        <label className='mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300 sm:mb-2 sm:text-sm'>
                          Email
                        </label>
                        <input
                          type='email'
                          required
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className='w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white sm:px-4 sm:py-3'
                          placeholder='your@email.com'
                        />
                      </div>

                      {/* Stack on mobile, 2-col on sm+ */}
                      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4'>
                        <div>
                          <label className='mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300 sm:mb-2 sm:text-sm'>
                            Phone
                          </label>
                          <input
                            type='tel'
                            required
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className='w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white sm:px-4 sm:py-3'
                            placeholder='+233...'
                          />
                        </div>
                        <div>
                          <label className='mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300 sm:mb-2 sm:text-sm'>
                            Preferred Date
                          </label>
                          <input
                            type='date'
                            required
                            value={formData.date}
                            onChange={(e) => updateField('date', e.target.value)}
                            className='w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:[color-scheme:dark] sm:px-4 sm:py-3'
                          />
                        </div>
                      </div>

                      <button
                        type='submit'
                        className='mt-2 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white active:scale-[0.98] dark:text-zinc-900'
                      >
                        Continue to Payment
                      </button>
                    </form>
                  </div>
                )}

                {/* Step 2: Payment */}
                {step === 'payment' && (
                  <div className='p-5 sm:p-8'>
                    <div className='flex items-start justify-between gap-3'>
                      <div className='flex items-center gap-2 sm:gap-3'>
                        <button
                          onClick={() => setStep('details')}
                          className='-ml-2 rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white'
                        >
                          <ArrowLeft className='h-5 w-5' />
                        </button>
                        <div>
                          <h3 className='text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl'>
                            Checkout
                          </h3>
                          <p className='mt-0.5 text-xs text-zinc-600 dark:text-zinc-400 sm:mt-1 sm:text-sm'>
                            Pay GHS 800 to confirm your slot
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={closeModal}
                        className='-mr-2 -mt-2 rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white'
                      >
                        <X className='h-5 w-5' />
                      </button>
                    </div>

                    <div className='mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5 sm:mt-6 sm:rounded-2xl sm:p-5'>
                      <div className='flex justify-between text-xs sm:text-sm'>
                        <span className='text-zinc-600 dark:text-zinc-400'>Consultation Fee</span>
                        <span className='font-semibold text-zinc-900 dark:text-white'>GHS 800.00</span>
                      </div>
                      <div className='mt-2 flex justify-between text-xs sm:text-sm'>
                        <span className='text-zinc-600 dark:text-zinc-400'>For</span>
                        <span className='font-medium text-zinc-900 dark:text-white'>{formData.name}</span>
                      </div>
                    </div>

                    <form onSubmit={handlePaymentSubmit} className='mt-5 sm:mt-6'>
                      <div className='rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200 sm:rounded-2xl sm:p-4 sm:text-sm'>
                        <div className='flex gap-2'>
                          <CreditCard className='h-4 w-4 shrink-0 sm:h-5 sm:w-5' />
                          <p>Clicking “Pay Now” implies you agree to the <a className='underline' href='#terms'>terms and conditions</a> and will initialize Paystack. You’ll be redirected to complete payment securely.</p>
                        </div>
                      </div>

                      <button
                        type='submit'
                        className='mt-5 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white active:scale-[0.98] dark:text-zinc-900 sm:mt-6'
                      >
                        Pay GHS 800 with Paystack
                      </button>
                    </form>
                  </div>
                )}

                {/* Step 3: Success */}
                {step === 'success' && (
                  <div className='p-5 text-center sm:p-8'>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                      className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10 sm:h-16 sm:w-16'
                    >
                      <CheckCircle2 className='h-7 w-7 text-emerald-600 dark:text-emerald-400 sm:h-8 sm:w-8' />
                    </motion.div>

                    <h3 className='mt-5 text-xl font-bold text-zinc-900 dark:text-white sm:mt-6 sm:text-2xl'>
                      Booking Confirmed!
                    </h3>
                    <p className='mt-2 text-balance text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm'>
                      We’ve sent confirmation details to <span className='font-semibold text-zinc-900 dark:text-white'>{formData.email}</span>.
                      Our team will reach out within 24 hours to finalize your session.
                    </p>

                    <div className='mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-left text-xs dark:border-white/10 dark:bg-white/5 sm:mt-6 sm:rounded-2xl sm:p-4 sm:text-sm'>
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
                      className='mt-6 w-full rounded-xl border border-zinc-300 bg-white py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10 sm:mt-8'
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