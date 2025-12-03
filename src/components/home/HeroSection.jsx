import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Star, Phone, Award, Users, TrendingUp, CheckCircle } from 'lucide-react'

const HeroSection = () => {
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

      <div className="container-custom relative z-10 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen lg:min-h-0 lg:py-32">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-600/30">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-primary-900">Cardamone</h2>
                  <p className="text-sm font-semibold text-secondary-500 uppercase tracking-wider">Assicurazioni</p>
                </div>
              </div>
            </motion.div>

            {/* Rating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center gap-4"
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

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight text-neutral-900">
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
              <p className="mt-6 text-lg text-neutral-600 max-w-xl leading-relaxed">
                Da oltre <strong className="text-neutral-900">15 anni</strong> siamo il punto di riferimento 
                per famiglie e imprese. Soluzioni assicurative <strong className="text-neutral-900">personalizzate</strong> con 
                le migliori compagnie del mercato.
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <CheckCircle size={18} className="text-primary-600 flex-shrink-0" />
                  <span className="text-neutral-700 text-sm font-medium">{benefit}</span>
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
              >
                Richiedi Preventivo Gratuito
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="tel:+390000000000" 
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-primary-700 bg-white border-2 border-primary-100 rounded-xl hover:border-primary-200 hover:bg-primary-50 transition-all duration-300"
              >
                <Phone size={18} />
                Chiama Ora
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-8 pt-6 border-t border-neutral-100"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-2xl font-display font-bold text-primary-600">{stat.value}</p>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Background decoration */}
              <motion.div 
                animate={{ rotate: [0, 3, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-4 bg-gradient-to-br from-primary-100 to-secondary-100/50 rounded-[2rem] opacity-70"
              />
              
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop&crop=faces"
                  alt="Team Cardamone Assicurazioni"
                  className="w-full h-[450px] object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/20 to-transparent" />
                
                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/80 text-sm mb-1">Il Team Cardamone</p>
                  <p className="text-white font-display font-bold text-xl">Sempre al tuo fianco</p>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-neutral-100"
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

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-neutral-100"
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-secondary-500 text-secondary-500" />
                    ))}
                  </div>
                  <span className="font-bold text-neutral-900">4.9/5</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
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
