import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Pause, Play } from 'lucide-react'

const TestimonialsSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const carouselRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  // ← DATI TESTIMONIANZE
  const testimonials = [
    { 
      name: 'Marco Rossi', 
      role: 'Imprenditore', 
      image: 'https://randomuser.me/api/portraits/men/32.jpg', 
      text: 'Professionalità eccezionale. Il team mi ha aiutato a trovare la soluzione perfetta per la mia azienda.',
    },
    { 
      name: 'Laura Bianchi', 
      role: 'Libera Professionista', 
      image: 'https://randomuser.me/api/portraits/women/44.jpg', 
      text: 'Finalmente un\'agenzia che ascolta. Risposta rapida, preventivi chiari e assistenza impeccabile.',
    },
    { 
      name: 'Giuseppe Verdi', 
      role: 'Pensionato', 
      image: 'https://randomuser.me/api/portraits/men/67.jpg', 
      text: 'Mi seguono da anni per tutte le polizze. Sempre disponibili e pronti a consigliarmi al meglio.',
    },
    { 
      name: 'Anna Ferrari', 
      role: 'Medico', 
      image: 'https://randomuser.me/api/portraits/women/28.jpg', 
      text: 'Competenza e trasparenza. La polizza professionale che mi hanno trovato è esattamente ciò che serviva.',
    },
    { 
      name: 'Roberto Mancini', 
      role: 'Commerciante', 
      image: 'https://randomuser.me/api/portraits/men/52.jpg', 
      text: 'Servizio eccellente! Hanno gestito il mio sinistro in modo rapido e professionale. Grazie!',
    },
    { 
      name: 'Francesca Romano', 
      role: 'Avvocato', 
      image: 'https://randomuser.me/api/portraits/women/65.jpg', 
      text: 'Affidabilità al 100%. Sono cliente da 10 anni e non cambierei mai. Prezzi competitivi.',
    },
  ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // ← SCROLL TO CARD (mobile)
  const scrollToCard = (index) => {
    if (!carouselRef.current) return
    const cardWidth = carouselRef.current.offsetWidth - 32
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    })
    setActiveIndex(index)
  }

  // ← CARD COMPONENT
  const TestimonialCard = ({ testimonial }) => (
    <div 
      className="testimonial-card flex-shrink-0 bg-white rounded-2xl p-6 flex flex-col border border-neutral-200 hover:border-primary-200 hover:shadow-xl transition-all duration-300"
      style={{
        width: isMobile ? 'calc(100vw - 48px)' : '340px',
        minHeight: '240px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Stars Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} className="fill-secondary-500 text-secondary-500" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-base text-neutral-600 leading-relaxed mb-4 flex-grow italic">
        "{testimonial.text}"
      </blockquote>

      {/* Divider */}
      <div className="h-px bg-neutral-200 my-4" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary-100"
        />
        <div>
          <p className="font-semibold text-neutral-900 text-base">{testimonial.name}</p>
          <p className="text-sm text-neutral-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  )

  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden"
      style={{ 
        padding: isMobile ? 'clamp(4rem, 8vw, 6rem) 0' : '6rem 0',
        background: 'linear-gradient(to bottom, #f8fafc, #ffffff)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* ← HEADER */}
      <div className="container mx-auto px-6 lg:px-12 mb-10 lg:mb-14 relative z-10 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-4 border border-primary-100">
            Testimonianze
          </span>
          <h2 
            className="font-display font-bold text-neutral-900"
            style={{ fontSize: isMobile ? 'clamp(24px, 6vw, 32px)' : 'clamp(32px, 4vw, 48px)' }}
          >
            Cosa Dicono i <span className="text-primary-600">Nostri Clienti</span>
          </h2>
          {/* Subtitle con rating Google */}
          <p className="mt-4 text-neutral-600 flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-secondary-500 text-secondary-500" />
              ))}
            </span>
            <span className="font-semibold text-neutral-900">4.9/5</span>
            <span>su Google</span>
            <span className="text-neutral-400">•</span>
            <span>150+ Recensioni Verificate</span>
          </p>
        </motion.div>
      </div>

      {/* ← CAROUSEL AUTO-SCROLL INFINITO (come Partners) */}
      {isMobile ? (
        // ═══════════════════════════════════════════════════
        // MOBILE: Horizontal snap scroll manuale
        // ═══════════════════════════════════════════════════
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10"
        >
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onScroll={(e) => {
              const scrollLeft = e.target.scrollLeft
              const cardWidth = e.target.offsetWidth - 32
              const newIndex = Math.round(scrollLeft / cardWidth)
              if (newIndex !== activeIndex && newIndex >= 0 && newIndex < testimonials.length) {
                setActiveIndex(newIndex)
              }
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 snap-center">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          {/* Mobile Dots */}
          <div className="flex items-center justify-center gap-2 mt-6 px-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'w-6 bg-primary-600' 
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Vai alla testimonianza ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      ) : (
        // ═══════════════════════════════════════════════════
        // DESKTOP: Infinite auto-scroll (come Partners)
        // ═══════════════════════════════════════════════════
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative testimonials-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

          {/* ← SCROLLING CONTAINER (infinite loop) */}
          <div 
            className={`testimonials-scroll flex gap-6 py-4 ${isPaused || prefersReducedMotion ? 'paused' : ''}`}
          >
            {/* First set */}
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`set1-${index}`} testimonial={testimonial} />
            ))}
            {/* Second set (duplicate for infinite loop) */}
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`set2-${index}`} testimonial={testimonial} />
            ))}
            {/* Third set (extra coverage) */}
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`set3-${index}`} testimonial={testimonial} />
            ))}
          </div>

          {/* Pause indicator */}
          {isPaused && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-neutral-200"
            >
              <Pause size={14} className="text-primary-600" />
              <span className="text-sm text-neutral-600">In pausa</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ← CSS ANIMATION (stile Partners) */}
      <style>{`
        .testimonials-scroll {
          animation: testimonialsScroll 45s linear infinite;
          width: max-content;
        }
        
        @keyframes testimonialsScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .testimonials-container:hover .testimonials-scroll,
        .testimonials-scroll.paused {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonials-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}

export default TestimonialsSection
