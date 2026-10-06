import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "motion/react"
import { Info, Clock, AlertCircle, Scissors, CalendarCheck, CalendarDays, Calendar, ChevronLeft, ChevronRight, Clock3, X, ArrowLeft, CheckCircle2, CreditCard } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
const TIME_OPTIONS = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM']

const ConsultationCard = () => {
  const today = new Date().toISOString().split('T')[0]
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState('details') // 'details' | 'payment' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  })
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const [draftDate, setDraftDate] = useState('')
  const [draftTime, setDraftTime] = useState('')
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(`${today}T12:00:00`))

  const closeModal = () => {
    setIsModalOpen(false)
    setIsScheduleOpen(false)
    setTimeout(() => setStep('details'), 300)
  }

  const details = [
    { icon: <Info className='h-5 w-5' />, title: 'Consultation Fee', desc: 'GHS 1,000 for a 30-minute session. The fee is deducted from the final invoice.' },
    { icon: <Clock className='h-5 w-5' />, title: 'Booking Timeline', desc: 'Bridal bookings must be made 6–12 months before the event date.' },
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

  const handleDetailsSubmit = (e) => {
    e.preventDefault()
    if (!formData.date || !formData.time) {
      openSchedulePicker()
      return
    }
    setStep('payment')
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    // YOU HANDLE PAYSTACK HERE
    setTimeout(() => setStep('success'), 800)
  }

  const updateField = (field, value) => {
    setFormData(prev => ({...prev, [field]: value }))
  }

  const openSchedulePicker = () => {
    const selectedDate = formData.date || today
    setDraftDate(selectedDate)
    setDraftTime(formData.time || TIME_OPTIONS[0])
    setCalendarMonth(new Date(`${selectedDate}T12:00:00`))
    setIsScheduleOpen(true)
  }

  const applySchedule = () => {
    if (!draftDate || !draftTime) return
    setFormData(prev => ({ ...prev, date: draftDate, time: draftTime }))
    setIsScheduleOpen(false)
  }

  const displaySchedule = formData.date && formData.time
    ? `${new Date(`${formData.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${formData.time}`
    : 'Choose a date and time'

  const calendarMonthLabel = calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const firstDayOfMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay()
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate()
  const calendarDays = [
    ...Array.from({ length: firstDayOfMonth }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), index + 1)),
  ]
  const currentMonth = new Date(`${today}T12:00:00`)
  const isCurrentMonth = calendarMonth.getFullYear() === currentMonth.getFullYear() && calendarMonth.getMonth() === currentMonth.getMonth()

  const selectCalendarDate = (date) => {
    const selectedDate = date.toISOString().split('T')[0]
    if (selectedDate >= today) setDraftDate(selectedDate)
  }

  return (
    <>
      <motion.section
        id='consultation'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className='mx-auto max-w-4xl bg-white px-4 py-16 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 sm:px-6 sm:py-24'
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
              className='fixed inset-x-0 bottom-0 z-50 sm:inset-x-4 sm:bottom-4 sm:left-1/2 sm:top-4 sm:w-[calc(100%-2rem)] sm:max-w-lg sm:-translate-x-1/2'
            >
              <div className='max-h-[calc(100dvh-1rem)] overflow-y-auto rounded-t-3xl border border-zinc-200 bg-white shadow-2xl dark:border-white/10 dark:bg-zinc-900 sm:max-h-[calc(100dvh-2rem)] sm:rounded-3xl'>

                {/* Step 1: Details */}
                {step === 'details' && (
                  <div className='p-5 sm:p-8'>
                    <div className='flex items-start justify-between gap-3'>
                      <div>
                        <h3 className='text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl'>
                          Book Your Consultation
                        </h3>
                        <p className='mt-1 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm'>
                          GHS 1,000 • 30 minutes with lead designer
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
                          <button
                            type='button'
                            onClick={openSchedulePicker}
                            className={`flex w-full items-center gap-2 rounded-xl border bg-white px-3 py-2.5 text-left text-sm outline-none transition-colors focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 sm:px-4 sm:py-3 ${
                              formData.date && formData.time
                                ? 'border-zinc-300 text-zinc-900 dark:text-white'
                                : 'border-zinc-300 text-zinc-400 dark:text-zinc-500'
                            }`}
                          >
                            <CalendarDays className='h-4 w-4 shrink-0 text-rose-500' />
                            <span className='truncate'>{displaySchedule}</span>
                          </button>
                        </div>
                      </div>

                      <button
                        type='submit'
                        className='mt-2 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white active:scale-[0.98] dark:text-zinc-900'
                      >
                        Continue to Payment
                      </button>
                    </form>

                    <AnimatePresence>
                      {isScheduleOpen && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsScheduleOpen(false)}
                            className='fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm'
                          />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 8 }}
                            className='fixed inset-x-4 top-1/2 z-[60] max-h-[calc(100dvh-2rem)] -translate-y-1/2 overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-zinc-900 sm:left-1/2 sm:max-w-sm sm:-translate-x-1/2 sm:p-6'
                          >
                            <div className='flex items-start justify-between gap-4'>
                              <div>
                                <h4 className='text-lg font-bold text-zinc-900 dark:text-white'>Choose your slot</h4>
                                <p className='mt-1 text-xs text-zinc-500 dark:text-zinc-400'>Select a date and preferred consultation time.</p>
                              </div>
                              <button
                                type='button'
                                onClick={() => setIsScheduleOpen(false)}
                                className='rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white'
                                aria-label='Close date and time picker'
                              >
                                <X className='h-5 w-5' />
                              </button>
                            </div>

                            <div className='mt-5 flex items-center justify-between'>
                              <div>
                                <label className='block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'>Date</label>
                                <p className='mt-1 text-sm font-semibold text-zinc-900 dark:text-white'>
                                  {draftDate ? new Date(`${draftDate}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Select a date'}
                                </p>
                              </div>
                              <Calendar className='h-5 w-5 text-rose-500' />
                            </div>

                            <div className='mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-white/5'>
                              <div className='flex items-center justify-between'>
                                <button
                                  type='button'
                                  onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}
                                  disabled={isCurrentMonth}
                                  className='rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-white hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-white/10 dark:hover:text-white'
                                  aria-label='Previous month'
                                >
                                  <ChevronLeft className='h-4 w-4' />
                                </button>
                                <span className='text-sm font-bold text-zinc-900 dark:text-white'>{calendarMonthLabel}</span>
                                <button
                                  type='button'
                                  onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}
                                  className='rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-white hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white'
                                  aria-label='Next month'
                                >
                                  <ChevronRight className='h-4 w-4' />
                                </button>
                              </div>

                              <div className='mt-3 grid grid-cols-7 text-center text-[10px] font-semibold uppercase tracking-wide text-zinc-400'>
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((dayLabel) => <span key={dayLabel}>{dayLabel}</span>)}
                              </div>
                              <div className='mt-2 grid grid-cols-7 gap-1'>
                                {calendarDays.map((date, index) => {
                                  if (!date) return <span key={`empty-${index}`} className='h-8' />
                                  const dateKey = date.toISOString().split('T')[0]
                                  const isSelected = draftDate === dateKey
                                  const isPast = dateKey < today
                                  const isToday = dateKey === today
                                  return (
                                    <button
                                      key={dateKey}
                                      type='button'
                                      disabled={isPast}
                                      onClick={() => selectCalendarDate(date)}
                                      className={`h-8 rounded-lg text-xs font-semibold transition-colors ${
                                        isSelected
                                          ? 'bg-rose-500 text-white shadow-sm'
                                          : isPast
                                            ? 'cursor-not-allowed text-zinc-300 dark:text-zinc-700'
                                            : isToday
                                              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-500/15 dark:text-amber-300'
                                              : 'text-zinc-700 hover:bg-white dark:text-zinc-300 dark:hover:bg-white/10'
                                      }`}
                                    >
                                      {date.getDate()}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>

                            <div className='mt-5 flex items-center justify-between'>
                              <div>
                                <label className='block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'>Time</label>
                                <p className='mt-1 text-sm font-semibold text-zinc-900 dark:text-white'>{draftTime || 'Select a time'}</p>
                              </div>
                              <Clock3 className='h-5 w-5 text-rose-500' />
                            </div>
                            <div className='mt-2 grid grid-cols-2 gap-2'>
                              {TIME_OPTIONS.map((timeOption) => (
                                <button
                                  key={timeOption}
                                  type='button'
                                  onClick={() => setDraftTime(timeOption)}
                                  aria-pressed={draftTime === timeOption}
                                  className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                                    draftTime === timeOption
                                      ? 'border-rose-500 bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300'
                                      : 'border-zinc-200 text-zinc-600 hover:border-rose-300 dark:border-white/10 dark:text-zinc-300'
                                  }`}
                                >
                                  {timeOption}
                                </button>
                              ))}
                            </div>

                            <button
                              type='button'
                              onClick={applySchedule}
                              disabled={!draftDate || !draftTime}
                              className='mt-5 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-900'
                            >
                              Apply date and time
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
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
                            Pay GHS 1,000 to confirm your slot
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
                        <span className='font-semibold text-zinc-900 dark:text-white'>GHS 1,000.00</span>
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
                          <p>Clicking “Pay Now” will initialize Paystack. You’ll be redirected to complete payment securely.</p>
                        </div>
                      </div>

                      <button
                        type='submit'
                        className='mt-5 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white active:scale-[0.98] dark:text-zinc-900 sm:mt-6'
                      >
                        Pay GHS 1,000 with Paystack
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
                        <span className='text-right font-medium text-zinc-900 dark:text-white'>{displaySchedule}</span>
                      </div>
                      <div className='mt-2 flex justify-between'>
                        <span className='text-zinc-600 dark:text-zinc-400'>Amount Paid</span>
                        <span className='font-semibold text-emerald-600 dark:text-emerald-400'>GHS 1,000.00</span>
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