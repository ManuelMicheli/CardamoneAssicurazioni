import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { UserCheck, MapPin, Shield, Award, Clock, Phone } from 'lucide-react'
import { AGENCY } from '../../config/agency'

// Sezione "Perché Scegliere Cardamone" - Benefici concreti
const WhyUsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const benefits = [
    {
      icon: UserCheck,
      title: 'Consulenza Personalizzata',
      description: 'Analizziamo le tue esigenze per proporti solo ciò che ti serve davvero. Niente vendite aggressive, solo soluzioni su misura.',
    },
    {
      icon: MapPin,
      title: 'Esperienza Locale',
      description: `Da oltre ${AGENCY.experience.years} anni al servizio di ${AGENCY.serviceArea}. Conosciamo il territorio e le esigenze della comunità.`,
    },
    {
      icon: Shield,
      title: 'Assistenza Sinistri',
      description: 'Ti seguiamo in ogni fase del sinistro, dalla denuncia alla liquidazione. Non ti lasciamo mai solo quando ne hai più bisogno.',
    },
    {
      icon: Award,
      title: 'Le Migliori Compagnie',
      description: 'Collaboriamo con le principali compagnie assicurative per offrirti le tariffe più competitive e le migliori coperture.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section ref={ref} className="py-20 md:py-24 bg-neutral-50 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-50 text-secondary-700 text-sm font-semibold mb-4 border border-secondary-100">
            Perché Sceglierci
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            Perché Scegliere <span className="text-primary-600">Cardamone</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Non siamo solo un'agenzia assicurativa. Siamo il tuo partner di fiducia per la protezione di ciò che ami.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-full bg-white rounded-2xl p-6 border border-neutral-100 hover:border-primary-100 hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                  <benefit.icon className="w-7 h-7 text-primary-600" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-bold text-neutral-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">Risposta in 24h</p>
              <p className="text-xs text-neutral-500">Preventivi rapidi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">Sempre Raggiungibili</p>
              <p className="text-xs text-neutral-500">Telefono e WhatsApp</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">Iscritti al RUI</p>
              <p className="text-xs text-neutral-500">{AGENCY.rui}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyUsSection
