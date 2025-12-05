import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { Car, Home, Heart, Briefcase, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { SERVICES } from '../../config/agency'

const ServicesSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
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

  useEffect(() => {
    if (!isMobile || !carouselRef.current) return

    const handleScroll = () => {
      const carousel = carouselRef.current
      const cardWidth = carousel.offsetWidth - 48
      const scrollPosition = carousel.scrollLeft
      const newActiveCard = Math.round(scrollPosition / cardWidth)
      setActiveCard(newActiveCard)
    }

    const carousel = carouselRef.current
    carousel.addEventListener('scroll', handleScroll, { passive: true })
    return () => carousel.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  // Icon mapping
  const iconMap = {
    Car: Car,
    Home: Home,
    Heart: Heart,
    Briefcase: Briefcase,
  }

  // Extended services with full descriptions
  const services = [
    { 
      icon: Car, 
      title: 'Auto e Moto', 
      description: 'RC Auto, Kasko, furto e incendio. Confrontiamo le migliori tariffe per la tua mobilità.',
      features: ['RC Auto obbligatoria', 'Kasko e Minikasko', 'Furto e Incendio', 'Assistenza stradale'],
      popular: true 
    },
    { 
      icon: Home, 
      title: 'Casa e Famiglia', 
      description: 'Proteggi la tua abitazione e i tuoi cari con polizze complete e personalizzate.',
      features: ['Incendio e scoppio', 'Furto e rapina', 'RC famiglia', 'Eventi atmosferici']
    },
    { 
      icon: Heart, 
      title: 'Vita, Infortuni e Salute', 
      description: 'Tutela il tuo futuro e quello dei tuoi cari con coperture su misura.',
      features: ['Polizza vita', 'Infortuni professionali', 'Rimborso spese mediche', 'Invalidità permanente']
    },
    { 
      icon: Briefcase, 
      title: 'Business', 
      description: 'Soluzioni per imprese, artigiani e liberi professionisti del territorio.',
      features: ['RC professionale', 'Multirischi attività', 'D&O Directors', 'Cyber risk']
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const mobileVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  }

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
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white" />
        
        <div className="relative z-10">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={mobileVariants}
            className="px-4 mb-8"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-3 border border-primary-100">
              I Nostri Servizi
            </span>
            <h2 className="font-display font-bold text-neutral-900 mb-2" style={{ fontSize: 'clamp(24px, 6vw, 28px)' }}>
              Cosa <span className="text-primary-600">Offriamo</span>
            </h2>
            <p className="text-neutral-600" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
              Prodotti assicurativi delle migliori compagnie, selezionati per te.
            </p>
          </motion.div>

          {/* Mobile Carousel */}
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
              }}
            >
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  variants={mobileVariants}
                  className="flex-shrink-0 snap-center"
                  style={{ 
                    width: 'calc(100vw - 48px)',
                    scrollSnapAlign: 'center',
                  }}
                >
                  <Link to="/servizi" className="block h-full">
                    <div 
                      className={`relative h-full p-6 transition-all duration-300 ${
                        activeCard === index ? 'scale-100' : 'scale-[0.98] opacity-90'
                      }`}
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: activeCard === index ? '2px solid rgba(37, 99, 235, 0.3)' : '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: activeCard === index
                          ? '0 0 0 1px rgba(37, 99, 235, 0.1), 0 8px 32px rgba(30, 58, 138, 0.15)'
                          : '0 4px 20px rgba(30, 58, 138, 0.08)',
                      }}
                    >
                      {service.popular && (
                        <div className="absolute -top-2 right-4 px-3 py-1 bg-gradient-to-r from-secondary-500 to-secondary-400 text-white text-[10px] font-bold uppercase tracking-wide rounded-full shadow-md">
                          Più richiesto
                        </div>
                      )}

                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                        style={{
                          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
                          border: '1px solid rgba(37, 99, 235, 0.1)'
                        }}
                      >
                        <service.icon className="w-7 h-7 text-primary-600" />
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-display font-bold text-neutral-900">{service.title}</h3>
                        <ArrowUpRight size={18} className="text-primary-400" />
                      </div>

                      <p className="text-neutral-600 text-sm leading-relaxed mb-4">{service.description}</p>

                      {/* Features list */}
                      <ul className="space-y-1.5 mb-4">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-neutral-500">
                            <div className="w-1 h-1 rounded-full bg-primary-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div 
                        className="absolute bottom-0 left-6 right-6 h-1 rounded-full"
                        style={{
                          background: activeCard === index
                            ? 'linear-gradient(90deg, #2563eb 0%, #d97706 100%)'
                            : 'linear-gradient(90deg, rgba(37, 99, 235, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%)',
                        }}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-4 px-4">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeCard === index ? 'w-6 bg-primary-600' : 'w-2 bg-neutral-300'
                  }`}
                  aria-label={`Vai al servizio ${index + 1}`}
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
                bg-gradient-to-r from-primary-600 to-primary-700
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
  // DESKTOP SERVICES (≥769px)
  // ================================================
  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
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
          <h2 className="font-display font-bold text-neutral-900 mb-4" style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}>
            Cosa <span className="text-primary-600">Offriamo</span>
          </h2>
          <p className="text-base lg:text-lg text-neutral-600">
            Prodotti assicurativi delle migliori compagnie, selezionati per proteggere ciò che conta di più.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link to="/servizi">
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
                  className="group relative h-full rounded-2xl p-6 transition-all duration-300 bg-white border border-neutral-100 hover:border-primary-200 hover:shadow-xl"
                >
                  {service.popular && (
                    <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-secondary-500 to-secondary-400 text-white text-xs font-semibold rounded-full shadow-lg">
                      Più richiesto
                    </div>
                  )}

                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)' }}
                  >
                    <service.icon className="w-7 h-7 text-primary-600" />
                  </div>

                  <h4 className="text-xl font-display font-bold text-neutral-900 mb-3 group-hover:text-primary-700 transition-colors">
                    {service.title}
                  </h4>

                  <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-neutral-500">
                        <div className="w-1 h-1 rounded-full bg-primary-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>Scopri di più</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-700/30 hover:bg-primary-800 hover:-translate-y-0.5 transition-all duration-300"
          >
            Vedi tutti i servizi
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
