import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "motion/react"
import { Sparkles, Check, X, ArrowLeft, CreditCard, CheckCircle2, Package, Image as ImageIcon } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

// Add 'desc' and 'images' to each package. Drop your image URLs in the arrays.
const PRICING_DATA = {
  wedding: [
    { id: 1, name: 'Luxe Court', price: 'GHS 6,000', popular: false,
      desc: 'Classic court train silhouette with premium satin. Includes basic beadwork, 3 fittings, and custom bustle.',
      images: ['/images/luxe-court-1.jpg', '/images/luxe-court-2.jpg']
    },
    { id: 2, name: 'Deluxe Court', price: 'GHS 9,000', popular: false,
      desc: 'Extended court train with lace appliqué and crystal detailing. 4 fittings included.',
      images: ['/images/deluxe-court-1.jpg']
    },
    { id: 3, name: 'Classic Plain', price: 'GHS 8,000', popular: false,
      desc: 'Minimalist crepe gown with clean lines. Perfect for modern brides. 3 fittings.',
      images: []
    },
    { id: 4, name: 'Luxe Plain', price: 'GHS 10,000', popular: false,
      desc: 'Structured mikado with hidden corsetry. Sculptural and elegant. 4 fittings.',
      images: []
    },
    { id: 5, name: 'Deluxe Plain + Detachable', price: 'GHS 14,000', popular: true,
      desc: 'Two looks in one. Detachable overskirt + fitted base gown. 5 fittings included.',
      images: ['/images/deluxe-detach-1.jpg', '/images/deluxe-detach-2.jpg']
    },
    { id: 6, name: 'Classic Lace', price: 'GHS 14,000', popular: false,
      desc: 'All-over Chantilly lace with illusion back. Timeless romantic feel. 4 fittings.',
      images: []
    },
    { id: 7, name: 'Luxe Lace', price: 'GHS 17,000', popular: false,
      desc: 'Hand-beaded French lace with cathedral train. Heirloom quality. 5 fittings.',
      images: []
    },
    { id: 8, name: 'Deluxe Lace', price: 'GHS 20,000', popular: false,
      desc: 'Couture lace with custom embroidery and Swarovski crystals. 6 fittings.',
      images: []
    },
    { id: 9, name: 'Luxe Ball Gown', price: 'GHS 25,000', popular: false,
      desc: 'Full ball gown with layered tulle and structured bodice. Princess moment. 6 fittings.',
      images: []
    },
    { id: 10, name: 'Deluxe Ball Gown', price: 'GHS 35,000', popular: false,
      desc: 'Bespoke ball gown with hand-draped bodice, 3D florals, and chapel train. 8 fittings.',
      images: []
    },
  ],
  bridal: [
    { id: 1, name: 'Luxe', price: 'GHS 2,500', popular: false,
      desc: 'Chic mini or midi dress for your bridal shower. Custom fit, luxe fabric.',
      images: []
    },
    { id: 2, name: 'Deluxe', price: 'GHS 4,500', popular: false,
      desc: 'Statement shower look with feathers, pearls, or custom embroidery.',
      images: []
    },
  ],
  thanksgiving: [
    { id: 1, name: 'Luxe', price: 'GHS 4,500', popular: false,
      desc: 'Elegant thanksgiving dress in Ankara, lace, or crepe. Church-ready.',
      images: []
    },
    { id: 2, name: 'Deluxe', price: 'GHS 7,000', popular: true,
      desc: 'Heavily beaded or custom-printed thanksgiving gown. Stand-out piece.',
      images: []
    },
  ],
  engagement: [
    { id: 1, name: 'Kente Minimal Beadwork', price: 'GHS 6,000', popular: false,
      desc: 'Modern kente gown with light bead accents. Excludes kente fabric.',
      images: []
    },
    { id: 2, name: 'Classic Kente Gown', price: 'GHS 8,500', popular: false,
      desc: 'Traditional kente silhouette with corset bodice. Excludes kente fabric.',
      images: []
    },
    { id: 3, name: 'Kente Luxe Beadwork', price: 'GHS 10,000', popular: true,
      desc: 'Kente + heavy beadwork and stones. Red carpet ready. Excludes kente fabric.',
      images: []
    },
    { id: 4, name: 'Kente Deluxe Beadwork', price: 'GHS 15,000', popular: false,
      desc: 'Couture kente with 3D beadwork, crystals, and custom motifs. Excludes kente fabric.',
      images: []
    },
  ],
}

