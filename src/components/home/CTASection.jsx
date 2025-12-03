import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Phone, Mail, MapPin, Clock, Shield } from 'lucide-react'

const CTASection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const contacts = [
    { icon: Phone, label: 'Telefono', value: '+39 000 000 0000' },
    { icon: Mail, label: 'Email', value: 'info@cardamone.it' },
    { icon: MapPin, label: 'Sede', value: 'Via Roma, 123' },
    { icon: Clock, label: 'Orari', value: 'Lun-Ven 9-18' },
  ]

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-secondary-50/30 to-white" />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary-100/50 rounded-full blur-[150px]"
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-primary-600 rounded-3xl p-8 lg:p-12 overflow-hidden relative"
        >
          {/* Inner background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-secondary-500/20 rounded-full blur-[100px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-secondary-400" />
                </div>
                <div>
                  <p className="font-display font-bold text-white text-xl">Cardamone</p>
                  <p className="text-secondary-400 text-sm font-semibold uppercase tracking-wider">Assicurazioni</p>
                </div>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Proteggi Ciò Che Ami
              </h2>
              <p className="text-white/70 mb-8">
                Contattaci oggi per una consulenza gratuita e scopri come possiamo aiutarti.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contatti"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary-500 text-white font-semibold rounded-xl shadow-lg shadow-secondary-500/30 hover:bg-secondary-600 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Richiedi Preventivo
                  <ArrowRight size={18} />
                </Link>
                <a 
                  href="tel:+390000000000"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <Phone size={18} />
                  Chiama
                </a>
              </div>
            </div>

            {/* Right - Contact cards */}
            <div className="grid grid-cols-2 gap-4">
              {contacts.map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/15 transition-all duration-300"
                >
                  <contact.icon size={20} className="text-secondary-400 mb-2" />
                  <p className="text-white/50 text-xs mb-1">{contact.label}</p>
                  <p className="text-white font-medium text-sm">{contact.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
