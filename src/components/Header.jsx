import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, Shield, ArrowRight, Star } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen, isMobile])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Servizi', path: '/servizi' },
    { name: 'Chi Siamo', path: '/chi-siamo' },
    { name: 'Contatti', path: '/contatti' },
  ]

  return (
    <>
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block bg-primary-700 text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+390000000000" className="flex items-center gap-2 hover:text-secondary-400 transition-colors">
              <Phone size={14} />
              <span>+39 000 000 0000</span>
            </a>
            <a href="mailto:info@cardamoneassicurazioni.it" className="flex items-center gap-2 hover:text-secondary-400 transition-colors">
              <Mail size={14} />
              <span>info@cardamoneassicurazioni.it</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-secondary-400">★</span>
            <span>4.9/5 su Google Reviews</span>
          </div>
        </div>
      </div>

      {/* Main Header - Desktop (≥769px) */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`hidden lg:block sticky top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3' : 'bg-white py-4'
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <div className="w-11 h-11 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-600/30">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-primary-900">Cardamone</span>
                <span className="text-xs font-semibold text-secondary-500 uppercase tracking-wider">Assicurazioni</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-medium transition-colors hover:text-primary-600 ${
                    location.pathname === link.path ? 'text-primary-600' : 'text-neutral-600'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Link to="/contatti" className="px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30">
                Richiedi Preventivo
              </Link>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ================================================
          MOBILE HEADER PREMIUM (≤768px)
          Fixed slim top bar with glassmorphism effect
          ================================================ */}
      <header 
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center justify-between px-4 transition-all duration-300
          ${isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg' 
            : 'bg-white/90 backdrop-blur-lg'
          }
        `}
        style={{ willChange: 'transform, background-color' }}
      >
        {/* Mobile Logo - Left */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-md shadow-primary-600/25">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold text-primary-900 leading-tight">Cardamone</span>
            <span className="text-[10px] font-semibold text-secondary-500 uppercase tracking-wider leading-tight">Assicurazioni</span>
          </div>
        </Link>

        {/* Mobile Hamburger - Right */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-neutral-50 hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
          aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-primary-900" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6 text-primary-900" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </header>

      {/* ================================================
          MOBILE MENU OVERLAY PREMIUM (≤768px)
          Full-screen dark overlay with slide-in animation
          ================================================ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-40"
          >
            {/* Dark gradient background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-slate-900 via-primary-900 to-indigo-950"
            />
            
            {/* Subtle pattern overlay */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            
            {/* Animated glow orb */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/4 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px]"
            />

            {/* Menu content */}
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center justify-center min-h-screen pt-[70px] pb-8 px-6"
            >
              {/* Nav Links */}
              <nav className="flex flex-col items-center gap-2 w-full max-w-xs">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full"
                  >
                    <Link
                      to={link.path}
                      className={`relative block w-full text-center py-4 px-6 rounded-2xl text-xl font-semibold transition-all duration-300
                        ${location.pathname === link.path 
                          ? 'text-white bg-white/10 backdrop-blur-sm' 
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      {link.name}
                      {/* Active link glow underline */}
                      {location.pathname === link.path && (
                        <motion.div
                          layoutId="mobileActiveNav"
                          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full"
                          style={{
                            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                            boxShadow: '0 2px 15px rgba(245, 158, 11, 0.6)'
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8 w-full max-w-xs"
              >
                <Link 
                  to="/contatti" 
                  className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl font-bold text-lg
                    bg-gradient-to-r from-primary-500 to-primary-600 text-white
                    shadow-lg shadow-primary-500/30
                    active:scale-[0.98] transition-transform"
                  style={{
                    minHeight: '60px',
                    animation: 'mobilePulse 2.5s ease-in-out infinite'
                  }}
                >
                  Richiedi Preventivo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex flex-col items-center gap-4"
              >
                <a href="tel:+390000000000" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                  <Phone size={16} className="text-secondary-400" />
                  <span className="text-sm">+39 000 000 0000</span>
                </a>
                
                {/* Rating badge */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-secondary-400 text-secondary-400" />
                    ))}
                  </div>
                  <span className="text-white/80 text-sm font-medium">4.9/5 Google</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