const TABS = [
  { key: 'wedding', label: 'Wedding Gowns' },
  { key: 'bridal', label: 'Bridal Shower' },
  { key: 'thanksgiving', label: 'Thanksgiving' },
  { key: 'engagement', label: 'Engagement' },
]

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState('wedding')
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [step, setStep] = useState('info') // 'info' | 'checkout' | 'success'
  const [clientData, setClientData] = useState({ name: '', email: '', phone: '' })
  const [activeImgIdx, setActiveImgIdx] = useState(0)

  const activeTier = PRICING_DATA[activeTab]

  useEffect(() => {
    if (selectedPackage) {
      document.body.style.overflow = 'hidden'
      setActiveImgIdx(0)
    } else {
      document.body.style.overflow = 'unset'
      setTimeout(() => setStep('info'), 300)
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedPackage])

  const closeModal = () => setSelectedPackage(null)
  const handlePlaceOrder = () => setStep('checkout')
  const updateField = (field, value) => setClientData(prev => ({...prev, [field]: value }))

  const handleCheckout = (e) => {
    e.preventDefault()
    // YOU HANDLE PAYSTACK HERE
    // const amount = parseInt(selectedPackage.price.replace(/[^0-9]/g, '')) * 100
    // PaystackPop.setup({ key: 'pk_xxx', email: clientData.email, amount, callback: () => setStep('success') }).openIframe()
    setTimeout(() => setStep('success'), 800) // simulate
  }

  const priceNumber = selectedPackage? parseInt(selectedPackage.price.replace(/[^0-9]/g, '')) : 0

  return (
    <>
      <motion.section
        id='pricing'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
        className='m-3 relative mx-auto max-w-7xl bg-white px-4 py-20 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 sm:px-6 lg:py-28'
      >
        <div className='pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-40'>
          <div className='absolute left-1/2 top-0 h- w- -translate-x-1/2 rounded-full bg-rose-200/60 blur- dark:bg-rose-500/20' />
        </div>

        <motion.div variants={fadeUp} className='mb-12 text-center md:mb-16'>
          <span className='mb-4 inline-block rounded-full border border-rose-300 bg-rose-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300'>
            Investment
          </span>
          <h2 className='bg-gradient-to-b from-zinc-900 to-zinc-600 bg-clip-text text-4xl font-black text-transparent dark:from-white dark:to-zinc-400 sm:text-5xl md:text-6xl'>
            Packages & Pricing
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-balance text-zinc-600 dark:text-zinc-400 sm:text-lg'>
            Transparent rates for your dream day. Custom quotes available for unique visions.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={1}
          className='mb-10 flex flex-wrap justify-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-100/80 p-1.5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/40 sm:gap-1'
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 sm:px-6 ${
                activeTab === tab.key
                ? 'text-white dark:text-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              {activeTab === tab.key && (
                <motion.div
                  layoutId='activeTab'
                  className='absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500'
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className='relative z-10'>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeTab}
          initial='hidden'
          animate='visible'
          transition={{ staggerChildren: 0.05 }}
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        >
          {activeTier.map((tier, i) => (
            <motion.div
              key={tier.id}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className={`group relative flex flex-col rounded-3xl border p-6 transition-all duration-300 sm:p-7 ${
                tier.popular
                ? 'border-rose-300 bg-gradient-to-b from-rose-50 via-rose-50/50 to-white shadow-lg shadow-rose-200/50 hover:shadow-rose-300/60 dark:border-rose-400/40 dark:from-rose-500/15 dark:via-rose-500/5 dark:to-transparent dark:shadow-rose-500/10 dark:hover:shadow-rose-500/20'
                  : 'border-zinc-200 bg-white shadow-sm hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-zinc-900/40 dark:shadow-none dark:hover:border-white/20'
              }`}
            >
              {tier.popular && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-4 py-1.5 text- font-bold uppercase tracking-wide text-white shadow-lg shadow-rose-500/30 dark:text-zinc-900'>
                  <Sparkles className='h-3.5 w-3.5' /> Most Popular
                </div>
              )}

              <div className='flex-1'>
                <p className='text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'>
                  {tier.name}
                </p>
                <div className='mt-3 flex items-baseline gap-1'>
                  <span className='text-3xl font-black tracking-tight text-zinc-900 dark:text-white lg:text-4xl'>
                    {tier.price.split(' ')[1]}
                  </span>
                  <span className='text-sm font-medium text-zinc-500'>
                    {tier.price.split(' ')[0]}
                  </span>
                </div>
              </div>

              <motion.button
                onClick={() => setSelectedPackage(tier)}
                whileTap={{ scale: 0.97 }}
                className={`cursor-pointer mt-7 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                  tier.popular
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:shadow-lg hover:shadow-rose-500/25 dark:text-zinc-900'
                    : 'bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-inset dark:ring-white/10 dark:hover:bg-white/15 dark:hover:ring-white/20'
                }`}
              >
                <Check className='h-4 w-4' />
                Select Package
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={2}
          className='mx-auto mt-16 grid max-w-4xl gap-4 text-sm md:grid-cols-2'
        >
          <div className='rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-900 dark:border-amber-400/20 dark:bg-gradient-to-br dark:from-amber-500/10 dark:to-transparent dark:text-amber-200/90'>
            <span className='font-semibold text-amber-950 dark:text-amber-200'>Note:</span> Rates may differ for plus size. Engagement prices exclude kente fabric.
          </div>
          <div className='rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-zinc-700 dark:border-white/10 dark:bg-zinc-900/40 dark:text-zinc-300'>
            <span className='font-semibold text-zinc-900 dark:text-white'>Veil:</span> Plain cathedral GHS 500. Custom veil with borders GHS 1,500–2,500.
          </div>
        </motion.div>
      </motion.section>

      {/* Modal */}
      <AnimatePresence>
        {selectedPackage && (
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
              className='fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2'
            >
              <div className='max-h- overflow-y-auto rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-white/10 dark:bg-zinc-900'>

                {/* Step 1: Info + Images */}
                {step === 'info' && (
                  <div className='p-8'>
                    <div className='flex items-start justify-between'>
                      <div className='flex items-start gap-3'>
                        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300'>
                          <Package className='h-6 w-6' />
                        </div>
                        <div>
                          <h3 className='text-2xl font-bold text-zinc-900 dark:text-white'>
                            {selectedPackage.name}
                          </h3>
                          <p className='mt-1 text-sm font-semibold text-rose-600 dark:text-rose-400'>
                            {selectedPackage.price}
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

                    {/* Image area - drop your images here */}
                    <div className='mt-6'>
                      {selectedPackage.images?.length > 0? (
                        <>
                          <div className='aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-white/5'>
                            <img
                              src={selectedPackage.images[activeImgIdx]}
                              alt={selectedPackage.name}
                              className='h-full w-full object-cover'
                            />
                          </div>
                          {selectedPackage.images.length > 1 && (
                            <div className='mt-3 flex gap-2 overflow-x-auto pb-1'>
                              {selectedPackage.images.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveImgIdx(idx)}
                                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                                    activeImgIdx === idx
                                   ? 'border-rose-500'
                                    : 'border-transparent opacity-60 hover:opacity-100'
                                  }`}
                                >
                                  <img src={img} alt='' className='h-full w-full object-cover' />
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className='flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 text-zinc-400 dark:border-white/10 dark:bg-white/5 dark:text-zinc-500'>
                          <ImageIcon className='h-10 w-10' />
                          <p className='mt-2 text-sm'>Drop package images here</p>
                        </div>
                      )}
                    </div>

                    <div className='mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300'>
                      {selectedPackage.desc}
                    </div>

                    <div className='mt-6 grid grid-cols-3 gap-3 text-center text-xs'>
                      <div className='rounded-xl border border-zinc-200 bg-white p-3 dark:border-white/10 dark:bg-white/5'>
                        <p className='font-semibold text-zinc-900 dark:text-white'>3-8</p>
                        <p className='mt-1 text-zinc-500 dark:text-zinc-400'>Fittings</p>
                      </div>
                      <div className='rounded-xl border border-zinc-200 bg-white p-3 dark:border-white/10 dark:bg-white/5'>
                        <p className='font-semibold text-zinc-900 dark:text-white'>3-6mo</p>
                        <p className='mt-1 text-zinc-500 dark:text-zinc-400'>Lead Time</p>
                      </div>
                      <div className='rounded-xl border border-zinc-200 bg-white p-3 dark:border-white/10 dark:bg-white/5'>
                        <p className='font-semibold text-zinc-900 dark:text-white'>Custom</p>
                        <p className='mt-1 text-zinc-500 dark:text-zinc-400'>Fit</p>
                      </div>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      className='mt-8 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white hover:scale-[1.02] active:scale-[0.98] dark:text-zinc-900'
                    >
                      Place Order — {selectedPackage.price}
                    </button>
                  </div>
                )}

                {/* Step 2: Checkout */}
                {step === 'checkout' && (
                  <div className='p-8'>
                    <div className='flex items-start justify-between'>
                      <div className='flex items-center gap-3'>
                        <button
                          onClick={() => setStep('info')}
                          className='rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white'
                        >
                          <ArrowLeft className='h-5 w-5' />
                        </button>
                        <div>
                          <h3 className='text-2xl font-bold text-zinc-900 dark:text-white'>
                            Confirm Order
                          </h3>
                          <p className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>
                            {selectedPackage.name}
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

                    <form onSubmit={handleCheckout} className='mt-6 space-y-4'>
                      <div>
                        <label className='mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
                          Full Name
                        </label>
                        <input
                          type='text'
                          required
                          value={clientData.name}
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
                          value={clientData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white'
                          placeholder='your@email.com'
                        />
                      </div>

                      <div>
                        <label className='mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
                          Phone
                        </label>
                        <input
                          type='tel'
                          required
                          value={clientData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white'
                          placeholder='+233...'
                        />
                      </div>

                      <div className='rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-zinc-600 dark:text-zinc-400'>Subtotal</span>
                          <span className='font-semibold text-zinc-900 dark:text-white'>{selectedPackage.price}</span>
                        </div>
                        <div className='mt-2 flex justify-between border-t border-zinc-200 pt-2 text-sm dark:border-white/10'>
                          <span className='font-semibold text-zinc-900 dark:text-white'>Total</span>
                          <span className='font-bold text-rose-600 dark:text-rose-400'>{selectedPackage.price}</span>
                        </div>
                      </div>

                      <div className='rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200'>
                        <div className='flex gap-2'>
                          <CreditCard className='h-5 w-5 shrink-0' />
                          <p>Clicking “Pay Now” will initialize Paystack. Complete payment securely with card or mobile money.</p>
                        </div>
                      </div>

                      <button
                        type='submit'
                        className='w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white hover:scale-[1.02] active:scale-[0.98] dark:text-zinc-900'
                      >
                        Pay {selectedPackage.price} with Paystack
                      </button>
                    </form>
                  </div>
                )}

                {/* Step 3: Success */}
                {step === 'success' && (
                  <div className='p-8 text-center'>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                      className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10'
                    >
                      <CheckCircle2 className='h-8 w-8 text-emerald-600 dark:text-emerald-400' />
                    </motion.div>

                    <h3 className='mt-6 text-2xl font-bold text-zinc-900 dark:text-white'>
                      Order Confirmed!
                    </h3>
                    <p className='mt-2 text-balance text-sm text-zinc-600 dark:text-zinc-400'>
                      Payment successful. We’ve sent your receipt to <span className='font-semibold text-zinc-900 dark:text-white'>{clientData.email}</span>.
                    </p>

                    <div className='mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-left text-sm dark:border-white/10 dark:bg-white/5'>
                      <div className='flex justify-between'>
                        <span className='text-zinc-600 dark:text-zinc-400'>Package</span>
                        <span className='font-medium text-zinc-900 dark:text-white'>{selectedPackage.name}</span>
                      </div>
                      <div className='mt-2 flex justify-between'>
                        <span className='text-zinc-600 dark:text-zinc-400'>Amount Paid</span>
                        <span className='font-semibold text-emerald-600 dark:text-emerald-400'>{selectedPackage.price}</span>
                      </div>
                      <div className='mt-2 flex justify-between'>
                        <span className='text-zinc-600 dark:text-zinc-400'>Client</span>
                        <span className='font-medium text-zinc-900 dark:text-white'>{clientData.name}</span>
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

export default PricingSection