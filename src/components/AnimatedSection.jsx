import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' 
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: isMobile ? 0.1 : 0.1, // Early trigger for mobile
  })

  // Desktop animations - original
  const desktopDirections = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
  }

  // Mobile animations - optimized (fade + subtle scale only)
  const mobileInitial = {
    opacity: 0,
    y: 20,
    scale: 0.95
  }

  const mobileAnimate = {
    opacity: 1,
    y: 0,
    scale: 1
  }

  // Respect reduced motion preference
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  // Mobile-optimized animations
  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        initial={mobileInitial}
        animate={inView ? mobileAnimate : mobileInitial}
        transition={{ 
          duration: 0.4, 
          delay: Math.min(delay, 0.2), // Cap delay on mobile for snappier feel
          ease: [0.22, 1, 0.36, 1] // Premium cubic-bezier
        }}
        className={className}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>
    )
  }

  // Desktop animations - original behavior
  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...desktopDirections[direction] 
      }}
      animate={inView ? { 
        opacity: 1, 
        y: 0, 
        x: 0 
      } : {}}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedSection

