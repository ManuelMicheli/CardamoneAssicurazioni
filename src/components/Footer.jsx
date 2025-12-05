import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Shield, Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, ChevronRight, ArrowRight, MessageCircle, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'
import { AGENCY, SERVICES } from '../config/agency'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Servizi', path: '/servizi' },
    { name: 'Chi Siamo', path: '/chi-siamo' },
    { name: 'Contatti', path: '/contatti' },
    { name: 'Richiedi Preventivo', path: '/preventivo' },
  ]

  const services = SERVICES.map(s => s.title)

  // Mobile Footer
  if (isMobile) {
    return (
      <footer className="relative bg-gradient-to-b from-slate-900 to-primary-950 text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        <div className="relative" style={{ padding: 'clamp(2.5rem, 6vw, 3rem) 1rem' }}>
          {/* Brand + CTA */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
                <Shield className="w-5 h-5 text-secondary-500" />
              </div>
              <div className="text-left">
                <span className="font-display text-lg font-bold text-white block leading-tight">Cardamone</span>
                <span className="text-[10px] font-semibold text-secondary-500 uppercase tracking-wider">Assicurazioni</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto mb-4">
              Da oltre {AGENCY.experience.years} anni al servizio di {AGENCY.serviceArea}.
            </p>
            
            {/* RUI Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-xs text-white/50">Iscritto RUI:</span>
              <a 
                href={AGENCY.ruiLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-secondary-500 font-medium hover:text-secondary-400 transition-colors"
              >
                {AGENCY.rui}
              </a>
            </div>
            
            {/* Quick CTA */}
            <Link 
              to="/preventivo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                bg-gradient-to-r from-primary-600 to-primary-700 text-white
                shadow-lg shadow-primary-600/25
                active:scale-[0.98] transition-transform"
              style={{ minHeight: '48px' }}
            >
              Richiedi Preventivo
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <a 
              href={`tel:${AGENCY.phone.fissoClean}`} 
              className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/10 active:bg-white/10 transition-colors"
              style={{ minHeight: '80px' }}
            >
              <Phone size={20} className="text-secondary-500 mb-2" />
              <span className="text-white text-xs font-medium">Ufficio</span>
              <span className="text-white/50 text-[10px]">{AGENCY.phone.fisso}</span>
            </a>
            <a 
              href={AGENCY.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/10 active:bg-white/10 transition-colors"
              style={{ minHeight: '80px' }}
            >
              <MessageCircle size={20} className="text-green-500 mb-2" />
              <span className="text-white text-xs font-medium">WhatsApp</span>
              <span className="text-white/50 text-[10px]">{AGENCY.phone.mobile}</span>
            </a>
            <a 
              href={AGENCY.address.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/10 active:bg-white/10 transition-colors"
              style={{ minHeight: '80px' }}
            >
              <MapPin size={20} className="text-secondary-500 mb-2" />
              <span className="text-white text-xs font-medium text-center leading-tight">{AGENCY.address.city}</span>
              <span className="text-white/50 text-[10px]">{AGENCY.address.street}</span>
            </a>
            <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 border border-white/10">
              <Clock size={20} className="text-secondary-500 mb-2" />
              <span className="text-white text-xs font-medium">Orari</span>
              <span className="text-white/50 text-[10px]">Lun-Ven: 9-19</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-sm">
            {quickLinks.slice(0, 4).map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-white/60 hover:text-white active:text-secondary-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-6">
            <div className="text-center text-xs text-white/40 mb-2">
              {AGENCY.fullName}
            </div>
            <div className="text-center text-xs text-white/40 mb-3">
              {AGENCY.address.full}
            </div>
            <div className="text-center text-xs text-white/40 mb-3">
              © {currentYear} Cardamone Assicurazioni. Tutti i diritti riservati.
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-white/40">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <span>•</span>
              <Link to="/cookie" className="hover:text-white transition-colors">Cookie</Link>
              <span>•</span>
              <a 
                href={AGENCY.ruiLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                IVASS <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="h-[env(safe-area-inset-bottom)]" />
      </footer>
    )
  }

  // Desktop Footer
  return (
    <footer className="relative bg-primary-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />
      <motion.div
        animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-[150px]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative">
        {/* Main Content */}
        <div className="container-custom pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Shield className="w-6 h-6 text-secondary-500" />
                </div>
                <div>
                  <span className="font-display text-xl font-bold text-white block">Cardamone</span>
                  <span className="text-xs font-semibold text-secondary-500 uppercase tracking-wider">Assicurazioni</span>
                </div>
              </Link>
              <p className="text-white/60 leading-relaxed mb-4 text-sm">
                Da oltre {AGENCY.experience.years} anni al servizio di famiglie e imprese di {AGENCY.serviceArea}.
              </p>
              
              {/* RUI Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 mb-6">
                <span className="text-xs text-white/50">Iscritto al RUI - Sez. E:</span>
                <a 
                  href={AGENCY.ruiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-secondary-500 font-semibold hover:text-secondary-400 transition-colors flex items-center gap-1"
                >
                  {AGENCY.rui} <ExternalLink size={10} />
                </a>
              </div>
              
              {/* Social */}
              <div className="flex items-center gap-3">
                {[
                  { Icon: Facebook, href: AGENCY.social.facebook },
                  { Icon: Instagram, href: AGENCY.social.instagram },
                  { Icon: Linkedin, href: AGENCY.social.linkedin },
                ].map(({ Icon, href }, index) => (
                  <motion.a 
                    key={index} 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }} 
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary-500 transition-colors"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display font-semibold mb-6 text-white">Link Rapidi</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="flex items-center gap-2 text-white/60 hover:text-secondary-500 transition-colors text-sm">
                      <ChevronRight size={14} className="text-secondary-500" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-display font-semibold mb-6 text-white">Servizi</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link to="/servizi" className="flex items-center gap-2 text-white/60 hover:text-secondary-500 transition-colors text-sm">
                      <ChevronRight size={14} className="text-secondary-500" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold mb-6 text-white">Contatti</h4>
              <ul className="space-y-4">
                <li>
                  <a href={`tel:${AGENCY.phone.fissoClean}`} className="flex items-start gap-3 text-white/60 hover:text-white transition-colors">
                    <Phone size={18} className="text-secondary-500 mt-0.5" />
                    <div>
                      <span className="block font-medium text-white text-sm">{AGENCY.phone.fisso}</span>
                      <span className="text-xs">Ufficio</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={AGENCY.whatsapp.link} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white/60 hover:text-white transition-colors">
                    <MessageCircle size={18} className="text-green-500 mt-0.5" />
                    <div>
                      <span className="block font-medium text-white text-sm">{AGENCY.phone.mobile}</span>
                      <span className="text-xs">WhatsApp</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={AGENCY.address.googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white/60 hover:text-white transition-colors">
                    <MapPin size={18} className="text-secondary-500 mt-0.5" />
                    <div>
                      <span className="block font-medium text-white text-sm">{AGENCY.address.street}</span>
                      <span className="text-xs">{AGENCY.address.cap} {AGENCY.address.city} ({AGENCY.address.province})</span>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <Clock size={18} className="text-secondary-500 mt-0.5" />
                  <div>
                    <span className="block font-medium text-white text-sm">{AGENCY.hours.weekdays}</span>
                    <span className="text-xs">Lun-Ven</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
              <div className="text-center md:text-left">
                <p>{AGENCY.fullName}</p>
                <p className="text-xs">{AGENCY.address.full}</p>
              </div>
              <div className="text-center">
                © {currentYear} Cardamone Assicurazioni. Tutti i diritti riservati.
              </div>
              <div className="flex items-center gap-6">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/cookie" className="hover:text-white transition-colors">Cookie Policy</Link>
                <a 
                  href={AGENCY.ruiLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Verifica IVASS <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
