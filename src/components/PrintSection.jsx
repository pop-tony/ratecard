import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Printer } from 'lucide-react'

const PrintSection = ({ children, title = 'Rate Card' }) => {
  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Angela-Hayford-${title}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 15mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
       .no-print {
          display: none!important;
        }
       .print-container {
          box-shadow: none!important;
          border: none!important;
          background: white!important;
          color: black!important;
        }
      }
    `
  })

  return (
    <div className='relative'>
      <button
        onClick={handlePrint}
        className='no-print absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10'
      >
        <Printer className='h-4 w-4' /> Print PDF
      </button>

      <div ref={componentRef} className='print-container'>
        {children}
      </div>
    </div>
  )
}

export default PrintSection