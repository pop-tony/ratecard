import React from 'react';
import { Info, Clock, AlertCircle, Scissors } from 'lucide-react';

const PRICING_DATA = {
  wedding: [
    { id: 1, name: 'Luxe Court Gown', price: 'GHS 6,000', popular: false,
      desc: 'Classic court train silhouette with premium satin. Includes basic beadwork, 3 fittings, and custom bustle.' },
    { id: 2, name: 'Deluxe Court Gown', price: 'GHS 9,000', popular: false,
      desc: 'Extended court train with lace appliqué and crystal detailing. 4 fittings included.' },
    { id: 3, name: 'Classic Plain Gown', price: 'GHS 8,000', popular: false,
      desc: 'Minimalist crepe gown with clean lines. Perfect for modern brides. 3 fittings.' },
    { id: 4, name: 'Luxe Plain Gown', price: 'GHS 10,000 - GHS 14,000', popular: false,
      desc: 'Structured mikado with hidden corsetry. Sculptural and elegant. 4 fittings.' },
    { id: 5, name: 'Deluxe Plain Gown', price: 'GHS 14,000 - GHS 20,000', popular: true,
      desc: 'Two looks in one. Detachable overskirt + fitted base gown. 5 fittings included.' },
    { id: 10, name: 'Normal beaded lace Gown', price: 'GHS 9,500 - GHS 13,000', popular: false,
      desc: 'Bespoke ball gown with hand-draped bodice, 3D florals, and chapel train. 8 fittings.' },
    { id: 6, name: 'Classic Lace Gown', price: 'GHS 14,000 - GHS 17,000', popular: false,
      desc: 'All-over Chantilly lace with illusion back. Timeless romantic feel. 4 fittings.' },
    { id: 7, name: 'Luxe Lace Gown', price: 'GHS 17,000 - GHS 20,000', popular: false,
      desc: 'Hand-beaded French lace with cathedral train. Heirloom quality. 5 fittings.' },
    { id: 8, name: 'Deluxe Lace Gown', price: 'GHS 20,000 - GHS 35,000', popular: false,
      desc: 'Couture lace with custom embroidery and Swarovski crystals. 6 fittings.' },
    { id: 9, name: 'Luxe Ball Gown', price: 'GHS 25,000 - GHS 30,000', popular: false,
      desc: 'Full ball gown with layered tulle and structured bodice. Princess moment. 6 fittings.' },
    { id: 10, name: 'Deluxe Ball Gown', price: 'GHS 35,000 - GHS 45,000', popular: false,
      desc: 'Bespoke ball gown with hand-draped bodice, 3D florals, and chapel train. 8 fittings.' },
    { id: 10, name: 'Custom beaded Gown', price: 'GHS 45,000 - GHS 50,000', popular: false,
    desc: 'Bespoke ball gown with hand-draped bodice, 3D florals, and chapel train. 8 fittings.' },
  ],
  bridal: [
    { id: 1, name: 'Luxe', price: 'GHS 2,500 - GHS 3,500', popular: false,
      desc: 'Chic mini or midi dress for your bridal shower. Custom fit, luxe fabric. 2 fittings included.' },
    { id: 2, name: 'Deluxe', price: 'GHS 4,500 - GHS 6,500', popular: false,
      desc: 'Statement shower look with feathers, pearls, or custom embroidery. 3 fittings included.' },
  ],
  thanksgiving: [
    { id: 1, name: 'Luxe', price: 'GHS 4,000 - GHS 6,500', popular: false,
      desc: 'Elegant thanksgiving dress in Ankara, lace, or crepe. Church-ready. 2 fittings included.' },
    { id: 2, name: 'Deluxe', price: 'GHS 7,000 - GHS 9,000', popular: true,
      desc: 'Heavily beaded or custom-printed thanksgiving gown. Stand-out piece. 3 fittings included.' },
  ],
  reception: [
    { id: 1, name: 'Plain Reception gown', price: 'GHS 5,000', popular: false,
      desc: 'Chic mini or midi dress for your bridal shower. Custom fit, luxe fabric. 2 fittings included.', images: [] },
    { id: 2, name: 'Short Reception dress wtih normal beaded lace', price: 'GHS 6,500', popular: false,
      desc: 'Statement shower look with feathers, pearls, or custom embroidery. 3 fittings included.', images: [] },
    { id: 3, name: 'Long reception dress with normal beaded lace', price: 'GHS 9,000', popular: false,
      desc: 'Statement shower look with feathers, pearls, or custom embroidery. 3 fittings included.', images: [] },
    { id: 4, name: 'Short Reception dress with luxury lace', price: 'GHS 9,000', popular: false,
      desc: 'Statement shower look with feathers, pearls, or custom embroidery. 3 fittings included.', images: [] },
    { id: 6, name: 'Luxe reception dress', price: 'GHS 13,000 - GHS 17,000', popular: false,
      desc: 'Statement shower look with feathers, pearls, or custom embroidery. 3 fittings included.', images: [] },
    { id: 7, name: 'Deluxe reception dress', price: 'GHS 17,000', popular: false,
      desc: 'Statement shower look with feathers, pearls, or custom embroidery. 3 fittings included.', images: [] },
    { id: 8, name: 'Short Custom hand beaded reception dress', price: 'GHS 15,000 - GHS 20,000', popular: false,
      desc: 'Statement shower look with feathers, pearls, or custom embroidery. 3 fittings included.', images: [] },
    { id: 9, name: 'Long Custom hand beaded reception dress', price: 'GHS 25,000 - GHS 30,000', popular: false,
      desc: 'Statement shower look with feathers, pearls, or custom embroidery. 3 fittings included.', images: [] },
 ],
  engagement: [
    { id: 1, name: 'Kente Minimal Beadwork', price: 'GHS 6,000 - GHS 7,000', popular: false,
      desc: 'Modern kente gown with light bead accents. Excludes kente fabric. 3 fittings.' },
    { id: 2, name: 'Classic Kente Gown', price: 'GHS 8,500 - GHS 10,000', popular: false,
      desc: 'Traditional kente silhouette with corset bodice. Excludes kente fabric. 3 fittings.' },
    { id: 3, name: 'Kente Luxe Beadwork', price: 'GHS 10,000 - GHS 15,000', popular: true,
      desc: 'Kente + heavy beadwork and stones. Red carpet ready. Excludes kente fabric. 4 fittings.' },
    { id: 4, name: 'Kente Deluxe Beadwork', price: 'GHS 15,000 - GHS 20,000', popular: false,
      desc: 'Couture kente with 3D beadwork, crystals, and custom motifs. Excludes kente fabric. 5 fittings.' },
  ],
}

const TABS = [
  { key: 'wedding', label: 'Wedding Gowns' },
  { key: 'bridal', label: 'Bridal Shower' },
  { key: 'thanksgiving', label: 'Thanksgiving' },
  { key: 'reception', label: 'Reception' },
  { key: 'engagement', label: 'Engagement' },
]

const TERMS = [
  {
    title: 'Payment Policies',
    content: '70% deposit due to secure the date upon agreement between Angela Hayford and Client. 30% balance due one week before collection. Payment validates booking.'
  },
  {
    title: 'Cancellation & Date Changes',
    content: 'Cancelled 2 months or less before booked date: deposits refundable after 2 months with 20% cancellation fee if sewing has not started. If sewing has started: fabric + unfinished/finished garment returned to client, fabric and sewing costs deducted from deposit.'
  },
  {
    title: 'Fittings',
    content: 'Clients must attend at least two fittings before collection of outfits. Failure to do so means designer is not accountable for fitting problems or alteration costs.'
  },
  {
    title: 'Transportation & Accommodation',
    content: 'Transportation is discussed based on location. Bridal dress up: Accra GHS 600, Outside Accra GHS 1500, Outside Ghana GHS 2500–3500. Client is responsible for travel, accommodation, and feeding for events outside Accra. Flight is booked by client for locations outside Ghana and outside Accra.'
  }
];

const CONSULTATION_DETAILS = [
  { icon: Info, title: 'Consultation Fee', desc: 'GHS 400 - GHS 800 for 30-minute session with lead designer' },
  { icon: Clock, title: 'Booking Timeline', desc: 'Book 3–6 months or up to 1 year before event date' },
  { icon: AlertCircle, title: 'Style Preparation', desc: 'Bring style inspirations. Indecisive clients should book consultation first' },
  { icon: Scissors, title: 'Mock-ups', desc: 'Style inspiration mock-ups are charged separately. Price is set by designer after consultation' },
];

const PageWrapper = ({ children }) => {
  const styles = {
    page: {
      width: '210mm',
      height: '297mm',
      padding: '15mm 18mm',
      margin: '0 auto',
      backgroundColor: '#fffaf8',
      fontFamily: '"Playfair Display", Georgia, serif',
      color: '#1a1a1a',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      pageBreakAfter: 'always',
    },
    header: {
      textAlign: 'center',
      borderBottom: '2px solid #d4af7a',
      paddingBottom: '10px',
      marginBottom: '12px',
    },
    brand: {
      fontSize: '32px',
      fontWeight: 700,
      letterSpacing: '2px',
      margin: 0,
      lineHeight: 1.1,
    },
    subhead: {
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      color: '#8a6d3b',
      margin: '6px 0 0',
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 500,
    },
    footer: {
      marginTop: 'auto',
      paddingTop: '10px',
      borderTop: '1.5px solid #e8dcc6',
      textAlign: 'center',
      fontSize: '10px',
      color: '#666',
      fontFamily: '"Montserrat", sans-serif',
      lineHeight: 1.5,
    },
  };

  return (
    <div style={styles.page} className="flyer-page">
      <header style={styles.header}>
        <h1 style={styles.brand}>ANGELA HAYFORD</h1>
        <p style={styles.subhead}>Bespoke Bridal Collection 2026</p>
      </header>
      
      {children}
      
    </div>
  );
};

const PricingPage = ({ title, items }) => {
  const styles = {
    sectionTitle: {
      fontSize: '22px',
      textAlign: 'center',
      margin: '12px 0 16px',
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
    list: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: items.length > 6 ? '8px' : '12px',
    },
    item: {
      border: '1.5px solid #e8dcc6',
      padding: items.length > 6 ? '9px 14px' : '12px 16px',
      backgroundColor: '#fff',
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '16px',
    },
    itemPopular: {
      border: '2px solid #d4af7a',
      backgroundColor: '#fffcf7',
    },
    popularRibbon: {
      position: 'absolute',
      top: '-1px',
      right: '-1px',
      backgroundColor: '#d4af7a',
      color: '#fff',
      fontSize: '8px',
      padding: '3px 10px',
      textTransform: 'uppercase',
      letterSpacing: '0.8px',
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
    },
    left: { flex: 1 },
    name: {
      fontSize: items.length > 6 ? '15px' : '16px',
      fontWeight: 600,
      margin: '0 0 4px',
      lineHeight: 1.2,
    },
    desc: {
      fontSize: items.length > 6 ? '11px' : '12px',
      color: '#444',
      margin: 0,
      lineHeight: 1.4,
      fontFamily: '"Montserrat", sans-serif',
    },
    price: {
      fontSize: items.length > 6 ? '16px' : '18px',
      color: '#8a6d3b',
      fontWeight: 700,
      margin: 0,
      fontFamily: '"Montserrat", sans-serif',
      whiteSpace: 'nowrap',
      paddingTop: '2px',
    },
  };

  return (
    <PageWrapper>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <div style={styles.list}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              ...styles.item,
              ...(item.popular ? styles.itemPopular : {})
            }}
          >
            {item.popular && <div style={styles.popularRibbon}>Most Popular</div>}
            <div style={styles.left}>
              <h3 style={styles.name}>{item.name}</h3>
              {/*<p style={styles.desc}>{item.desc}</p>*/}
            </div>
            <p style={styles.price}>{item.price}</p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

const TermsPage = () => {
  const styles = {
    sectionTitle: {
      fontSize: '24px',
      textAlign: 'center',
      margin: '12px 0 20px',
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
    termsList: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
    },
    termItem: {
      backgroundColor: '#fff',
      border: '1.5px solid #e8dcc6',
      padding: '16px 18px',
    },
    termTitle: {
      fontSize: '17px',
      fontWeight: 600,
      margin: '0 0 8px',
      color: '#8a6d3b',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontFamily: '"Montserrat", sans-serif',
    },
    termContent: {
      fontSize: '13px',
      color: '#333',
      margin: 0,
      lineHeight: 1.6,
      fontFamily: '"Montserrat", sans-serif',
    },
  };

  return (
    <PageWrapper>
      <h2 style={styles.sectionTitle}>Terms & Conditions</h2>
      <div style={styles.termsList}>
        {TERMS.map((term, idx) => (
          <div key={idx} style={styles.termItem}>
            <h3 style={styles.termTitle}>{term.title}</h3>
            <p style={styles.termContent}>{term.content}</p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

const ConsultationPage = () => {
  const styles = {
    sectionTitle: {
      fontSize: '22px',
      textAlign: 'center',
      margin: '12px 0 20px',
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '24px',
    },
    detailCard: {
      backgroundColor: '#fff',
      border: '1.5px solid #e8dcc6',
      padding: '16px',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
    },
    iconWrap: {
      color: '#d4af7a',
      flexShrink: 0,
      paddingTop: '2px',
    },
    detailTitle: {
      fontSize: '16px',
      fontWeight: 600,
      margin: '0 0 6px',
      color: '#1a1a1a',
      fontFamily: '"Montserrat", sans-serif',
    },
    detailDesc: {
      fontSize: '13px',
      color: '#444',
      margin: 0,
      lineHeight: 1.5,
      fontFamily: '"Montserrat", sans-serif',
    },
    formSection: {
      backgroundColor: '#fff',
      border: '2px solid #d4af7a',
      padding: '20px',
      marginTop: '8px',
    },
    formTitle: {
      fontSize: '16px',
      fontWeight: 600,
      margin: '0 0 16px',
      textAlign: 'center',
      color: '#8a6d3b',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontFamily: '"Montserrat", sans-serif',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginBottom: '12px',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #e8dcc6',
      fontSize: '11px',
      fontFamily: '"Montserrat", sans-serif',
      boxSizing: 'border-box',
      backgroundColor: '#fffaf8',
    },
    inputFull: {
      gridColumn: '1 / -1',
    },
    submitBtn: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#d4af7a',
      color: '#fff',
      border: 'none',
      fontSize: '12px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      fontFamily: '"Montserrat", sans-serif',
      cursor: 'pointer',
      marginTop: '8px',
    },
    note: {
      fontSize: '9px',
      textAlign: 'center',
      color: '#888',
      fontStyle: 'italic',
      marginTop: '12px',
      fontFamily: '"Montserrat", sans-serif',
    }
  };

  return (
    <PageWrapper>
      <h2 style={styles.sectionTitle}>Consultation & Booking</h2>
      
      <div style={styles.grid}>
        {CONSULTATION_DETAILS.map((detail, idx) => {
          const Icon = detail.icon;
          return (
            <div key={idx} style={styles.detailCard}>
              <div style={styles.iconWrap}>
                <Icon size={20} />
              </div>
              <div>
                <h3 style={styles.detailTitle}>{detail.title}</h3>
                <p style={styles.detailDesc}>{detail.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.formSection}>
        <h3 style={styles.formTitle}>Book Your Consultation</h3>
        <div style={styles.formGrid}>
          <input 
            style={styles.input} 
            placeholder="Full Name *" 
            type="text"
          />
          <input 
            style={styles.input} 
            placeholder="Phone Number *" 
            type="tel"
          />
          <input 
            style={{...styles.input, ...styles.inputFull}} 
            placeholder="Email Address *" 
            type="email"
          />
          <input 
            style={{...styles.input, ...styles.inputFull}} 
            placeholder="Preferred Date (DD/MM/YYYY) *" 
            type="text"
          />
        </div>
        <button style={styles.submitBtn}>
          Pay GHS 800 & Book Consultation
        </button>
        <p style={styles.note}>
          *You will be redirected to secure payment. Consultation fee is non-refundable but credited toward your gown if you proceed.
        </p>
      </div>
    </PageWrapper>
  );
};

const BridalPricingFlyer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');
        
        @page {
          size: A4;
          margin: 0;
        }
        @media print {
          body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .flyer-page { page-break-after: always; box-shadow: none !important; }
        }
        @media screen {
          .flyer-page { 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
            margin-bottom: 24px;
          }
        }
      `}</style>
      
      {TABS.map(tab => (
        <PricingPage
          key={tab.key}
          title={tab.label}
          items={PRICING_DATA[tab.key]}
        />
      ))}
      
      <TermsPage />
      <ConsultationPage />
    </>
  );
};

export default BridalPricingFlyer;