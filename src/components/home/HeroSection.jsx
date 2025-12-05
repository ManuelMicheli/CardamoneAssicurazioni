import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Star, Phone, CheckCircle, ChevronDown, MessageCircle, MapPin, Award } from 'lucide-react'
import { useState, useEffect } from 'react'
import { AGENCY, BENEFITS } from '../../config/agency'

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

  // Hero benefits - focused on local value
  const heroBenefits = [
    'Preventivi gratuiti in 24h',
    'Assistenza sinistri dedicata',
    'Consulenza personalizzata',
    'Le migliori compagnie',
  ]

  // Mobile-optimized animation variants
  const mobileVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const mobileContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  }

  // ================================================
  // MOBILE HERO (≤768px) - Lead-focused design
  // ================================================
  if (isMobile) {
    return (
      <section className="relative min-h-screen min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-[70px]">
        {/* Mobile Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-primary-900 to-indigo-950" />
        
        {/* Shimmer effect */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 75%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: prefersReducedMotion ? 'none' : 'mobileShimmer 8s linear infinite'
          }}
        />
        
        {/* Pattern overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        {/* Ambient glow */}
        <div 
          className="absolute top-1/4 -right-20 w-80 h-80 rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)' }}
        />

        {/* Content */}
        <motion.div 
          variants={mobileContainerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-4 py-8 flex flex-col items-center text-center"
        >
          {/* Location + Rating Badge */}
          <motion.div variants={mobileVariants} className="flex flex-col items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
              <MapPin size={12} className="text-secondary-500" />
              <span className="text-white/80 text-xs font-medium">{AGENCY.serviceArea}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
              <div className="flex gap-0.5">
                {[...Array(AGENCY.reviews.rating)].map((_, i) => (
                  <Star key={i} size={12} className="fill-secondary-500 text-secondary-500" />
                ))}
              </div>
              <span className="text-white/90 text-sm font-semibold">{AGENCY.reviews.rating}/5</span>
              <span className="text-white/50 text-xs">({AGENCY.reviews.count} recensioni)</span>
            </div>
          </motion.div>

          {/* Main Headline - Local Value */}
          <motion.h1 
            variants={mobileVariants}
            className="font-display font-bold text-white leading-[1.1] tracking-tight mb-4"
            style={{ fontSize: 'clamp(28px, 8vw, 36px)' }}
          >
            Il Tuo Assicuratore
            <span className="block text-primary-400">di Fiducia</span>
            <span className="relative inline-block">
              a {AGENCY.address.city}
              <span 
                className="absolute -bottom-1 left-0 w-full h-1 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #d97706, #f59e0b)',
                  boxShadow: '0 2px 12px rgba(217, 119, 6, 0.4)'
                }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={mobileVariants}
            className="text-white/70 leading-relaxed max-w-sm mb-6"
            style={{ fontSize: 'clamp(14px, 3.5vw, 16px)' }}
          >
            Da oltre <strong className="text-white">{AGENCY.experience.years} anni</strong> al servizio di famiglie e imprese. 
            Confrontiamo le <strong className="text-white">migliori compagnie</strong> per trovare la polizza perfetta per te.
          </motion.p>

          {/* Benefits - 2x2 grid */}
          <motion.div variants={mobileVariants} className="grid grid-cols-2 gap-3 mb-8 w-full max-w-sm">
            {heroBenefits.map((benefit, index) => (
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

          {/* CTA Buttons - Lead focused */}
          <motion.div variants={mobileVariants} className="flex flex-col gap-3 w-full max-w-sm mb-6">
            {/* Primary CTA */}
            <Link 
              to="/preventivo" 
              className="group flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl font-bold text-base text-white
                bg-gradient-to-r from-primary-600 to-primary-700
                shadow-lg shadow-primary-600/30
                active:scale-[0.98] transition-transform"
              style={{
                minHeight: '60px',
                animation: prefersReducedMotion ? 'none' : 'mobilePulse 2.5s ease-in-out infinite',
              }}
            >
              Richiedi Preventivo Gratuito
              <ArrowRight size={18} className="group-active:translate-x-1 transition-transform" />
            </Link>

            {/* Phone CTA */}
            <a 
              href={`tel:${AGENCY.phone.fissoClean}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl font-semibold text-sm
                text-white bg-white/10 backdrop-blur-sm border border-white/20
                active:bg-white/20 transition-colors"
              style={{ minHeight: '56px' }}
            >
              <Phone size={18} />
              Chiama Ora
            </a>

            {/* WhatsApp CTA */}
            <a 
              href={AGENCY.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-2xl font-semibold text-sm
                text-white bg-green-600/20 border border-green-500/30
                active:bg-green-600/30 transition-colors"
            >
              <MessageCircle size={18} className="text-green-400" />
              Scrivici su WhatsApp
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={mobileVariants} className="flex items-center justify-center gap-4 pt-4 border-t border-white/10 w-full max-w-sm">
            <div className="text-center">
              <p className="text-lg font-display font-bold text-primary-400">{AGENCY.experience.years}+</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Anni</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-lg font-display font-bold text-primary-400">{AGENCY.reviews.rating}/5</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Rating</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center flex flex-col items-center">
              <Award size={18} className="text-secondary-500 mb-0.5" />
              <p className="text-[10px] text-white/50 uppercase tracking-wider">RUI</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
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
  // DESKTOP HERO (≥769px) - Professional lead-focused
  // ================================================
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/30 to-white" />
      
      {/* Animated gradient orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary-100/50 via-primary-50/30 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-secondary-100/40 via-secondary-50/20 to-transparent rounded-full blur-3xl"
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a05_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 py-16 md:py-20 lg:py-24 max-w-[1400px]">
        <div className={`grid gap-10 md:gap-12 lg:gap-16 items-center ${isTablet ? 'grid-cols-1' : 'lg:grid-cols-[1.1fr_1fr]'}`}>
          
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            
            {/* Location + RUI Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100">
                <MapPin size={16} className="text-primary-600" />
                <span className="text-sm font-semibold text-primary-700">{AGENCY.serviceArea}</span>
              </div>
              <a 
                href={AGENCY.ruiLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 transition-colors"
              >
                <Award size={14} className="text-secondary-600" />
                <span className="text-xs font-medium text-neutral-600">RUI: {AGENCY.rui}</span>
              </a>
            </motion.div>

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-lg shadow-primary-700/30">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-display font-bold text-primary-900">Cardamone</h2>
                  <p className="text-sm font-semibold text-secondary-600 uppercase tracking-wider">Assicurazioni</p>
                </div>
              </div>
            </motion.div>

            {/* Rating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-lg border border-neutral-100">
                <div className="flex items-center gap-0.5">
                  {[...Array(AGENCY.reviews.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-secondary-500 text-secondary-500" />
                  ))}
                </div>
                <span className="text-sm font-bold text-neutral-900">{AGENCY.reviews.rating}/5</span>
                <span className="text-sm text-neutral-500">Google ({AGENCY.reviews.count} recensioni)</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 
                className="font-display font-bold leading-[1.1] tracking-tight text-neutral-900"
                style={{ fontSize: 'clamp(32px, 6vw, 56px)' }}
              >
                Il Tuo Assicuratore
                <span className="block text-primary-700">di Fiducia</span>
                <span className="relative inline-block">
                  a {AGENCY.address.city}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full origin-left"
                  />
                </span>
              </h1>
              <p 
                className="mt-6 text-neutral-600 max-w-[520px] leading-relaxed" 
                style={{ fontSize: 'clamp(14px, 3vw, 18px)', lineHeight: 1.7 }}
              >
                Da oltre <strong className="text-neutral-900">{AGENCY.experience.years} anni</strong> al servizio di famiglie e imprese. 
                Confrontiamo le <strong className="text-neutral-900">migliori compagnie</strong> per trovare la polizza perfetta per te, 
                con <strong className="text-neutral-900">assistenza sinistri dedicata</strong>.
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {heroBenefits.map((benefit, index) => (
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
                to="/preventivo" 
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary-700 rounded-xl shadow-lg shadow-primary-700/30 hover:bg-primary-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                style={{ minHeight: '56px' }}
              >
                Richiedi Preventivo Gratuito
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href={`tel:${AGENCY.phone.fissoClean}`}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-primary-700 bg-white border-2 border-primary-100 rounded-xl hover:border-primary-200 hover:bg-primary-50 transition-all duration-300"
                style={{ minHeight: '56px' }}
              >
                <Phone size={18} />
                Chiama Ora
              </a>
            </motion.div>

            {/* Contact options */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-4 border-t border-neutral-100"
            >
              <span className="text-sm text-neutral-500">Oppure contattaci:</span>
              <a 
                href={AGENCY.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
              >
                <MessageCircle size={16} />
                <span className="text-sm font-medium">WhatsApp</span>
              </a>
              <a 
                href={`tel:${AGENCY.phone.fissoClean}`}
                className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-600 transition-colors"
              >
                <Phone size={14} />
                {AGENCY.phone.fisso}
              </a>
            </motion.div>
          </div>

          {/* Right Content - Image + Floating Elements */}
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
              
              {/* Main Image Card */}
              <div className="relative bg-white rounded-[20px] overflow-hidden border border-neutral-100"
                style={{ boxShadow: '0 20px 60px rgba(30, 58, 138, 0.15)' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center"
                  alt="Consulente assicurativo - Cardamone Assicurazioni Cornaredo"
                  className="w-full object-cover"
                  style={{ height: isTablet ? '400px' : '500px' }}
                  loading="eager"
                  fetchpriority="high"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/15 to-transparent" />
                
                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <p className="text-white/90 text-sm mb-2 uppercase tracking-wider font-semibold">Francesco Cardamone</p>
                  <p className="text-white font-display font-bold text-xl lg:text-2xl">Il tuo consulente di fiducia</p>
                </div>
              </div>

              {/* Floating Card - Experience */}
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 bg-white rounded-2xl shadow-xl p-4 border border-neutral-100 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-700 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">{AGENCY.experience.years}+ anni</p>
                    <p className="text-xs text-neutral-500">di esperienza</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card - Location */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={`bg-white rounded-2xl p-5 border border-neutral-100 z-20 ${
                  isTablet ? 'mt-4 w-full' : 'absolute -bottom-10 -right-10 w-[280px]'
                }`}
                style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={20} className="text-primary-600" />
                  <p className="font-semibold text-neutral-900">Dove Trovarci</p>
                </div>
                <p className="text-sm text-neutral-600 mb-2">{AGENCY.address.street}</p>
                <p className="text-sm text-neutral-500">{AGENCY.address.cap} {AGENCY.address.city} ({AGENCY.address.province})</p>
                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <a 
                    href={AGENCY.address.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors flex items-center gap-1"
                  >
                    Apri in Google Maps
                    <ArrowRight size={14} />
                  </a>
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
            className="w-1.5 h-1.5 rounded-full bg-primary-600"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
