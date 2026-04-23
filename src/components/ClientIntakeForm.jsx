import React, { useState } from 'react'

const ClientIntakeForm = ({selectedPackage, handleCheckout, clientData, CreditCard, updateField, X, ArrowDown}) => {
  const [ocatioDetails, setOcatioDetails] = useState(false);

  return (
    <div className='mt-5'>
      <div className='rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200 sm:rounded-2xl sm:p-4 sm:text-sm'>
        <div className='flex justify-between'>
          <p>Selected Package</p>
          <p className='font-semibold'>{selectedPackage.name}</p>
        </div>
      </div>

      <form onSubmit={handleCheckout} className='mt-5 space-y-3 sm:mt-6 sm:space-y-4'>
        <div>
          <label className='mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300 sm:mb-2 sm:text-sm'>
            Full Name
          </label>
          <input
            type='text'
            required
            value={clientData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className='w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white sm:px-4 sm:py-3'
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
            value={clientData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className='w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white sm:px-4 sm:py-3'
            placeholder='your@email.com'
          />
        </div>

        <div>
          <label className='mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300 sm:mb-2 sm:text-sm'>
            Phone
          </label>
          <input
            type='tel'
            required
            value={clientData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className='w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white sm:px-4 sm:py-3'
            placeholder='+233...'
          />
        </div>

        {
          ocatioDetails ? (
            <div className='bg-zinc-200 rounded-lg p-2'>
              <X onClick={() => setOcatioDetails(false)} className='h-5 w-5 border rounded m-2 cursor-pointer hover:bg-zinc-50' />
              <div>
                <label className='mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300 sm:mb-2 sm:text-sm'>
                  Engagement Date
                </label>
                <input
                  type='date'
                  required
                  className='w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white sm:px-4 sm:py-3'
                />
              </div>

              <div>
                <label className='mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300 sm:mb-2 sm:text-sm'>
                  Wedding Date
                </label>
                <input
                  type='date'
                  required
                  className='w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white sm:px-4 sm:py-3'
                />
              </div>

              <div>
                <label className='mb-1.5 block text-xs font-medium text-zinc-700 dark:text-zinc-300 sm:mb-2 sm:text-sm'>
                  Bridal Address
                </label>
                <input
                  type='text'
                  required
                  className='w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white sm:px-4 sm:py-3'
                />
              </div>

            </div>
          )
          :
          (<p onClick={() => setOcatioDetails(true)} className='flex w-fit cursor-pointer hover:bg-zinc-50 rounded-xl border border-zinc-200 bg-zinc-200 p-1 dark:border-white/10 dark:bg-white/5 sm:rounded-2xl sm:p-2'>Ocation Details...<ArrowDown className='h-5 w-5' /></p>)
        }

        <div className='rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-white/5 sm:rounded-2xl sm:p-4'>
          <div className='flex justify-between text-xs sm:text-sm'>
            <span className='text-zinc-600 dark:text-zinc-400'>Subtotal</span>
            <span className='font-semibold text-zinc-900 dark:text-white'>{selectedPackage.price}</span>
          </div>
          <div className='mt-2 flex justify-between border-t border-zinc-200 pt-2 text-xs dark:border-white/10 sm:text-sm'>
            <span className='font-semibold text-zinc-900 dark:text-white'>Total</span>
            <span className='font-bold text-rose-600 dark:text-rose-400'>{selectedPackage.price}</span>
          </div>
        </div>

        <div className='rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200 sm:rounded-2xl sm:p-4 sm:text-sm'>
          <div className='flex gap-2'>
            <CreditCard className='h-4 w-4 shrink-0 sm:h-5 sm:w-5' />
            <p>Clicking “Pay Now” implies you agree to the <a className='underline' href='#terms'>terms and conditions</a> and will initialize Paystack. Complete payment securely with card or mobile money.</p>
          </div>
        </div>

        <button
          type='submit'
          className='w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white transition active:scale-[0.98] dark:text-zinc-900'
        >
          Pay {selectedPackage.price} with Paystack
        </button>
      </form>
    </div>
  )
}

export default ClientIntakeForm