import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const testimonials = [
    { name: 'Marco Rossi', role: 'Imprenditore', image: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'Professionalità eccezionale. Il team mi ha aiutato a trovare la soluzione perfetta per la mia azienda.' },
    { name: 'Laura Bianchi', role: 'Libera Professionista', image: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'Finalmente un\'agenzia che ascolta. Risposta rapida, preventivi chiari e assistenza impeccabile.' },
    { name: 'Giuseppe Verdi', role: 'Pensionato', image: 'https://randomuser.me/api/portraits/men/67.jpg', text: 'Mi seguono da anni per tutte le polizze. Sempre disponibili e pronti a consigliarmi al meglio.' },
    { name: 'Anna Ferrari', role: 'Medico', image: 'https://randomuser.me/api/portraits/women/28.jpg', text: 'Competenza e trasparenza. La polizza professionale che mi hanno trovato è esattamente ciò di cui avevo bisogno.' },
  ]

  useEffect(() => {
    const timer = setInterval(() => setActiveIndex((prev) => (prev + 1) % testimonials.length), 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-primary-600">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-500/20 rounded-full blur-[150px]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-semibold mb-4 border border-white/20">
            Testimonianze
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
            Cosa Dicono i <span className="text-secondary-400">Nostri Clienti</span>
          </h2>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <Quote className="w-12 h-12 text-secondary-400/50 mb-6" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="fill-secondary-400 text-secondary-400" />
                  ))}
                </div>

                <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-8">
                  "{testimonials[activeIndex].text}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-14 h-14 rounded-full ring-4 ring-white/20"
                  />
                  <div>
                    <p className="font-display font-bold text-white text-lg">{testimonials[activeIndex].name}</p>
                    <p className="text-white/60">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-secondary-400' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center hover:bg-secondary-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
