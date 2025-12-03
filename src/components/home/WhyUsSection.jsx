import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Clock, Users, Award, CheckCircle, ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import InteractiveBackground from '../InteractiveBackground'

const WhyUsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const reasons = [
    { icon: Award, title: 'Eccellenza Riconosciuta', description: '4.9/5 stelle su Google con oltre 150 recensioni verificate.' },
    { icon: Users, title: 'Consulenza Personalizzata', description: 'Ogni cliente è unico. Soluzioni realmente su misura.' },
    { icon: Shield, title: 'Trasparenza Totale', description: 'Chiarezza nei costi, onestà nelle proposte. Zero sorprese.' },
    { icon: Clock, title: 'Sempre Presenti', description: 'Risposte in 24h e assistenza sinistri dedicata.' },
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
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Interactive Background - Grid animata */}
      <InteractiveBackground variant="grid" color="gradient" intensity={0.35} />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white" />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-100/30 rounded-full blur-[120px]"
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-50 text-secondary-700 text-sm font-semibold mb-4 border border-secondary-100">
              Perché Sceglierci
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              La Tua Sicurezza è la Nostra <span className="text-secondary-500">Priorità</span>
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Da oltre 15 anni accompagniamo i nostri clienti con competenza, trasparenza e un approccio personalizzato.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['Partner Premium', 'Preventivi 24h', 'Consulenza Gratuita'].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-full bg-primary-50 border border-primary-100">
                  <CheckCircle size={16} className="text-primary-600" />
                  <span className="text-sm font-medium text-primary-700">{badge}</span>
                </div>
              ))}
            </div>

            <Link 
              to="/chi-siamo"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Scopri di più su di noi
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Right Content - Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 gap-4"
          >
            {reasons.map((reason, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="h-full bg-white rounded-2xl border border-neutral-100 p-6 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/30 transition-all duration-500"
                >
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <reason.icon className="w-6 h-6 text-primary-600" />
                  </motion.div>
                  <h3 className="text-lg font-display font-bold text-neutral-900 mb-2">{reason.title}</h3>
                  <p className="text-neutral-600 text-sm">{reason.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-lg border border-neutral-100">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-secondary-500 text-secondary-500" />
              ))}
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div>
              <p className="font-bold text-neutral-900">4.9/5 su Google</p>
              <p className="text-sm text-neutral-500">150+ recensioni</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyUsSection
