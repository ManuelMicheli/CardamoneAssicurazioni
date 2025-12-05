import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote, ExternalLink } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { AGENCY, TESTIMONIALS } from '../../config/agency'

// Sezione Recensioni - Carousel a scorrimento automatico
const TestimonialsSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const TestimonialCard = ({ testimonial }) => (
    <div className="testimonial-card h-full bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={18} className="fill-secondary-500 text-secondary-500" />
        ))}
      </div>

      {/* Quote */}
      <div className="relative mb-6">
        <Quote size={24} className="absolute -top-2 -left-1 text-primary-100" />
        <p className="text-neutral-600 italic leading-relaxed pl-5">
          "{testimonial.text}"
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-neutral-100 mb-4" />

      {/* Author */}
      <div>
        <p className="font-semibold text-neutral-900">{testimonial.name}</p>
        <p className="text-sm text-neutral-500">{testimonial.role}</p>
      </div>
    </div>
  )

  return (
    <section ref={ref} className="py-20 md:py-24 bg-neutral-50 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-50 text-secondary-700 text-sm font-semibold mb-4 border border-secondary-100">
            Recensioni
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            Cosa Dicono i <span className="text-primary-600">Nostri Clienti</span>
          </h2>
          
          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex gap-0.5">
              {[...Array(AGENCY.reviews.rating)].map((_, i) => (
                <Star key={i} size={20} className="fill-secondary-500 text-secondary-500" />
              ))}
            </div>
            <span className="text-lg font-bold text-neutral-900">{AGENCY.reviews.rating}/5</span>
            <span className="text-neutral-500">su Google</span>
          </div>
          
          <a 
            href="https://www.google.com/search?q=cardamone+assicurazioni+cornaredo+recensioni"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 transition-colors"
          >
            Vedi tutte le {AGENCY.reviews.count} recensioni
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>

      {/* Auto-scrolling Testimonials Carousel */}
      <div 
        className="relative testimonials-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling Container */}
        <div 
          className={`testimonials-scroll flex gap-6 ${isPaused ? 'paused' : ''}`}
          style={{
            animationPlayState: prefersReducedMotion ? 'paused' : (isPaused ? 'paused' : 'running')
          }}
        >
          {/* Duplicate testimonials for infinite scroll */}
          {[...Array(4)].map((_, setIndex) => (
            TESTIMONIALS.map((testimonial, index) => (
              <div 
                key={`set${setIndex}-${testimonial.id}`}
                className="flex-shrink-0"
                style={{ width: isMobile ? 'calc(100vw - 48px)' : '320px' }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))
          ))}
        </div>
      </div>

      {/* CTA to leave review */}
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-600 mb-4">Sei già nostro cliente?</p>
          <a 
            href="https://www.google.com/search?q=cardamone+assicurazioni+cornaredo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 font-semibold rounded-xl hover:bg-neutral-100 transition-colors border border-neutral-200"
          >
            Lascia una recensione su Google
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>

      <style>{`
        .testimonials-scroll {
          animation: scrollTestimonials 35s linear infinite;
          width: max-content;
          padding: 1rem 0;
        }
        
        @keyframes scrollTestimonials {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .testimonials-scroll.paused,
        .testimonials-container:hover .testimonials-scroll {
          animation-play-state: paused;
        }
        
        .testimonial-card {
          transition: all 0.3s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
          border-color: rgba(59, 130, 246, 0.2);
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
