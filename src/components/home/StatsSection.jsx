import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from '../CountUp'
import { Users, Star, Calendar, TrendingUp } from 'lucide-react'
import InteractiveBackground from '../InteractiveBackground'
import { useState, useEffect } from 'react'

const StatsSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const stats = [
    { icon: Users, value: 2500, suffix: '+', label: 'Clienti Soddisfatti' },
    { icon: Star, value: 4.9, decimals: 1, suffix: '/5', label: 'Rating Google' },
    { icon: Calendar, value: 15, suffix: '+', label: 'Anni Esperienza' },
    { icon: TrendingUp, value: 98, suffix: '%', label: 'Tasso Rinnovo' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ padding: isMobile ? 'clamp(3rem, 8vw, 4rem) 0' : '5rem 0' }}>
      {/* Interactive Background - Particles subtle */}
      <InteractiveBackground variant="particles" color="primary" intensity={0.3} />
      
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/50 to-white" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      
      <div className={isMobile ? 'relative z-10' : 'container mx-auto px-6 lg:px-12 relative z-10 max-w-[1400px]'}>
        {/* ← LAYOUT RESPONSIVO: 4 colonne desktop, 2x2 tablet, scroll orizzontale mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={isMobile 
            ? "flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory" 
            : "grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          }
          style={isMobile ? {
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          } : {}}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={!isMobile ? { y: -8, transition: { duration: 0.3 } } : {}}
              whileTap={isMobile ? { scale: 1.05 } : {}}
              className={isMobile ? "flex-shrink-0 snap-center" : "group"}
              style={isMobile ? { 
                width: 'calc((100vw - 48px) / 2.2)',
                scrollSnapAlign: 'center'
              } : {}}
            >
              <div 
                className={`relative rounded-[16px] border transition-all duration-300 h-full ${
                  isMobile ? 'p-5' : 'p-6 lg:p-8'
                }`}
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
                {/* Icon + Visual */}
                <motion.div 
                  className={isMobile ? "mb-3" : "mb-4"}
                  whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : {}}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div 
                    className={`inline-flex items-center justify-center rounded-xl transition-colors duration-300 ${
                      isMobile ? 'w-12 h-12' : 'w-14 h-14'
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                    }}
                  >
                    <stat.icon className={isMobile ? 'w-6 h-6 text-primary-600' : 'w-7 h-7 text-primary-600'} />
                  </div>
                </motion.div>

                {/* Value - numero grande */}
                <div 
                  className="font-display font-bold text-primary-600 mb-1"
                  style={{ fontSize: isMobile ? 'clamp(24px, 6vw, 32px)' : 'clamp(32px, 3vw, 48px)' }}
                >
                  <CountUp end={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </div>

                {/* Label */}
                <p className={`font-medium text-neutral-600 ${isMobile ? 'text-xs' : 'text-sm lg:text-base'}`}>
                  {stat.label}
                </p>

                {/* Animated bottom line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-[16px]"
                  style={{
                    background: 'linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.5) 50%, rgba(59, 130, 246, 0) 100%)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection
