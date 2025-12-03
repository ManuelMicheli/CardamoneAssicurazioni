import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MessageSquare, FileSearch, CheckCircle, Handshake, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProcessSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const steps = [
    { number: '01', icon: MessageSquare, title: 'Contattaci', description: 'Raccontaci le tue esigenze via form, telefono o WhatsApp.' },
    { number: '02', icon: FileSearch, title: 'Analisi Gratuita', description: 'Confrontiamo le offerte delle migliori compagnie.' },
    { number: '03', icon: CheckCircle, title: 'Preventivo', description: 'Ti presentiamo una proposta chiara e trasparente.' },
    { number: '04', icon: Handshake, title: 'Attivazione', description: 'Attiviamo la polizza e ti seguiamo nel tempo.' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-primary-600">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[150px]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-semibold mb-4 border border-white/20">
            Come Funziona
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Da Noi è <span className="text-secondary-400">Semplice</span>
          </h2>
          <p className="text-lg text-white/70">
            Un processo chiaro in 4 semplici passaggi.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center h-full hover:bg-white/15 transition-all duration-300"
              >
                {/* Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{step.number}</span>
                </div>

                {/* Icon */}
                <motion.div 
                  className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-5 mt-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <step.icon className="w-8 h-8 text-secondary-400" />
                </motion.div>

                <h3 className="text-lg font-display font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.description}</p>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform translate-x-full">
                    <ArrowRight className="w-6 h-6 text-white/30" />
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link 
            to="/contatti"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:bg-neutral-50 hover:-translate-y-0.5 transition-all duration-300"
          >
            Inizia Ora
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProcessSection
