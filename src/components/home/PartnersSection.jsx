import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import InteractiveBackground from '../InteractiveBackground'

const PartnersSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const partners = [
    { name: 'Generali', color: '#C8102E' },
    { name: 'Allianz', color: '#003781' },
    { name: 'UnipolSai', color: '#E31837' },
    { name: 'AXA', color: '#00008F' },
    { name: 'Zurich', color: '#000066' },
    { name: 'Reale Mutua', color: '#003399' },
    { name: 'Vittoria', color: '#1E4D2B' },
    { name: 'Sara', color: '#E4002B' },
  ]

  const PartnerCard = ({ partner }) => (
    <div className="partner-card flex-shrink-0 px-8 py-4 rounded-xl bg-neutral-50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-neutral-200">
      <span 
        className="text-xl font-display font-bold whitespace-nowrap"
        style={{ color: partner.color }}
      >
        {partner.name}
      </span>
    </div>
  )

  return (
    <section ref={ref} className="relative py-16 bg-white overflow-hidden">
      {/* Interactive Background - Forme geometriche subtle */}
      <InteractiveBackground variant="geometric" color="neutral" intensity={0.25} />
      <div className="container-custom mb-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-neutral-500 font-medium uppercase tracking-wider text-sm"
        >
          Partner con le migliori compagnie
        </motion.p>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="relative partners-container">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling Container */}
        <div className="partners-scroll flex gap-6 md:gap-8">
          {/* First set */}
          {partners.map((partner, index) => (
            <PartnerCard key={`set1-${index}`} partner={partner} />
          ))}
          {/* Second set */}
          {partners.map((partner, index) => (
            <PartnerCard key={`set2-${index}`} partner={partner} />
          ))}
          {/* Third set */}
          {partners.map((partner, index) => (
            <PartnerCard key={`set3-${index}`} partner={partner} />
          ))}
          {/* Fourth set for extra coverage */}
          {partners.map((partner, index) => (
            <PartnerCard key={`set4-${index}`} partner={partner} />
          ))}
        </div>
      </div>

      <style>{`
        .partners-scroll {
          animation: infiniteScroll 40s linear infinite;
          width: max-content;
        }
        
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .partners-container:hover .partners-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default PartnersSection
