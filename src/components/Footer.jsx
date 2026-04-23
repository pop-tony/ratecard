import React from 'react'
import { motion } from "motion/react"
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

// Inline brand SVGs since lucide doesn't have them
const InstagramIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const FacebookIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const TikTokIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)

const Footer = () => {
  const year = new Date().getFullYear()
  
  const links = [
    {
      title: 'Collections',
      items: [
        { label: 'Wedding Gowns', href: '#pricing' },
        { label: 'Engagement Looks', href: '#pricing' },
        { label: 'Bridal Shower', href: '#pricing' },
        { label: 'Thanksgiving', href: '#pricing' },
      ]
    },
    {
      title: 'Company',
      items: [
        { label: 'About Angela Hayford', href: '#about' },
        { label: 'Consultation', href: '#consultation' },
        { label: 'Terms & Conditions', href: '#terms' },
      ]
    }
  ]

  const socials = [
    { icon: <InstagramIcon className='h-5 w-5' />, label: 'Instagram', href: 'https://instagram.com/angelahayford_' },
    { icon: <FacebookIcon className='h-5 w-5' />, label: 'Facebook', href: 'https://facebook.com/angelahayford' },
    { icon: <TikTokIcon className='h-5 w-5' />, label: 'TikTok', href: 'https://tiktok.com/@angela.hayford' },
    { icon: <Mail className='h-5 w-5' />, label: 'Email', href: 'mailto:angelahhayford@gmail.com' },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className='relative border-t border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100'
    >
      <div className='h-px w-full bg-gradient-to-r from-transparent via-rose-500/50 to-transparent' />
      
      <div className='mx-auto max-w-7xl px-6 py-16 lg:py-20'>
        <div className='grid gap-12 lg:grid-cols-12 lg:gap-8'>
          
          {/* Brand + Newsletter */}
          <div className='lg:col-span-5'>
            <h3 className='bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-2xl font-black text-transparent dark:from-white dark:to-zinc-400'>
              Angela Hayford
            </h3>
            <p className='mt-4 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'>
              Bespoke bridal couture for the modern Ghanaian bride. Every stitch tells your love story.
            </p>

            <div className='mt-8'>
              <p className='text-sm font-semibold text-zinc-900 dark:text-white'>
                Join the atelier list
              </p>
              <p className='mt-1 text-xs text-zinc-500 dark:text-zinc-500'>
                New collections, bridal tips, and exclusive previews.
              </p>
              <form className='mt-4 flex gap-2'>
                <input
                  type='email'
                  placeholder='your@email.com'
                  className='flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-rose-400/50'
                />
                <button
                  type='submit'
                  className='shrink-0 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] dark:text-zinc-900'
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div className='grid grid-cols-2 gap-8 lg:col-span-4 lg:grid-cols-2'>
            {links.map((col) => (
              <div key={col.title}>
                <p className='text-sm font-semibold text-zinc-900 dark:text-white'>
                  {col.title}
                </p>
                <ul className='mt-4 space-y-3'>
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className='group inline-flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                      >
                        {item.label}
                        <ArrowUpRight className='h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact + Socials */}
          <div className='lg:col-span-3'>
            <p className='text-sm font-semibold text-zinc-900 dark:text-white'>
              Get in touch
            </p>
            <ul className='mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400'>
              <li className='flex items-start gap-2'>
                <MapPin className='mt-0.5 h-4 w-4 shrink-0 text-rose-500' />
                <span>East Legon, Accra<br />Ghana</span>
              </li>
              <li className='flex items-center gap-2'>
                <Phone className='h-4 w-4 shrink-0 text-rose-500' />
                <a href='tel:+233203713179' className='hover:text-zinc-900 dark:hover:text-white'>
                  +233 203713179
                </a>
              </li>
              <li className='flex items-center gap-2'>
                <Mail className='h-4 w-4 shrink-0 text-rose-500' />
                <a href='angelahhayford@gmail.com' className='hover:text-zinc-900 dark:hover:text-white'>
                  hello@angelahayford.com
                </a>
              </li>
            </ul>

            <div className='mt-6 flex gap-3'>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className='flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-600 transition-all hover:border-rose-500 hover:text-rose-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-rose-400/50 dark:hover:text-rose-300'
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-500 sm:flex-row'>
          <p>© {year} Angela Hayford Atelier. All rights reserved.</p>
          <div className='flex gap-6'>
            <a href='#terms' className='hover:text-zinc-900 dark:hover:text-white'>Privacy</a>
            <a href='#terms' className='hover:text-zinc-900 dark:hover:text-white'>Terms</a>
            <a href='#' className='hover:text-zinc-900 dark:hover:text-white'>Sitemap</a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer