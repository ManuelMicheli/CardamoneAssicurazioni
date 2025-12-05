import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, Briefcase, Building, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Sezione "Per chi lavoriamo" - Target clienti con blocchi dedicati
const TargetClientsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const targets = [
    {
      icon: Users,
      title: 'Famiglie',
      description: 'Proteggi casa, auto e i tuoi cari con soluzioni complete e accessibili. Dalla RC auto alla polizza vita, ti guidiamo nella scelta migliore per il tuo nucleo familiare.',
      features: ['RC Auto e Moto', 'Casa e Contenuto', 'Responsabilità Civile', 'Vita e Infortuni'],
      color: 'primary',
      bgColor: 'bg-primary-50',
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
    },
    {
      icon: Briefcase,
      title: 'Professionisti',
      description: 'RC professionale, tutela legale e protezione del patrimonio per chi lavora in proprio. Soluzioni pensate per liberi professionisti e consulenti.',
      features: ['RC Professionale', 'Tutela Legale', 'Infortuni', 'Cyber Risk'],
      color: 'secondary',
      bgColor: 'bg-secondary-50',
      iconBg: 'bg-secondary-100',
      iconColor: 'text-secondary-600',
    },
    {
      icon: Building,
      title: 'Attività Locali',
      description: 'Polizze aziendali su misura per artigiani, commercianti e PMI del territorio. Protezione completa per la tua attività.',
      features: ['RC Attività', 'Danni Incendio', 'Furto Contenuto', 'Responsabilità Civile'],
      color: 'accent',
      bgColor: 'bg-accent-50',
      iconBg: 'bg-accent-100',
      iconColor: 'text-accent-600',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section ref={ref} className="py-20 md:py-24 bg-white overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-4 border border-primary-100">
            Per Chi Lavoriamo
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            Soluzioni per <span className="text-primary-600">Ogni Esigenza</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Che tu sia una famiglia, un professionista o un'impresa locale, abbiamo la protezione giusta per te.
          </p>
        </motion.div>

        {/* Target Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {targets.map((target, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`h-full p-8 rounded-2xl ${target.bgColor} border border-${target.color}-100 hover:shadow-xl transition-shadow duration-300`}>
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${target.iconBg} flex items-center justify-center mb-6`}>
                  <target.icon className={`w-7 h-7 ${target.iconColor}`} />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-display font-bold text-neutral-900 mb-3">
                  {target.title}
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {target.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {target.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-neutral-700">
                      <div className={`w-1.5 h-1.5 rounded-full ${target.iconBg.replace('100', '500')}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link 
                  to="/servizi"
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${target.iconColor} hover:gap-3 transition-all`}
                >
                  Scopri di più
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-neutral-600 mb-4">
            Non rientri in queste categorie? Nessun problema!
          </p>
          <Link 
            to="/contatti"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
          >
            Contattaci per una consulenza personalizzata
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default TargetClientsSection

