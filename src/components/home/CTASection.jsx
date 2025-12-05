import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, MessageCircle, Shield } from 'lucide-react'
import { AGENCY } from '../../config/agency'

// Sezione CTA finale - Contatto rapido
const CTASection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 md:py-24 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Glow effect */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[100px]"
      />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto border border-white/20">
              <Shield className="w-10 h-10 text-secondary-400" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Pronto a Proteggere <br className="hidden sm:block" />
              <span className="text-secondary-400">Ciò Che Ami?</span>
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
              Contattaci oggi per una consulenza gratuita e senza impegno. 
              Ti aiutiamo a trovare la protezione perfetta per le tue esigenze.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link 
              to="/preventivo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary-500 text-white font-semibold rounded-xl shadow-lg shadow-secondary-500/30 hover:bg-secondary-600 hover:-translate-y-0.5 transition-all duration-300"
            >
              Richiedi Preventivo Gratuito
              <ArrowRight size={18} />
            </Link>
            <a 
              href={`tel:${AGENCY.phone.fissoClean}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <Phone size={18} />
              Chiama Ora
            </a>
          </motion.div>

          {/* Quick contact options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm"
          >
            <a 
              href={`tel:${AGENCY.phone.fissoClean}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone size={14} />
              {AGENCY.phone.fisso}
            </a>
            <a 
              href={AGENCY.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageCircle size={14} className="text-green-400" />
              WhatsApp
            </a>
            <Link 
              to="/contatti"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              Oppure vieni a trovarci
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
