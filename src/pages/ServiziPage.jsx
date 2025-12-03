import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { Car, Home, Heart, Briefcase, PiggyBank, Umbrella, ArrowRight, CheckCircle, Shield } from 'lucide-react'

const ServiziPage = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const services = [
    {
      icon: Car, title: 'Auto e Moto', subtitle: 'Protezione veicoli',
      description: 'RC Auto obbligatoria e garanzie accessorie. Confrontiamo le offerte delle migliori compagnie.',
      features: ['RC Auto/Moto', 'Kasko', 'Furto e Incendio', 'Assistenza 24/7'],
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop',
    },
    {
      icon: Home, title: 'Casa e Famiglia', subtitle: 'Sicurezza domestica',
      description: 'Proteggi la tua casa e i tuoi cari con polizze complete.',
      features: ['Incendio', 'Furto', 'RC Famiglia', 'Eventi Atmosferici'],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    },
    {
      icon: Heart, title: 'Salute e Benessere', subtitle: 'Cure senza pensieri',
      description: 'Accesso alle migliori cure private senza liste di attesa.',
      features: ['Rimborso Spese', 'Ricovero', 'Visite', 'Check-up'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    },
    {
      icon: Briefcase, title: 'Business', subtitle: 'Protezione aziendale',
      description: 'Soluzioni su misura per imprese e professionisti.',
      features: ['RC Professionale', 'D&O', 'Cyber Risk', 'Infortuni'],
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop',
    },
    {
      icon: PiggyBank, title: 'Investimenti', subtitle: 'Crescita capitale',
      description: 'Piani di accumulo e investimento personalizzati.',
      features: ['PAC', 'Unit Linked', 'Fondi Pensione', 'Gestioni'],
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop',
    },
    {
      icon: Umbrella, title: 'Vita e Pensioni', subtitle: 'Serenità futura',
      description: 'Proteggi chi ami e pianifica la pensione.',
      features: ['TCM', 'Polizza Vita', 'LTC', 'Previdenza'],
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/30 to-white" />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-[120px]"
        />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-6 border border-primary-100">
              I Nostri Servizi
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Soluzioni <span className="text-primary-600">Complete</span>
            </h1>
            <p className="text-xl text-neutral-600">
              Una gamma completa di prodotti assicurativi delle migliori compagnie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="space-y-16"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <motion.div 
                    className={index % 2 === 1 ? 'lg:order-2' : ''}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-gradient-to-br from-primary-100 to-secondary-100/50 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
                      <img
                        src={service.image}
                        alt={service.title}
                        className="relative rounded-2xl shadow-xl w-full h-80 object-cover"
                      />
                    </div>
                  </motion.div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-primary-600" />
                    </div>
                    
                    <h2 className="text-3xl font-display font-bold text-neutral-900 mb-2">{service.title}</h2>
                    <p className="text-primary-600 font-medium mb-4">{service.subtitle}</p>
                    <p className="text-neutral-600 mb-6">{service.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-primary-600" />
                          <span className="text-neutral-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link 
                      to="/contatti" 
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                    >
                      Richiedi Preventivo
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="w-16 h-16 text-secondary-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Non Sai Quale Polizza Scegliere?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              I nostri consulenti sono a disposizione per una consulenza gratuita.
            </p>
            <Link to="/contatti" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-neutral-50 transition-colors">
              Prenota Consulenza
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default ServiziPage
