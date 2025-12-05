import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, Search, FileCheck, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PROCESS_STEPS } from '../../config/agency'

// Sezione "Come Funziona" - 3 step semplici
const ProcessSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Icons for each step
  const stepIcons = [Phone, Search, FileCheck]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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
            Come Funziona
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            3 Semplici <span className="text-primary-600">Passi</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Dalla prima chiamata alla polizza perfetta, ti accompagniamo in ogni fase.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 lg:gap-12 relative"
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

          {PROCESS_STEPS.map((step, index) => {
            const Icon = stepIcons[index]
            return (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="relative"
              >
                <div className="text-center">
                  {/* Step number + icon */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    {/* Background circle */}
                    <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center relative z-10">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-600 text-white font-bold text-sm flex items-center justify-center shadow-lg z-20">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (mobile only) */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <ArrowRight className="w-6 h-6 text-primary-300 rotate-90" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-neutral-600 mb-4">Pronto a iniziare?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/preventivo"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-700/30 hover:bg-primary-800 hover:-translate-y-0.5 transition-all duration-300"
            >
              Richiedi Preventivo Gratuito
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="/contatti"
              className="inline-flex items-center gap-2 px-6 py-4 bg-neutral-100 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
            >
              Contattaci
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProcessSection
