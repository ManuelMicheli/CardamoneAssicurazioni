import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import CountUp from '../components/CountUp'
import { Shield, Award, Users, Heart, Target, Eye, ArrowRight, Star, CheckCircle } from 'lucide-react'

const ChiSiamoPage = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const values = [
    { icon: Shield, title: 'Affidabilità', description: 'La fiducia dei nostri clienti è il fondamento.' },
    { icon: Heart, title: 'Passione', description: 'Amiamo quello che facciamo.' },
    { icon: Target, title: 'Precisione', description: 'Attenzione ai dettagli.' },
    { icon: Users, title: 'Vicinanza', description: 'Sempre al tuo fianco.' },
  ]

  const team = [
    { name: 'Marco Cardamone', role: 'Fondatore', image: 'https://randomuser.me/api/portraits/men/42.jpg' },
    { name: 'Laura Rossi', role: 'Responsabile Clienti', image: 'https://randomuser.me/api/portraits/women/32.jpg' },
    { name: 'Giuseppe Bianchi', role: 'Consulente Senior', image: 'https://randomuser.me/api/portraits/men/52.jpg' },
    { name: 'Anna Verdi', role: 'Specialista Sinistri', image: 'https://randomuser.me/api/portraits/women/45.jpg' },
  ]

  const timeline = [
    { year: '2008', title: 'Fondazione', description: 'Nasce Cardamone Assicurazioni' },
    { year: '2012', title: 'Espansione', description: 'Partnership con le principali compagnie' },
    { year: '2016', title: 'Eccellenza', description: 'Raggiungiamo i 1000 clienti' },
    { year: '2024', title: 'Oggi', description: 'Oltre 2500 clienti soddisfatti' },
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
                La Tua Sicurezza, la Nostra <span className="text-primary-600">Missione</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Da oltre 15 anni accompagniamo famiglie e imprese con soluzioni assicurative personalizzate.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="fill-secondary-500 text-secondary-500" />
                  ))}
                </div>
                <span className="text-neutral-600">4.9/5 su Google</span>
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
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop"
                alt="Team Cardamone"
                className="relative rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: 2500, suffix: '+', label: 'Clienti' },
              { value: 15, suffix: '+', label: 'Anni' },
              { value: 6, label: 'Partner' },
              { value: 98, suffix: '%', label: 'Rinnovi' },
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

      {/* Values */}
      <section ref={valuesRef} className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-50 text-secondary-700 text-sm font-semibold mb-4 border border-secondary-100">
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
                  className="bg-neutral-50 rounded-2xl p-6 text-center hover:bg-white hover:shadow-xl hover:shadow-primary-100/30 transition-all duration-500 border border-transparent hover:border-primary-100"
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

      {/* Timeline */}
      <section ref={timelineRef} className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-4 border border-primary-100">
              La Nostra Storia
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900">
              La Nostra <span className="text-primary-600">Storia</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold">{item.year}</span>
                </div>
                <h3 className="text-lg font-display font-bold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-4 border border-primary-100">
              Il Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900">
              Le Persone Dietro <span className="text-primary-600">Cardamone</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div whileHover={{ y: -8 }} className="group">
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-neutral-900">{member.name}</h3>
                  <p className="text-primary-600">{member.role}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 text-center max-w-3xl mx-auto border border-neutral-100"
          >
            <Shield className="w-16 h-16 text-primary-600 mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Vuoi Conoscerci di Persona?
            </h2>
            <p className="text-neutral-600 mb-8">
              Vieni a trovarci in agenzia o prenota una consulenza gratuita.
            </p>
            <Link to="/contatti" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">
              Prenota Appuntamento
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default ChiSiamoPage
