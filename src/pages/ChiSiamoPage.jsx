import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import CountUp from '../components/CountUp'
import { Shield, Award, Users, Heart, Target, MapPin, ArrowRight, Star, CheckCircle, ExternalLink, Phone, MessageCircle } from 'lucide-react'
import { AGENCY, PARTNERS } from '../config/agency'

const ChiSiamoPage = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const values = [
    { icon: Shield, title: 'Affidabilità', description: 'La fiducia dei nostri clienti è il fondamento del nostro lavoro quotidiano.' },
    { icon: Heart, title: 'Vicinanza', description: 'Siamo parte della comunità locale, sempre presenti quando serve.' },
    { icon: Target, title: 'Trasparenza', description: 'Comunicazione chiara, niente sorprese. Ti spieghiamo tutto.' },
    { icon: Users, title: 'Personalizzazione', description: 'Ogni cliente è unico, ogni soluzione è su misura.' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/30 to-white" />
        <motion.div
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-[120px]"
        />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-6 border border-primary-100">
                Chi Siamo
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-6">
                {AGENCY.fullName}
              </h1>
              <p className="text-xl text-neutral-600 mb-6">
                Da oltre {AGENCY.experience.years} anni accompagniamo famiglie e imprese di {AGENCY.serviceArea} con soluzioni assicurative personalizzate.
              </p>
              
              {/* Rating & RUI */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  {[...Array(AGENCY.reviews.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-secondary-500 text-secondary-500" />
                  ))}
                  <span className="text-neutral-600 ml-1">{AGENCY.reviews.text}</span>
                </div>
                <span className="text-neutral-300">|</span>
                <a 
                  href={AGENCY.ruiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                >
                  RUI: {AGENCY.rui} <ExternalLink size={12} />
                </a>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/preventivo"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors"
                >
                  Richiedi Preventivo
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

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-100 to-secondary-100/50 rounded-3xl opacity-60" />
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=500&fit=crop"
                alt="Francesco Cardamone - Cardamone Assicurazioni"
                className="relative rounded-2xl shadow-xl w-full object-cover"
                style={{ height: '400px' }}
              />
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-700 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">{AGENCY.address.city}</p>
                    <p className="text-xs text-neutral-500">e comuni limitrofi</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: AGENCY.experience.years, suffix: '+', label: 'Anni di Esperienza' },
              { value: AGENCY.reviews.rating, label: 'Stelle Google' },
              { value: AGENCY.reviews.count, label: 'Recensioni' },
              { value: 100, suffix: '%', label: 'Impegno' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-4xl font-display font-bold text-primary-600 mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix || ''} />
                </p>
                <p className="text-neutral-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* La Storia / Francesco */}
      <section ref={storyRef} className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-50 text-secondary-700 text-sm font-semibold mb-4 border border-secondary-100">
                La Nostra Storia
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-6">
                Francesco Cardamone: <span className="text-primary-600">Il Tuo Consulente di Fiducia</span>
              </h2>
              
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  <strong className="text-neutral-900">Francesco Cardamone</strong> ha iniziato la sua carriera nel settore assicurativo nel {AGENCY.experience.yearStarted}, 
                  spinto dalla passione per aiutare le persone a proteggere ciò che hanno di più caro.
                </p>
                <p>
                  Come <strong className="text-neutral-900">subagente</strong> per importanti agenzie del territorio, Francesco ha acquisito 
                  un'esperienza approfondita nelle diverse tipologie di coperture assicurative, dalle polizze auto alle 
                  soluzioni per aziende e professionisti.
                </p>
                <p>
                  Oggi, <strong className="text-neutral-900">Cardamone Assicurazioni</strong> è un punto di riferimento per famiglie e imprese 
                  di {AGENCY.serviceArea}, grazie a un approccio basato sull'ascolto, sulla trasparenza e sulla 
                  personalizzazione delle soluzioni.
                </p>
              </div>

              {/* Key Points */}
              <div className="mt-8 space-y-3">
                {[
                  'Analisi personalizzata delle esigenze',
                  'Confronto tra le migliori compagnie',
                  'Assistenza dedicata in caso di sinistro',
                  'Presenza costante sul territorio',
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-primary-600 flex-shrink-0" />
                    <span className="text-neutral-700">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-neutral-50 rounded-3xl p-8"
            >
              <h3 className="text-xl font-display font-bold text-neutral-900 mb-6">Informazioni Legali</h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-neutral-100">
                  <p className="text-sm text-neutral-500 mb-1">Denominazione</p>
                  <p className="font-semibold text-neutral-900">{AGENCY.fullName}</p>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-neutral-100">
                  <p className="text-sm text-neutral-500 mb-1">Iscrizione RUI - Sezione E</p>
                  <a 
                    href={AGENCY.ruiLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    {AGENCY.rui} <ExternalLink size={14} />
                  </a>
                  <p className="text-xs text-neutral-500 mt-1">Verificabile su IVASS</p>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-neutral-100">
                  <p className="text-sm text-neutral-500 mb-1">Sede</p>
                  <p className="font-semibold text-neutral-900">{AGENCY.address.full}</p>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-neutral-100">
                  <p className="text-sm text-neutral-500 mb-1">Contatti</p>
                  <p className="font-semibold text-neutral-900">{AGENCY.phone.fisso}</p>
                  <p className="text-neutral-700">{AGENCY.phone.mobile} (WhatsApp)</p>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a 
                  href={`tel:${AGENCY.phone.fissoClean}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors"
                >
                  <Phone size={16} />
                  Chiama
                </a>
                <a 
                  href={AGENCY.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-4 border border-primary-100">
              I Nostri Valori
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900">
              Cosa Ci <span className="text-primary-600">Guida</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-primary-100/30 transition-all duration-500 border border-neutral-100 hover:border-primary-100"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-neutral-900 mb-2">{value.title}</h3>
                  <p className="text-neutral-600 text-sm">{value.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary-700 rounded-3xl shadow-xl p-8 lg:p-12 text-center max-w-3xl mx-auto"
          >
            <Shield className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Vuoi Conoscerci di Persona?
            </h2>
            <p className="text-white/70 mb-8">
              Vieni a trovarci in agenzia a {AGENCY.address.city} o contattaci per una consulenza gratuita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contatti" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-neutral-100 transition-colors"
              >
                Contattaci
                <ArrowRight size={18} />
              </Link>
              <Link 
                to="/preventivo" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary-500 text-white font-semibold rounded-xl hover:bg-secondary-600 transition-colors"
              >
                Richiedi Preventivo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default ChiSiamoPage
