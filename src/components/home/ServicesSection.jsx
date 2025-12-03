import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { Car, Home, Heart, Briefcase, PiggyBank, Umbrella, ArrowRight, ArrowUpRight } from 'lucide-react'

const ServicesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    { icon: Car, title: 'Auto e Moto', description: 'RC Auto, Kasko, furto e incendio. Protezione completa per i tuoi veicoli.', popular: true },
    { icon: Home, title: 'Casa e Famiglia', description: 'Proteggi la tua casa e i tuoi cari con polizze complete.' },
    { icon: Heart, title: 'Salute', description: 'Polizze sanitarie per te e la tua famiglia.' },
    { icon: Briefcase, title: 'Business', description: 'Soluzioni su misura per imprese e professionisti.' },
    { icon: PiggyBank, title: 'Investimenti', description: 'Piani di accumulo e investimento personalizzati.' },
    { icon: Umbrella, title: 'Vita e Pensioni', description: 'Proteggi chi ami e pianifica il futuro.' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/20 to-white" />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-[120px]"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-4 border border-primary-100">
            I Nostri Servizi
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
            Soluzioni per <span className="text-primary-600">Ogni Esigenza</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Prodotti assicurativi delle migliori compagnie, selezionati per te.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link to="/servizi">
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative h-full bg-white rounded-2xl border border-neutral-100 p-6 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/30 transition-all duration-500"
                >
                  {service.popular && (
                    <div className="absolute -top-3 right-6 px-3 py-1 bg-secondary-500 text-white text-xs font-semibold rounded-full">
                      Più richiesto
                    </div>
                  )}

                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center mb-5 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <service.icon className="w-7 h-7 text-primary-600" />
                  </motion.div>

                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-display font-bold text-neutral-900">{service.title}</h3>
                    <ArrowUpRight size={20} className="text-neutral-300 group-hover:text-primary-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>

                  <p className="text-neutral-600 text-sm leading-relaxed">{service.description}</p>

                  {/* Animated line */}
                  <motion.div 
                    className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link 
            to="/servizi"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/30 hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-300"
          >
            Scopri tutti i servizi
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
