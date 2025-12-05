import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { Car, Home, Heart, Briefcase, ArrowRight, CheckCircle, Phone, MessageCircle, Shield } from 'lucide-react'
import { AGENCY } from '../config/agency'

const ServiziPage = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const services = [
    {
      id: 'auto-moto',
      icon: Car,
      title: 'Auto e Moto',
      description: 'Protezione completa per i tuoi veicoli con le migliori tariffe del mercato.',
      features: [
        'RC Auto obbligatoria',
        'Kasko e Minikasko',
        'Furto e Incendio',
        'Cristalli e Atti vandalici',
        'Assistenza stradale 24/7',
        'Tutela legale',
      ],
      benefits: 'Confrontiamo le offerte delle principali compagnie per trovare la tariffa più conveniente per il tuo profilo.',
      popular: true,
    },
    {
      id: 'casa-famiglia',
      icon: Home,
      title: 'Casa e Famiglia',
      description: 'Tutela la tua abitazione e proteggi i tuoi cari da imprevisti quotidiani.',
      features: [
        'Incendio e scoppio',
        'Furto e rapina',
        'Danni da acqua',
        'Eventi atmosferici',
        'Responsabilità civile famiglia',
        'Tutela legale famiglia',
      ],
      benefits: 'Polizze modulari che si adattano alle tue esigenze, dalla casa in affitto alla villa di proprietà.',
    },
    {
      id: 'vita-infortuni-salute',
      icon: Heart,
      title: 'Vita, Infortuni e Salute',
      description: 'Proteggi te stesso e il futuro dei tuoi cari con coperture su misura.',
      features: [
        'Polizza vita caso morte',
        'Infortuni professionali e non',
        'Invalidità permanente',
        'Rimborso spese mediche',
        'Diaria da ricovero',
        'Copertura malattie gravi',
      ],
      benefits: 'Soluzioni pensate per ogni fase della vita, dalla giovane famiglia alla pianificazione della pensione.',
    },
    {
      id: 'business',
      icon: Briefcase,
      title: 'Business e Professionisti',
      description: 'Protezione completa per la tua attività professionale e imprenditoriale.',
      features: [
        'RC Professionale',
        'Multirischi attività commerciali',
        'RC artigiani e commercianti',
        'D&O (Responsabilità amministratori)',
        'Cyber risk',
        'Merci trasportate',
      ],
      benefits: 'Dal libero professionista alla PMI, soluzioni su misura per proteggere il tuo lavoro.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/30 to-white" />
        <motion.div
          animate={{ x: [0, 30, 0] }}
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
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-6">
              Soluzioni Assicurative <span className="text-primary-600">Complete</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-6">
              Analizziamo le tue esigenze, confrontiamo le offerte delle migliori compagnie e ti proponiamo 
              la soluzione più adatta a te. Con assistenza dedicata in caso di sinistro.
            </p>
            
            {/* Key benefits */}
            <div className="flex flex-wrap gap-4 mb-8">
              {['Preventivi gratuiti', 'Consulenza personalizzata', 'Assistenza sinistri'].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-neutral-100 shadow-sm">
                  <CheckCircle size={16} className="text-primary-600" />
                  <span className="text-sm font-medium text-neutral-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link 
                to="/preventivo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors"
              >
                Richiedi Preventivo Gratuito
                <ArrowRight size={16} />
              </Link>
              <a 
                href={`tel:${AGENCY.phone.fissoClean}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
              >
                <Phone size={16} />
                Chiamaci
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section ref={servicesRef} className="py-24 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="space-y-12"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                variants={itemVariants}
                className="bg-white rounded-3xl shadow-lg border border-neutral-100 overflow-hidden"
              >
                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Left Column - Icon & Title */}
                  <div className="p-8 lg:p-10 bg-gradient-to-br from-primary-50 to-white border-b lg:border-b-0 lg:border-r border-neutral-100">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-8 h-8 text-primary-600" />
                      </div>
                      <div>
                        {service.popular && (
                          <span className="inline-block px-2 py-0.5 bg-secondary-500 text-white text-xs font-bold rounded-full mb-2">
                            Più richiesto
                          </span>
                        )}
                        <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                          {service.title}
                        </h2>
                        <p className="text-neutral-600">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* CTA for this service */}
                    <div className="mt-8">
                      <Link 
                        to="/preventivo"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-700 text-white text-sm font-semibold rounded-xl hover:bg-primary-800 transition-colors"
                      >
                        Richiedi Preventivo
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Middle Column - Features */}
                  <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-neutral-100">
                    <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                      Coperture disponibili
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column - Benefits */}
                  <div className="p-8 lg:p-10 bg-neutral-50">
                    <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                      Il nostro approccio
                    </h3>
                    <p className="text-neutral-600 leading-relaxed mb-6">
                      {service.benefits}
                    </p>
                    
                    <div className="p-4 bg-white rounded-xl border border-neutral-100">
                      <p className="text-sm text-neutral-600 mb-2">Hai domande su {service.title.toLowerCase()}?</p>
                      <a 
                        href={AGENCY.whatsapp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700"
                      >
                        <MessageCircle size={16} />
                        Scrivici su WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-3xl shadow-xl p-8 lg:p-12 text-center max-w-4xl mx-auto"
          >
            <Shield className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Non Trovi Quello Che Cerchi?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Offriamo molte altre soluzioni assicurative. Contattaci per una consulenza gratuita 
              e ti aiuteremo a trovare la protezione perfetta per le tue esigenze.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contatti" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-neutral-100 transition-colors"
              >
                Contattaci
                <ArrowRight size={18} />
              </Link>
              <a 
                href={`tel:${AGENCY.phone.fissoClean}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                <Phone size={18} />
                {AGENCY.phone.fisso}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default ServiziPage
