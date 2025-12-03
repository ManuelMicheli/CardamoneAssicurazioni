import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

const WhatsAppButton = () => {
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile: larger touch target, positioned with safe area
  if (isMobile) {
    return (
      <motion.a
        href="https://wa.me/390000000000?text=Ciao,%20vorrei%20informazioni%20sui%20vostri%20servizi%20assicurativi"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed z-50 flex items-center justify-center bg-green-500 rounded-full shadow-lg shadow-green-500/40"
        style={{
          bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
          right: '1rem',
          width: '60px',
          height: '60px',
          minWidth: '60px',
          minHeight: '60px',
          willChange: 'transform'
        }}
        aria-label="Contattaci su WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
        
        {/* Pulse Effect - Mobile optimized */}
        {!prefersReducedMotion && (
          <span 
            className="absolute inset-0 rounded-full bg-green-500"
            style={{
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
              opacity: 0.2
            }}
          />
        )}
      </motion.a>
    )
  }

  // Desktop: original design
  return (
    <motion.a
      href="https://wa.me/390000000000?text=Ciao,%20vorrei%20informazioni%20sui%20vostri%20servizi%20assicurativi"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-shadow"
      aria-label="Contattaci su WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
      
      {/* Pulse Effect */}
      {!prefersReducedMotion && (
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
      )}
    </motion.a>
  )
}

export default WhatsAppButton

