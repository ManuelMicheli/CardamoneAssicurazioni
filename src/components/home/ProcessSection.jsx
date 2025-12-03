import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MessageSquare, FileSearch, CheckCircle, Handshake, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import InteractiveBackground from '../InteractiveBackground'
import { useState, useEffect } from 'react'

const ProcessSection = () => {
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

  const steps = [
    { number: '01', icon: MessageSquare, title: 'Contattaci', description: 'Raccontaci le tue esigenze via form, telefono o WhatsApp.' },
    { number: '02', icon: FileSearch, title: 'Analisi Gratuita', description: 'Confrontiamo le offerte delle migliori compagnie.' },
    { number: '03', icon: CheckCircle, title: 'Preventivo', description: 'Ti presentiamo una proposta chiara e trasparente.' },
    { number: '04', icon: Handshake, title: 'Attivazione', description: 'Attiviamo la polizza e ti seguiamo nel tempo.' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden bg-primary-600"
      style={{ padding: isMobile ? 'clamp(4rem, 8vw, 6rem) 0' : '6rem 0' }}
    >
      {/* Interactive Background - Waves animate su sfondo blu */}
      <InteractiveBackground variant="waves" color="primary" intensity={0.3} />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[150px]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className={isMobile ? 'relative z-10 px-4' : 'container mx-auto px-6 lg:px-12 relative z-10 max-w-[1400px]'}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`text-center mx-auto ${isMobile ? 'mb-8' : 'mb-16 max-w-2xl'}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-semibold mb-4 border border-white/20">
            Come Funziona
          </span>
          <h2 
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: isMobile ? 'clamp(24px, 6vw, 32px)' : 'clamp(32px, 4vw, 48px)' }}
          >
            Da Noi è <span className="text-secondary-400">Semplice</span>
          </h2>
          <p className={`text-white/70 ${isMobile ? 'text-sm' : 'text-base lg:text-lg'}`}>
            Un processo chiaro in 4 semplici passaggi.
          </p>
        </motion.div>

        {/* ← TIMELINE LAYOUT: Horizontal desktop / Vertical mobile con linea blue */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={isMobile 
            ? "relative space-y-6" 
            : "grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          }
        >
          {/* Vertical timeline line mobile */}
          {isMobile && (
            <div 
              className="absolute left-6 top-0 bottom-0 w-0.5 bg-secondary-400/30"
              style={{ height: 'calc(100% - 2rem)' }}
            />
          )}
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={isMobile ? "relative pl-16" : ""}
            >
              {isMobile ? (
                // ← MOBILE: Vertical timeline layout
                <div className="relative">
                  {/* Number badge large */}
                  <div 
                    className="absolute left-[-52px] top-0 w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-white text-lg"
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Content card */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                        }}
                      >
                        <step.icon className="w-6 h-6 text-secondary-400" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-white mb-1 text-base">{step.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // ← DESKTOP: Horizontal card layout
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center h-full hover:bg-white/15 transition-all duration-300"
                >
                  {/* Number badge large con gradient blue→purple */}
                  <div 
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-white text-xl"
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                      boxShadow: '0 4px 16px rgba(245, 158, 11, 0.5)'
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <motion.div 
                    className="w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 mt-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="w-10 h-10 text-secondary-400" />
                  </motion.div>

                  <h3 className="text-xl font-display font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>

                  {/* Arrow connector desktop only */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform translate-x-full">
                      <ArrowRight className="w-8 h-8 text-secondary-400/50" />
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`text-center ${isMobile ? 'mt-8' : 'mt-12'}`}
        >
          <Link 
            to="/contatti"
            className={`inline-flex items-center gap-2 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:bg-neutral-50 transition-all duration-300 ${
              isMobile ? 'w-full justify-center py-4 px-6' : 'px-8 py-4 hover:-translate-y-0.5'
            }`}
            style={{ minHeight: isMobile ? '56px' : 'auto' }}
          >
            Inizia Ora
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProcessSection
