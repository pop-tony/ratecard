import React, { useState } from 'react'
import { motion } from "motion/react"
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, X } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const TIME_OPTIONS = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM']

const ClientIntakeForm = () => {
  const today = new Date().toISOString().split('T')[0]
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const [consultationDate, setConsultationDate] = useState('')
  const [consultationTime, setConsultationTime] = useState('')
  const [draftDate, setDraftDate] = useState('')
  const [draftTime, setDraftTime] = useState('')
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(`${today}T12:00:00`))
  const fields = [
    { label: 'Full Name', type: 'text', span: 'md:col-span-2' },
    { label: 'Email Address', type: 'email' },
    { label: 'Emergency Number', type: 'tel' },
    { label: 'Package Chosen', type: 'select', options: ['Wedding Dress', 'Reception Dress', 'Thanksgiving Dress', 'Bridal Shower Dress', 'Engagement / Traditional Gown'], span: 'md:col-span-2' },
    { label: 'Engagement Date', type: 'date' },
    { label: 'Wedding Date', type: 'date' },
    { label: 'Bridal Address', type: 'text', span: 'md:col-span-2' },
  ]

  const openSchedulePicker = () => {
    const selectedDate = consultationDate || today
    setDraftDate(selectedDate)
    setDraftTime(consultationTime || TIME_OPTIONS[0])
    setCalendarMonth(new Date(`${selectedDate}T12:00:00`))
    setIsScheduleOpen(true)
  }

  const applySchedule = () => {
    if (!draftDate || !draftTime) return
    setConsultationDate(draftDate)
    setConsultationTime(draftTime)
    setIsScheduleOpen(false)
  }

  const calendarDays = [
    ...Array.from({ length: new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay() }, () => null),
    ...Array.from({ length: new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate() }, (_, index) => new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), index + 1)),
  ]
  const currentMonth = new Date(`${today}T12:00:00`)
  const isCurrentMonth = calendarMonth.getFullYear() === currentMonth.getFullYear() && calendarMonth.getMonth() === currentMonth.getMonth()
  const displaySchedule = consultationDate && consultationTime
    ? `${new Date(`${consultationDate}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${consultationTime}`
    : 'Choose a date and time'

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
          <motion.div variants={fadeUp} className='group md:col-span-2'>
            <label className='mb-2 block text-sm font-medium text-zinc-600 group-focus-within:text-rose-600 dark:text-zinc-400 dark:group-focus-within:text-rose-300'>
              Consultation Date & Time
            </label>
            <button
              type='button'
              onClick={openSchedulePicker}
              className={`flex w-full items-center gap-2 rounded-xl border bg-white px-4 py-3 text-left outline-none transition-colors focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:bg-black/20 ${consultationDate && consultationTime ? 'border-zinc-300 text-zinc-900 dark:border-white/10 dark:text-white' : 'border-zinc-300 text-zinc-400 dark:border-white/10 dark:text-zinc-500'}`}
            >
              <CalendarDays className='h-4 w-4 shrink-0 text-rose-500' />
              <span className='truncate'>{displaySchedule}</span>
            </button>
          </motion.div>
        </div>

        <motion.label variants={fadeUp} className='mt-8 flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400'>
          <input
            type='checkbox'
            required
            className='mt-0.5 h-4 w-4 shrink-0 accent-rose-500'
          />
          <span>I have read and agree to the Terms & Conditions and confirm that the information provided is accurate.</span>
        </motion.label>

        <motion.button
          variants={fadeUp}
          className='mt-10 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 font-semibold text-white transition-transform hover:scale-[1.01] active:scale-[0.99] dark:text-zinc-900 md:w-auto md:px-8'
        >
          Submit Inquiry
        </motion.button>
      </motion.div>

      {isScheduleOpen && (
        <>
          <div className='fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm' onClick={() => setIsScheduleOpen(false)} />
          <div className='fixed inset-x-4 top-1/2 z-[60] max-h-[calc(100dvh-2rem)] -translate-y-1/2 overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-zinc-900 sm:left-1/2 sm:max-w-sm sm:-translate-x-1/2 sm:p-6'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <h3 className='text-lg font-bold text-zinc-900 dark:text-white'>Choose consultation slot</h3>
                <p className='mt-1 text-xs text-zinc-500 dark:text-zinc-400'>Select the date and time for your consultation.</p>
              </div>
              <button type='button' onClick={() => setIsScheduleOpen(false)} className='rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/10' aria-label='Close date and time picker'>
                <X className='h-5 w-5' />
              </button>
            </div>

            <div className='mt-5 flex items-center justify-between'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'>Date</p>
                <p className='mt-1 text-sm font-semibold text-zinc-900 dark:text-white'>{draftDate ? new Date(`${draftDate}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Select a date'}</p>
              </div>
              <CalendarDays className='h-5 w-5 text-rose-500' />
            </div>

            <div className='mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-white/5'>
              <div className='flex items-center justify-between'>
                <button type='button' onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))} disabled={isCurrentMonth} className='rounded-lg p-1.5 text-zinc-500 hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-white/10' aria-label='Previous month'>
                  <ChevronLeft className='h-4 w-4' />
                </button>
                <span className='text-sm font-bold text-zinc-900 dark:text-white'>{calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                <button type='button' onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))} className='rounded-lg p-1.5 text-zinc-500 hover:bg-white dark:hover:bg-white/10' aria-label='Next month'>
                  <ChevronRight className='h-4 w-4' />
                </button>
              </div>
              <div className='mt-3 grid grid-cols-7 text-center text-[10px] font-semibold uppercase tracking-wide text-zinc-400'>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => <span key={day}>{day}</span>)}
              </div>
              <div className='mt-2 grid grid-cols-7 gap-1'>
                {calendarDays.map((date, index) => {
                  if (!date) return <span key={`empty-${index}`} className='h-8' />
                  const dateKey = date.toISOString().split('T')[0]
                  const isPast = dateKey < today
                  return <button key={dateKey} type='button' disabled={isPast} onClick={() => setDraftDate(dateKey)} className={`h-8 rounded-lg text-xs font-semibold ${draftDate === dateKey ? 'bg-rose-500 text-white' : isPast ? 'cursor-not-allowed text-zinc-300 dark:text-zinc-700' : 'text-zinc-700 hover:bg-white dark:text-zinc-300 dark:hover:bg-white/10'}`}>{date.getDate()}</button>
                })}
              </div>
            </div>

            <div className='mt-5 flex items-center justify-between'>
              <p className='text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'>Time</p>
              <Clock3 className='h-5 w-5 text-rose-500' />
            </div>
            <div className='mt-2 grid grid-cols-2 gap-2'>
              {TIME_OPTIONS.map((time) => <button key={time} type='button' onClick={() => setDraftTime(time)} aria-pressed={draftTime === time} className={`rounded-lg border px-3 py-2.5 text-sm font-medium ${draftTime === time ? 'border-rose-500 bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300' : 'border-zinc-200 text-zinc-600 dark:border-white/10 dark:text-zinc-300'}`}>{time}</button>)}
            </div>
            <button type='button' onClick={applySchedule} disabled={!draftDate || !draftTime} className='mt-5 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-900'>Apply date and time</button>
          </div>
        </>
      )}
    </motion.section>
  )
}

export default ClientIntakeForm