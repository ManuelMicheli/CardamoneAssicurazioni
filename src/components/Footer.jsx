import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, ChevronRight, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Servizi', path: '/servizi' },
    { name: 'Chi Siamo', path: '/chi-siamo' },
    { name: 'Contatti', path: '/contatti' },
  ]

  const services = ['Assicurazione Auto', 'Assicurazione Casa', 'Assicurazione Vita', 'Assicurazione Salute', 'Business', 'Investimenti']

  return (
    <footer className="relative bg-primary-900 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
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
                  <Shield className="w-6 h-6 text-secondary-400" />
                </div>
                <div>
                  <span className="font-display text-xl font-bold text-white block">Cardamone</span>
                  <span className="text-xs font-semibold text-secondary-400 uppercase tracking-wider">Assicurazioni</span>
                </div>
              </Link>
              <p className="text-white/60 leading-relaxed mb-6 text-sm">
                Protezione su misura per te e la tua famiglia. Da oltre 15 anni il tuo partner di fiducia.
              </p>
              <div className="flex items-center gap-3">
                {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                  <motion.a key={index} href="#" whileHover={{ y: -3 }} className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary-500 transition-colors">
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
                    <Link to={link.path} className="flex items-center gap-2 text-white/60 hover:text-secondary-400 transition-colors text-sm">
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
                    <Link to="/servizi" className="flex items-center gap-2 text-white/60 hover:text-secondary-400 transition-colors text-sm">
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
                  <a href="tel:+390000000000" className="flex items-start gap-3 text-white/60 hover:text-white transition-colors">
                    <Phone size={18} className="text-secondary-400 mt-0.5" />
                    <div>
                      <span className="block font-medium text-white text-sm">+39 000 000 0000</span>
                      <span className="text-xs">Chiamaci</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@cardamone.it" className="flex items-start gap-3 text-white/60 hover:text-white transition-colors">
                    <Mail size={18} className="text-secondary-400 mt-0.5" />
                    <div>
                      <span className="block font-medium text-white text-sm">info@cardamone.it</span>
                      <span className="text-xs">Scrivici</span>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <MapPin size={18} className="text-secondary-400 mt-0.5" />
                  <div>
                    <span className="block font-medium text-white text-sm">Via Roma, 123</span>
                    <span className="text-xs">00100 Città</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <Clock size={18} className="text-secondary-400 mt-0.5" />
                  <div>
                    <span className="block font-medium text-white text-sm">Lun-Ven: 9-18</span>
                    <span className="text-xs">Sab: 9-12</span>
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
              <div>© {currentYear} Cardamone Assicurazioni. Tutti i diritti riservati.</div>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Cookie</a>
                <a href="#" className="hover:text-white transition-colors">Termini</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
