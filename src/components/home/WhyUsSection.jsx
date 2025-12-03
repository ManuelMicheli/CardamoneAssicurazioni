import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Clock, Users, Award, CheckCircle, ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import InteractiveBackground from '../InteractiveBackground'
import { useState, useEffect } from 'react'

const WhyUsSection = () => {
  const [isMobile, setIsMobile] = useState(false)
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

  const reasons = [
    { icon: Award, title: 'Eccellenza Riconosciuta', description: '4.9/5 stelle su Google con oltre 150 recensioni verificate.' },
    { icon: Users, title: 'Consulenza Personalizzata', description: 'Ogni cliente è unico. Soluzioni realmente su misura.' },
    { icon: Shield, title: 'Trasparenza Totale', description: 'Chiarezza nei costi, onestà nelle proposte. Zero sorprese.' },
    { icon: Clock, title: 'Sempre Presenti', description: 'Risposte in 24h e assistenza sinistri dedicata.' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden"
      style={{ padding: isMobile ? 'clamp(4rem, 8vw, 6rem) 0' : '6rem 0' }}
    >
      {/* Interactive Background - Grid animata */}
      <InteractiveBackground variant="grid" color="gradient" intensity={0.35} />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white" />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-100/30 rounded-full blur-[120px]"
      />

      <div className={isMobile ? 'relative z-10 px-4' : 'container mx-auto px-6 lg:px-12 relative z-10 max-w-[1400px]'}>
        <div className={isMobile ? "space-y-8" : "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"}>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-50 text-secondary-700 text-sm font-semibold mb-4 border border-secondary-100">
              Perché Sceglierci
            </span>
            <h2 
              className="font-display font-bold text-neutral-900 mb-4 lg:mb-6"
              style={{ fontSize: isMobile ? 'clamp(24px, 6vw, 32px)' : 'clamp(32px, 4vw, 48px)' }}
            >
              La Tua Sicurezza è la Nostra <span className="text-secondary-500">Priorità</span>
            </h2>
            <p className={`text-neutral-600 ${isMobile ? 'text-sm mb-6' : 'text-base lg:text-lg mb-8'}`} style={{ lineHeight: 1.6 }}>
              Da oltre 15 anni accompagniamo i nostri clienti con competenza, trasparenza e un approccio personalizzato.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['Partner Premium', 'Preventivi 24h', 'Consulenza Gratuita'].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-full bg-primary-50 border border-primary-100">
                  <CheckCircle size={16} className="text-primary-600" />
                  <span className="text-sm font-medium text-primary-700">{badge}</span>
                </div>
              ))}
            </div>

            <Link 
              to="/chi-siamo"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Scopri di più su di noi
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Right Content - ← FEATURES GRID 2x2 RESPONSIVE */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={`grid gap-4 lg:gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}
          >
            {reasons.map((reason, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div
                  whileHover={!isMobile ? { y: -8, transition: { duration: 0.3 } } : {}}
                  whileTap={isMobile ? { scale: 1.02 } : {}}
                  className={`h-full rounded-[16px] transition-all duration-300 ${isMobile ? 'p-5' : 'p-6 lg:p-8'}`}
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
                    border: '1px solid rgba(59, 130, 246, 0.15)',
                    boxShadow: '0 4px 20px rgba(30, 58, 138, 0.08)',
                  }}
                  onMouseEnter={!isMobile ? (e) => {
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(30, 58, 138, 0.15)'
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'
                  } : undefined}
                  onMouseLeave={!isMobile ? (e) => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(30, 58, 138, 0.08)'
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.15)'
                  } : undefined}
                >
                  {/* Icon grande 48x48 con semi-transparent background */}
                  <motion.div 
                    className={`rounded-xl flex items-center justify-center mb-4 ${isMobile ? 'w-14 h-14' : 'w-16 h-16'}`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.05) 100%)',
                    }}
                    whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : {}}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <reason.icon className={`text-primary-600 ${isMobile ? 'w-7 h-7' : 'w-8 h-8'}`} />
                  </motion.div>
                  <h3 className={`font-display font-bold text-neutral-900 mb-2 ${isMobile ? 'text-base' : 'text-lg lg:text-xl'}`}>{reason.title}</h3>
                  <p className="text-neutral-600 text-sm">{reason.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-lg border border-neutral-100">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-secondary-500 text-secondary-500" />
              ))}
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div>
              <p className="font-bold text-neutral-900">4.9/5 su Google</p>
              <p className="text-sm text-neutral-500">150+ recensioni</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyUsSection
