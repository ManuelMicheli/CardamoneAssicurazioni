import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from '../CountUp'
import { Users, Star, Calendar, TrendingUp } from 'lucide-react'
import InteractiveBackground from '../InteractiveBackground'

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const stats = [
    { icon: Users, value: 2500, suffix: '+', label: 'Clienti Soddisfatti' },
    { icon: Star, value: 4.9, decimals: 1, suffix: '/5', label: 'Rating Google' },
    { icon: Calendar, value: 15, suffix: '+', label: 'Anni Esperienza' },
    { icon: TrendingUp, value: 98, suffix: '%', label: 'Tasso Rinnovo' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section ref={ref} className="relative py-20 bg-white overflow-hidden">
      {/* Interactive Background - Particles subtle */}
      <InteractiveBackground variant="particles" color="primary" intensity={0.3} />
      
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/50 to-white" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl p-6 border border-neutral-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/30 transition-all duration-500 h-full">
                {/* Icon */}
                <motion.div 
                  className="mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 group-hover:bg-primary-100 transition-colors duration-300">
                    <stat.icon className="w-7 h-7 text-primary-600" />
                  </div>
                </motion.div>

                {/* Value */}
                <div className="text-3xl lg:text-4xl font-display font-bold text-primary-600 mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </div>

                {/* Label */}
                <p className="font-medium text-neutral-600">{stat.label}</p>

                {/* Animated bottom line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full origin-left"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection
