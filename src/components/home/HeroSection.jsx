import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Star, Phone, CheckCircle, ChevronDown, Users, Calendar, Award, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768)
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1023)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  // ← NUOVO: Stats con icone per inline stats cards
  const statsWithIcons = [
    { icon: Users, value: '2.500+', label: 'Clienti Soddisfatti' },
    { icon: Star, value: '4.9/5', label: 'Rating Google' },
    { icon: Calendar, value: '15+', label: 'Anni Esperienza' },
  ]

  const stats = [
    { value: '2.500+', label: 'Clienti' },
    { value: '15+', label: 'Anni' },
    { value: '98%', label: 'Rinnovi' },
    { value: '4.9', label: 'Rating' },
  ]

  const benefits = [
    'Preventivi gratuiti in 24h',
    'Consulenza personalizzata',
    'Assistenza sinistri dedicata',
    'Migliori tariffe garantite',
  ]

  // ← NUOVO: Testimonianza per floating card
  const featuredTestimonial = {
    name: 'Laura Bianchi',
    role: 'Libera Professionista',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Finalmente un\'agenzia che ascolta. Risposta rapida, preventivi chiari e assistenza impeccabile.',
    rating: 4.9
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

  const mobileContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  // ================================================
  // MOBILE HERO (≤768px) - Premium Dark Design
  // ================================================
  if (isMobile) {
    return (
      <section className="relative min-h-screen min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-[70px]">
        {/* Mobile Premium Background - Navy to Indigo gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-primary-900 to-indigo-950" />
        
        {/* Subtle shimmer effect */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 75%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: prefersReducedMotion ? 'none' : 'mobileShimmer 8s linear infinite'
          }}
        />
        
        {/* Geometric pattern overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        {/* Ambient glow orb */}
        <div 
          className="absolute top-1/4 -right-20 w-80 h-80 rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
          }}
        />

        {/* Content */}
        <motion.div 
          variants={mobileContainerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-4 py-8 flex flex-col items-center text-center"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Rating Badge */}
          <motion.div 
            variants={mobileVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-secondary-400 text-secondary-400" />
              ))}
            </div>
            <span className="text-white/90 text-sm font-semibold">4.9/5</span>
            <span className="text-white/50 text-sm">Google</span>
          </motion.div>

          {/* Main Headline - Mobile optimized typography */}
          <motion.h1 
            variants={mobileVariants}
            className="font-display font-bold text-white leading-[1.1] tracking-tight mb-4"
            style={{ fontSize: 'clamp(32px, 9vw, 40px)' }}
          >
            La Tua
            <span className="block text-primary-400">Protezione</span>
            <span className="relative inline-block">
              su Misura
              <span 
                className="absolute -bottom-1 left-0 w-full h-1 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                  boxShadow: '0 2px 12px rgba(245, 158, 11, 0.4)'
                }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={mobileVariants}
            className="text-white/70 leading-relaxed max-w-sm mb-6"
            style={{ fontSize: 'clamp(15px, 4vw, 17px)' }}
          >
            Da oltre <strong className="text-white">15 anni</strong> siamo il punto di riferimento. 
            Soluzioni assicurative <strong className="text-white">personalizzate</strong> per te.
          </motion.p>

          {/* Benefits - 2x2 grid for mobile */}
          <motion.div 
            variants={mobileVariants}
            className="grid grid-cols-2 gap-3 mb-8 w-full max-w-sm"
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                variants={mobileVariants}
                className="flex items-center gap-2 text-left"
              >
                <CheckCircle size={16} className="text-primary-400 flex-shrink-0" />
                <span className="text-white/80 text-xs font-medium leading-tight">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Mobile Premium */}
          <motion.div 
            variants={mobileVariants}
            className="flex flex-col gap-3 w-full max-w-sm mb-8"
          >
            {/* Primary CTA with pulse animation */}
            <Link 
              to="/contatti" 
              className="group flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl font-bold text-base text-white
                bg-gradient-to-r from-primary-500 to-primary-600
                shadow-lg shadow-primary-500/30
                active:scale-[0.98] transition-transform"
              style={{
                minHeight: '60px',
                animation: prefersReducedMotion ? 'none' : 'mobilePulse 2.5s ease-in-out infinite',
                willChange: 'transform, box-shadow'
              }}
            >
              Richiedi Preventivo Gratuito
              <ArrowRight size={18} className="group-active:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary CTA */}
            <a 
              href="tel:+390000000000" 
              className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl font-semibold text-sm
                text-white bg-white/10 backdrop-blur-sm border border-white/20
                active:bg-white/20 transition-colors"
              style={{ minHeight: '56px' }}
            >
              <Phone size={18} />
              Chiama Ora
            </a>
          </motion.div>

          {/* Stats Row - Mobile optimized */}
          <motion.div 
            variants={mobileVariants}
            className="flex items-center justify-center gap-6 pt-6 border-t border-white/10 w-full max-w-sm"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-xl font-display font-bold text-primary-400">{stat.value}</p>
                <p className="text-[10px] text-white/50 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator - Mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-white/40" />
          </motion.div>
        </motion.div>
      </section>
    )
  }

  // ================================================
  // DESKTOP HERO (≥769px) - Original design preserved
  // ================================================
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/30 to-white" />
      
      {/* Animated gradient orb */}
      <motion.div
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary-100/50 via-primary-50/30 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-secondary-100/40 via-secondary-50/20 to-transparent rounded-full blur-3xl"
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a05_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 py-16 md:py-20 lg:py-24 max-w-[1400px]">
        {/* ← LAYOUT MIGLIORATO: 55% text / 45% image grid con gap 60px */}
        <div className={`grid gap-10 md:gap-12 lg:gap-16 items-center ${isTablet ? 'grid-cols-1' : 'lg:grid-cols-[1.1fr_1fr]'}`}>
          
          {/* Left Content - 55% width desktop */}
          <div className="space-y-6 lg:space-y-8">
            
            {/* ← NUOVO: Badge Certificazione Top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                }}
              >
                <Award size={16} className="text-primary-600" />
                <span className="text-sm font-semibold text-primary-600">Agenzia Certificata • 2.500+ Clienti Protetti</span>
              </div>
            </motion.div>

            {/* Brand Name + Logo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-600/30">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-display font-bold text-primary-900">Cardamone</h2>
                  <p className="text-sm font-semibold text-secondary-500 uppercase tracking-wider">Assicurazioni</p>
                </div>
              </div>
            </motion.div>

            {/* Rating Badge Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-lg border border-neutral-100">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-secondary-500 text-secondary-500" />
                  ))}
                </div>
                <span className="text-sm font-bold text-neutral-900">4.9/5</span>
                <span className="text-sm text-neutral-500">Google</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100">
                <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                <span className="text-sm font-medium text-primary-700">Consulenze disponibili</span>
              </div>
            </motion.div>

            {/* Main Headline - Typography scale improved */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 
                className="font-display font-bold leading-[1.1] tracking-tight text-neutral-900"
                style={{ fontSize: 'clamp(32px, 8vw, 64px)' }}
              >
                La Tua
                <span className="block text-primary-600">Protezione</span>
                <span className="relative inline-block">
                  su Misura
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full origin-left"
                  />
                </span>
              </h1>
              <p 
                className="mt-6 text-neutral-600 max-w-[520px] leading-relaxed" 
                style={{ fontSize: 'clamp(14px, 4vw, 18px)', lineHeight: 1.6 }}
              >
                Da oltre <strong className="text-neutral-900">15 anni</strong> siamo il punto di riferimento 
                per famiglie e imprese. Soluzioni assicurative <strong className="text-neutral-900">personalizzate</strong> con 
                le migliori compagnie del mercato.
              </p>
            </motion.div>

            {/* ← NUOVO: Checkmarks List 2x2 Grid con stagger animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50/50 border border-neutral-100/50 hover:bg-primary-50/50 hover:border-primary-100 transition-colors duration-200"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.35 + index * 0.05 }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={14} className="text-primary-600" />
                  </div>
                  <span className="text-neutral-800 text-sm font-semibold">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                to="/contatti" 
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary-600 rounded-xl shadow-lg shadow-primary-600/30 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                style={{ minHeight: '56px' }}
              >
                Richiedi Preventivo Gratuito
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="tel:+390000000000" 
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-primary-700 bg-white border-2 border-primary-100 rounded-xl hover:border-primary-200 hover:bg-primary-50 transition-all duration-300"
                style={{ minHeight: '56px' }}
              >
                <Phone size={18} />
                Chiama Ora
              </a>
            </motion.div>

            {/* ← NUOVO: Inline Stats Cards 3 colonne */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6"
            >
              {statsWithIcons.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.65 + index * 0.1 }}
                  className="flex items-center gap-3 px-4 py-4 rounded-xl hover:shadow-md transition-all duration-200"
                  style={{
                    background: 'rgba(59, 130, 246, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                  }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <stat.icon size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-lg">{stat.value}</p>
                    <p className="text-xs text-neutral-600">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Image + Floating Card - 45% width */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`relative ${isTablet ? 'mt-8' : 'hidden lg:block'}`}
          >
            <div className="relative">
              {/* Background decoration */}
              <motion.div 
                animate={prefersReducedMotion ? {} : { rotate: [0, 3, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-4 bg-gradient-to-br from-primary-100 to-secondary-100/50 rounded-[2rem] opacity-70"
              />
              
              {/* Main Card - IMMAGINE PROFESSIONALE */}
              <div className="relative bg-white rounded-[20px] overflow-hidden border border-neutral-100"
                style={{ boxShadow: '0 20px 60px rgba(30, 58, 138, 0.15)' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&crop=center"
                  alt="Consulente assicurativo professionista - Cardamone Assicurazioni"
                  className="w-full object-cover"
                  style={{ height: isTablet ? '400px' : '500px' }}
                  loading="eager"
                  fetchpriority="high"
                />
                
                {/* Overlay gradiente blu semi-trasparente 20-30% */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/15 to-transparent" />
                
                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <p className="text-white/90 text-sm mb-2 uppercase tracking-wider font-semibold">Il Team Cardamone</p>
                  <p className="text-white font-display font-bold text-xl lg:text-2xl">Sempre al tuo fianco</p>
                </div>
              </div>

              {/* Floating Card - Clienti protetti (top-left) */}
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 bg-white rounded-2xl shadow-xl p-4 border border-neutral-100 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">2.500+</p>
                    <p className="text-xs text-neutral-500">Clienti protetti</p>
                  </div>
                </div>
              </motion.div>

              {/* ← NUOVO: Floating Testimonial Card Overlay (bottom-right) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={`bg-white rounded-2xl p-5 border border-neutral-100 z-20 ${
                  isTablet 
                    ? 'mt-4 w-full' 
                    : 'absolute -bottom-10 -right-10 w-[280px]'
                }`}
                style={{ 
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Testimonial Header */}
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={featuredTestimonial.image}
                    alt={featuredTestimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-100"
                  />
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">{featuredTestimonial.name}</p>
                    <p className="text-xs text-neutral-500">{featuredTestimonial.role}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-3">
                  <Quote size={16} className="absolute -top-1 -left-1 text-primary-200" />
                  <p className="text-sm text-neutral-600 italic leading-relaxed pl-4">
                    "{featuredTestimonial.text}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 pt-3 border-t border-neutral-100">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-secondary-500 text-secondary-500" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-neutral-900">{featuredTestimonial.rating}/5</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - Desktop Only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-neutral-300 flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary-500"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
