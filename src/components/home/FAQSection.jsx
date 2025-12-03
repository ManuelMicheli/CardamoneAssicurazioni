import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Plus, Minus, Phone, MessageCircle } from 'lucide-react'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const faqs = [
    { question: 'Come posso richiedere un preventivo?', answer: 'Puoi compilare il form online, chiamarci o scriverci su WhatsApp. Rispondiamo sempre entro 24 ore.' },
    { question: 'Quali documenti servono?', answer: 'Documento d\'identità e codice fiscale. Per l\'auto anche il libretto di circolazione.' },
    { question: 'Posso modificare la polizza?', answer: 'Sì, le polizze possono essere modificate in qualsiasi momento per adattarsi alle tue esigenze.' },
    { question: 'Come funziona l\'assistenza sinistri?', answer: 'Ti seguiamo dall\'inizio alla fine. Compiliamo insieme la denuncia e monitoriamo la pratica.' },
    { question: 'La consulenza è gratuita?', answer: 'Sì, la prima consulenza è sempre gratuita e senza impegno.' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white" />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 right-0 w-[400px] h-[400px] bg-primary-100/30 rounded-full blur-[100px]"
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-4 border border-primary-100">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Hai <span className="text-primary-600">Domande?</span>
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Trova le risposte alle domande più comuni.
            </p>

            {/* Contact card */}
            <div className="bg-gradient-to-br from-primary-50 to-neutral-50 border border-primary-100 rounded-2xl p-6">
              <h4 className="font-display font-bold text-lg mb-4 text-neutral-900">Non hai trovato la risposta?</h4>
              <div className="space-y-3">
                <a href="tel:+390000000000" className="flex items-center gap-3 px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:bg-primary-50 hover:border-primary-200 transition-colors">
                  <Phone size={18} className="text-primary-600" />
                  <span className="text-sm text-neutral-700">+39 000 000 0000</span>
                </a>
                <a href="https://wa.me/390000000000" className="flex items-center gap-3 px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:bg-primary-50 hover:border-primary-200 transition-colors">
                  <MessageCircle size={18} className="text-primary-600" />
                  <span className="text-sm text-neutral-700">Scrivici su WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right - Accordion */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    openIndex === index 
                      ? 'border-primary-200 bg-primary-50/50 shadow-lg shadow-primary-100/30' 
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <span className={`font-semibold pr-4 ${openIndex === index ? 'text-primary-700' : 'text-neutral-800'}`}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      openIndex === index ? 'bg-primary-100 text-primary-700' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          <p className="text-neutral-600">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
