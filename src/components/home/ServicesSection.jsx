import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { Car, Home, Heart, Briefcase, PiggyBank, Umbrella, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import InteractiveBackground from '../InteractiveBackground'

const ServicesSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
  const carouselRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: isMobile ? 0.1 : 0.1, // Early trigger for mobile
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Track active card in carousel
  useEffect(() => {
    if (!isMobile || !carouselRef.current) return

    const handleScroll = () => {
      const carousel = carouselRef.current
      const cardWidth = carousel.offsetWidth - 48 // Account for padding
      const scrollPosition = carousel.scrollLeft
      const newActiveCard = Math.round(scrollPosition / cardWidth)
      setActiveCard(newActiveCard)
    }

    const carousel = carouselRef.current
    carousel.addEventListener('scroll', handleScroll, { passive: true })
    return () => carousel.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  const services = [
    { icon: Car, title: 'Auto e Moto', description: 'RC Auto, Kasko, furto e incendio. Protezione completa per i tuoi veicoli.', popular: true },
    { icon: Home, title: 'Casa e Famiglia', description: 'Proteggi la tua casa e i tuoi cari con polizze complete.' },
    { icon: Heart, title: 'Salute', description: 'Polizze sanitarie per te e la tua famiglia.' },
    { icon: Briefcase, title: 'Business', description: 'Soluzioni su misura per imprese e professionisti.' },
    { icon: PiggyBank, title: 'Investimenti', description: 'Piani di accumulo e investimento personalizzati.' },
    { icon: Umbrella, title: 'Vita e Pensioni', description: 'Proteggi chi ami e pianifica il futuro.' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  // Mobile-optimized animation variants
  const mobileVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  }

  // Scroll to specific card
  const scrollToCard = (index) => {
    if (!carouselRef.current) return
    const cardWidth = carouselRef.current.offsetWidth - 48
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    })
  }

  // ================================================
  // MOBILE SERVICES (≤768px) - Horizontal Carousel
  // ================================================
  if (isMobile) {
    return (
      <section ref={ref} className="relative overflow-hidden" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0' }}>
        {/* Interactive Background - Blobs subtle per mobile */}
        <InteractiveBackground variant="blobs" color="primary" intensity={0.25} />
        
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white" />
        
        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={mobileVariants}
            className="px-4 mb-8"
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-3 border border-primary-100">
              I Nostri Servizi
            </span>
            <h2 
              className="font-display font-bold text-neutral-900 mb-2"
              style={{ fontSize: 'clamp(24px, 6vw, 28px)' }}
            >
              Soluzioni per <span className="text-primary-600">Ogni Esigenza</span>
            </h2>
            <p className="text-neutral-600" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
              Prodotti assicurativi delle migliori compagnie, selezionati per te.
            </p>
          </motion.div>

          {/* Mobile Horizontal Carousel with Snap Scroll */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={mobileVariants}
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
            >
              <style>{`
                .mobile-carousel::-webkit-scrollbar { display: none; }
              `}</style>
              
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  variants={mobileVariants}
                  className="flex-shrink-0 snap-center"
                  style={{ 
                    width: 'calc(100vw - 48px)',
                    scrollSnapAlign: 'center',
                    willChange: 'transform, opacity'
                  }}
                >
                  <Link to="/servizi" className="block h-full">
                    <div 
                      className={`relative h-full p-6 transition-all duration-300 ${
                        activeCard === index 
                          ? 'scale-100' 
                          : 'scale-[0.98] opacity-90'
                      }`}
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: activeCard === index 
                          ? '2px solid rgba(37, 99, 235, 0.3)' 
                          : '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: activeCard === index
                          ? '0 0 0 1px rgba(37, 99, 235, 0.1), 0 8px 32px rgba(30, 58, 138, 0.15)'
                          : '0 4px 20px rgba(30, 58, 138, 0.08)',
                        willChange: 'transform, box-shadow'
                      }}
                    >
                      {/* Popular badge */}
                      {service.popular && (
                        <div className="absolute -top-2 right-4 px-3 py-1 bg-gradient-to-r from-secondary-500 to-secondary-400 text-white text-[10px] font-bold uppercase tracking-wide rounded-full shadow-md">
                          Più richiesto
                        </div>
                      )}

                      {/* Icon */}
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                        style={{
                          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
                          border: '1px solid rgba(37, 99, 235, 0.1)'
                        }}
                      >
                        <service.icon className="w-7 h-7 text-primary-600" />
                      </div>

                      {/* Content */}
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-display font-bold text-neutral-900">{service.title}</h3>
                        <ArrowUpRight size={18} className="text-primary-400" />
                      </div>

                      <p className="text-neutral-600 text-sm leading-relaxed mb-4">{service.description}</p>

                      {/* Bottom accent line */}
                      <div 
                        className="absolute bottom-0 left-6 right-6 h-1 rounded-full"
                        style={{
                          background: activeCard === index
                            ? 'linear-gradient(90deg, #2563eb 0%, #f59e0b 100%)'
                            : 'linear-gradient(90deg, rgba(37, 99, 235, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
                          transition: 'background 0.3s ease'
                        }}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Carousel Dots Indicator */}
            <div className="flex items-center justify-center gap-2 mt-4 px-4">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeCard === index 
                      ? 'w-6 bg-primary-600' 
                      : 'w-2 bg-neutral-300'
                  }`}
                  aria-label={`Vai alla card ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Mobile CTA */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={mobileVariants}
            className="mt-8 px-4"
          >
            <Link 
              to="/servizi"
              className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl font-semibold text-white
                bg-gradient-to-r from-primary-600 to-primary-500
                shadow-lg shadow-primary-600/25
                active:scale-[0.98] transition-transform"
              style={{ minHeight: '56px' }}
            >
              Scopri tutti i servizi
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    )
  }

  // ================================================
  // DESKTOP SERVICES (≥769px) - Original Grid Layout
  // ================================================
  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Interactive Background - Blobs animati */}
      <InteractiveBackground variant="blobs" color="primary" intensity={0.4} />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/20 to-white" />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-[120px]"
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-[1400px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-4 border border-primary-100">
            I Nostri Servizi
          </span>
          <h2 
            className="font-display font-bold text-neutral-900 mb-4"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}
          >
            Soluzioni per <span className="text-primary-600">Ogni Esigenza</span>
          </h2>
          <p className="text-base lg:text-lg text-neutral-600">
            Prodotti assicurativi delle migliori compagnie, selezionati per te.
          </p>
        </motion.div>

        {/* Services Grid - Desktop - ← NUOVO LAYOUT PREMIUM */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link to="/servizi">
                {/* ← CARD PREMIUM STYLE con gradient background e hover elevato */}
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
                  className="group relative h-full rounded-[16px] p-7 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
                    border: '1px solid rgba(59, 130, 246, 0.15)',
                    boxShadow: '0 4px 20px rgba(30, 58, 138, 0.08)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(30, 58, 138, 0.15)'
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(30, 58, 138, 0.08)'
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.15)'
                  }}
                >
                  {service.popular && (
                    <div className="absolute -top-3 right-6 px-3 py-1.5 bg-gradient-to-r from-secondary-500 to-secondary-400 text-white text-xs font-semibold rounded-full shadow-lg">
                      Più richiesto
                    </div>
                  )}

                  {/* Icon animato 24x24 */}
                  <motion.div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                    }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <service.icon className="w-8 h-8 text-primary-600" />
                  </motion.div>

                  {/* Title - H4 22px bold */}
                  <h4 className="text-[22px] font-display font-bold text-primary-900 mb-3">
                    {service.title}
                  </h4>

                  {/* Description - Body 16px, 2-3 righe max */}
                  <p className="text-neutral-600 text-base leading-relaxed mb-4" style={{ lineHeight: 1.6 }}>
                    {service.description}
                  </p>

                  {/* Link con arrow icon, hover glow */}
                  <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    <span>Scopri di più</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Animated line bottom */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-[16px]"
                    style={{
                      background: 'linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(59, 130, 246, 0) 100%)',
                    }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link 
            to="/servizi"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/30 hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-300"
          >
            Scopri tutti i servizi
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
