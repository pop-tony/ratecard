import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "motion/react"
import { Sparkles, Check, X, ArrowDown, ArrowLeft, CreditCard, CheckCircle2, Package, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import ClientIntakeForm from './ClientIntakeForm'
import axios from 'axios'

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

const PRICING_DATA = {
  wedding: [
    { id: 1, name: 'Luxe Court', price: 'GHS 6,000', popular: false,
      desc: 'Classic court train silhouette with premium satin. Includes basic beadwork, 3 fittings, and custom bustle.',
      images: ['/images/luxe-court-1.jpg', '/images/luxe-court-2.jpg']
    },
    { id: 2, name: 'Deluxe Court', price: 'GHS 9,000', popular: false,
      desc: 'Extended court train with lace appliqué and crystal detailing. 4 fittings included.',
      images: []
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
      images: []
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
  const [step, setStep] = useState('info')
  const [clientData, setClientData] = useState({ name: '', email: '', phone: '', eDate: '04/04/2026', wDate: '04/04/2026', bAddress: 'Home' })
  const [activeImgIdx, setActiveImgIdx] = useState(0)

  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const activeTier = PRICING_DATA[activeTab]
  const key = import.meta.env.VITE_PAYSTACK_LIVE_PUBLIC_KEY

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
  const onSubmitHandler = () => setStep('success')

  const getPriceInKobo = (priceStr) => parseInt(priceStr.replace(/\D/g, '')) * 100

  const payWithPaystack = async (e) => {
    e.preventDefault()
    if (!window.PaystackPop) {
      toast.error('Payment service not loaded. Please refresh.')
      return
    }
    try {
      const handler = window.PaystackPop.setup({
        key: key,
        email: clientData.email,
        amount: getPriceInKobo(selectedPackage.price),
        currency: 'GHS',
        ref: `${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
        onClose: () => toast.info('Payment window closed'),
        callback: (response) => {
          toast.success(`Payment complete! Ref: ${response.reference}`)
          setStep('success')
          setPaymentSuccess(true);
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
    if(!paymentSuccess) return;
    
    try {
      const order = await axios.post("https://sojamart-backend.vercel.app/api/order/create-orderA", {clientData, selectedPackage});
      if(order.success){
        toast.success("Order successfully made!")
        setPaymentSuccess(false);
      }
    } catch (error) {
      toast.error("Unable to place order.. try again")
     console.log(error) 
    }

  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    await payWithPaystack(e)
  }

  useEffect(()=>{
    if(paymentSuccess) creatOrder();
  },[paymentSuccess])

  return (
    <>
      <motion.section
        id='pricing'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
        className='relative mx-auto max-w-7xl bg-white px-4 py-16 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 sm:px-6 sm:py-20 lg:py-28'
      >
        <div className='pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-40'>
          <div className='absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-rose-200/60 blur-3xl dark:bg-rose-500/20 sm:h-96 sm:w-96' />
        </div>

        <motion.div variants={fadeUp} className='mb-10 text-center md:mb-16'>
          <span className='mb-3 inline-block rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300 sm:px-4 sm:py-1.5'>
            Investment
          </span>
          <h2 className='bg-gradient-to-b from-zinc-900 to-zinc-600 bg-clip-text text-3xl font-black text-transparent dark:from-white dark:to-zinc-400 sm:text-4xl md:text-5xl lg:text-6xl'>
            Packages & Pricing
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-balance text-sm text-zinc-600 dark:text-zinc-400 sm:mt-4 sm:text-base lg:text-lg'>
            Transparent rates for your dream day. Custom quotes available for unique visions.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={1}
          className='mb-8 flex justify-start overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-100/80 p-1.5 backdrop-blur-xl scrollbar-hide dark:border-white/10 dark:bg-zinc-900/40 sm:mb-10 sm:justify-center'
        >
          <div className='flex gap-1'>
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold transition-colors duration-200 sm:px-4 sm:py-2.5 sm:text-sm lg:px-6 ${
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
          </div>
        </motion.div>

        <motion.div
          key={activeTab}
          initial='hidden'
          animate='visible'
          transition={{ staggerChildren: 0.05 }}
          className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4'
        >
          {activeTier.map((tier, i) => (
            <motion.div
              key={tier.id}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className={`group relative flex flex-col rounded-2xl border p-5 transition-all duration-300 sm:rounded-3xl sm:p-6 lg:p-7 lg:hover:shadow-lg ${
                tier.popular
                 ? 'border-rose-300 bg-gradient-to-b from-rose-50 via-rose-50/50 to-white shadow-lg shadow-rose-200/50 lg:hover:shadow-rose-300/60 dark:border-rose-400/40 dark:from-rose-500/15 dark:via-rose-500/5 dark:to-transparent dark:shadow-rose-500/10 dark:lg:hover:shadow-rose-500/20'
                  : 'border-zinc-200 bg-white shadow-sm lg:hover:border-zinc-300 lg:hover:shadow-md dark:border-white/10 dark:bg-zinc-900/40 dark:shadow-none dark:lg:hover:border-white/20'
              }`}
            >
              {tier.popular && (
                <div className='absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-3 py-1 text- font-bold uppercase tracking-wide text-white shadow-lg shadow-rose-500/30 dark:text-zinc-900 sm:-top-3 sm:px-4 sm:py-1.5 sm:text-xs'>
                  <Sparkles className='h-3 w-3 sm:h-3.5 sm:w-3.5' /> Most Popular
                </div>
              )}

              <div className='flex-1'>
                <p className='text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 sm:text-sm'>
                  {tier.name}
                </p>
                <div className='mt-2 flex items-baseline gap-1 sm:mt-3'>
                  <span className='text-2xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-3xl lg:text-4xl'>
                    {tier.price.split(' ')[1]}
                  </span>
                  <span className='text-xs font-medium text-zinc-500 sm:text-sm'>
                    {tier.price.split(' ')[0]}
                  </span>
                </div>
              </div>

              <motion.button
                onClick={() => setSelectedPackage(tier)}
                whileTap={{ scale: 0.97 }}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                  tier.popular
                   ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white lg:hover:shadow-lg lg:hover:shadow-rose-500/25 dark:text-zinc-900'
                    : 'bg-zinc-900 text-white lg:hover:bg-zinc-700 dark:bg-white/10 dark:text-white dark:ring-1 dark:ring-inset dark:ring-white/10 dark:lg:hover:bg-white/15 dark:lg:hover:ring-white/20'
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
          className='mx-auto mt-12 grid max-w-4xl gap-3 text-xs sm:mt-16 sm:gap-4 sm:text-sm md:grid-cols-2'
        >
          <div className='rounded-xl border border-amber-300 bg-amber-40 p-4 text-amber-900 dark:border-amber-400/20 dark:bg-gradient-to-br dark:from-amber-200/10 dark:to-transparent dark:text-amber-200/90 sm:rounded-2xl sm:p-5'>
            <span className='font-semibold text-amber-950 dark:text-amber-200'>Note:</span> Rates may differ for plus size. Engagement prices exclude kente fabric.
          </div>
          <div className='rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-700 dark:border-white/10 dark:bg-zinc-900/40 dark:text-zinc-300 sm:rounded-2xl sm:p-5'>
            <span className='font-semibold text-zinc-900 dark:text-white'>Veil:</span> Plain cathedral GHS 500. Custom veil with borders GHS 1,500–2,500.
          </div>
        </motion.div>
      </motion.section>

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
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              className='fixed inset-x-0 bottom-0 z-50 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-[calc(100%-2rem)] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2'
            >
              <div className='max-h- overflow-y-auto rounded-t-3xl border border-zinc-200 bg-white shadow-2xl dark:border-white/10 dark:bg-zinc-900 sm:rounded-3xl'>

                {step === 'info' && (
                  <div className='p-5 sm:p-8'>
                    <div className='flex items-start justify-between gap-3'>
                      <div className='flex items-start gap-3'>
                        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300 sm:h-12 sm:w-12'>
                          <Package className='h-5 w-5 sm:h-6 sm:w-6' />
                        </div>
                        <div>
                          <h3 className='text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl'>
                            {selectedPackage.name}
                          </h3>
                          <p className='mt-0.5 text-sm font-semibold text-rose-600 dark:text-rose-400'>
                            {selectedPackage.price}
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

                    <div className='mt-5 sm:mt-6'>
                      {selectedPackage.images?.length > 0? (
                        <>
                          <div className='aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 dark:bg-white/5 sm:rounded-2xl'>
                            <img
                              src={selectedPackage.images[activeImgIdx]}
                              alt={selectedPackage.name}
                              className='h-full w-full object-cover'
                            />
                          </div>
                          {selectedPackage.images.length > 1 && (
                            <div className='mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide'>
                              {selectedPackage.images.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveImgIdx(idx)}
                                  className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-16 sm:w-16 ${
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
                        <div className='flex aspect-[4/3] flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 text-zinc-400 dark:border-white/10 dark:bg-white/5 dark:text-zinc-500 sm:rounded-2xl'>
                          <ImageIcon className='h-8 w-8 sm:h-10 sm:w-10' />
                          <p className='mt-2 text-xs sm:text-sm'>Add package images</p>
                        </div>
                      )}
                    </div>

                    <div className='mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 sm:mt-6 sm:rounded-2xl sm:p-5'>
                      {selectedPackage.desc}
                    </div>

                    <div className='mt-5 grid grid-cols-3 gap-2 text-center text-xs sm:mt-6 sm:gap-3 sm:text-sm'>
                      <div className='rounded-lg border border-zinc-200 bg-white p-2.5 dark:border-white/10 dark:bg-white/5 sm:rounded-xl sm:p-3'>
                        <p className='font-semibold text-zinc-900 dark:text-white'>3-8</p>
                        <p className='mt-0.5 text-zinc-500 dark:text-zinc-400'>Fittings</p>
                      </div>
                      <div className='rounded-lg border border-zinc-200 bg-white p-2.5 dark:border-white/10 dark:bg-white/5 sm:rounded-xl sm:p-3'>
                        <p className='font-semibold text-zinc-900 dark:text-white'>3-6mo</p>
                        <p className='mt-0.5 text-zinc-500 dark:text-zinc-400'>Lead Time</p>
                      </div>
                      <div className='rounded-lg border border-zinc-200 bg-white p-2.5 dark:border-white/10 dark:bg-white/5 sm:rounded-xl sm:p-3'>
                        <p className='font-semibold text-zinc-900 dark:text-white'>Custom</p>
                        <p className='mt-0.5 text-zinc-500 dark:text-zinc-400'>Fit</p>
                      </div>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      className='mt-6 w-full rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-sm font-semibold text-white active:scale-[0.98] dark:text-zinc-900 sm:mt-8'
                    >
                      Place Order — {selectedPackage.price}
                    </button>
                  </div>
                )}

                {step === 'checkout' && (
                  <div className='p-5 sm:p-8'>
                    <div className='flex items-center justify-between gap-3'>
                      <div className='flex items-center gap-2 sm:gap-3'>
                        <button
                          onClick={() => setStep('info')}
                          className='-ml-2 rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white'
                        >
                          <ArrowLeft className='h-5 w-5' />
                        </button>
                        <div>
                          <h3 className='text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl'>
                            Confirm Order
                          </h3>
                          <p className='mt-0.5 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm'>
                            {selectedPackage.name}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={closeModal}
                        className='-mr-2 rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white'
                      >
                        <X className='h-5 w-5' />
                      </button>
                    </div>

                    <ClientIntakeForm
                      selectedPackage={selectedPackage}
                      handleCheckout={handleCheckout}
                      clientData={clientData}
                      CreditCard={CreditCard}
                      updateField={updateField}
                      X={X}
                      ArrowDown={ArrowDown}
                    />
                  </div>
                )}

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
                      Order Confirmed!
                    </h3>
                    <p className='mt-2 text-balance text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm'>
                      Payment successful. We’ve sent your receipt to <span className='font-semibold text-zinc-900 dark:text-white'>{clientData.email}</span>.
                    </p>

                    <div className='mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-left text-xs dark:border-white/10 dark:bg-white/5 sm:mt-6 sm:rounded-2xl sm:p-4 sm:text-sm'>
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

export default PricingSection