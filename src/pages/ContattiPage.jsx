import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react'

const ContattiPage = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: '', privacy: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const services = ['Auto e Moto', 'Casa e Famiglia', 'Salute', 'Business', 'Investimenti', 'Vita e Pensioni', 'Altro']

  const contactInfo = [
    { icon: Phone, title: 'Telefono', value: '+39 000 000 0000', href: 'tel:+390000000000' },
    { icon: Mail, title: 'Email', value: 'info@cardamone.it', href: 'mailto:info@cardamoneassicurazioni.it' },
    { icon: MessageCircle, title: 'WhatsApp', value: 'Scrivici', href: 'https://wa.me/390000000000' },
    { icon: MapPin, title: 'Sede', value: 'Via Roma, 123', href: 'https://maps.google.com' },
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Campo obbligatorio'
    if (!formData.email.trim()) newErrors.email = 'Campo obbligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email non valida'
    if (!formData.phone.trim()) newErrors.phone = 'Campo obbligatorio'
    if (!formData.service) newErrors.service = 'Seleziona un servizio'
    if (!formData.privacy) newErrors.privacy = 'Accetta la privacy policy'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-primary-50/30 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center bg-white rounded-3xl shadow-xl p-12 border border-neutral-100"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-primary-600" />
          </motion.div>
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">Messaggio Inviato!</h2>
          <p className="text-neutral-600 mb-8">Ti risponderemo entro 24 ore.</p>
          <button
            onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', service: '', message: '', privacy: false }) }}
            className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Invia un altro messaggio
          </button>
        </motion.div>
      </section>
    )
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
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-6 border border-primary-100">
              Contattaci
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-6">
              Siamo Qui <span className="text-primary-600">Per Te</span>
            </h1>
            <p className="text-xl text-neutral-600">
              Contattaci come preferisci. Rispondiamo sempre entro 24 ore.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-16 -mt-4">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="block bg-white rounded-2xl shadow-lg p-6 border border-neutral-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">{info.title}</h3>
                <p className="text-primary-600 font-medium">{info.value}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-24 bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-neutral-100">
                <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">Richiedi Preventivo</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Nome e Cognome *</label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-300 bg-red-50' : 'border-neutral-200'} focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors`}
                      placeholder="Mario Rossi"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Email *</label>
                      <input
                        type="email" name="email" value={formData.email} onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-300 bg-red-50' : 'border-neutral-200'} focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors`}
                        placeholder="mario@email.it"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Telefono *</label>
                      <input
                        type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-300 bg-red-50' : 'border-neutral-200'} focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors`}
                        placeholder="+39 333 333 3333"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Servizio *</label>
                    <select
                      name="service" value={formData.service} onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.service ? 'border-red-300 bg-red-50' : 'border-neutral-200'} focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors`}
                    >
                      <option value="">Seleziona</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Messaggio</label>
                    <textarea
                      name="message" value={formData.message} onChange={handleChange} rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors resize-none"
                      placeholder="Descrivi le tue esigenze..."
                    />
                  </div>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange}
                        className="mt-1 w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-neutral-600">
                        Accetto la <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a> *
                      </span>
                    </label>
                    {errors.privacy && <p className="mt-1 text-sm text-red-500">{errors.privacy}</p>}
                  </div>

                  <motion.button
                    type="submit" disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/30 hover:bg-primary-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Invio...' : <><Send size={18} /> Invia Richiesta</>}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-neutral-900">Orari</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-3 border-b border-neutral-100">
                    <span className="text-neutral-600">Lunedì - Venerdì</span>
                    <span className="font-semibold text-neutral-900">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-neutral-100">
                    <span className="text-neutral-600">Sabato</span>
                    <span className="font-semibold text-neutral-900">9:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-neutral-600">Domenica</span>
                    <span className="text-neutral-500">Chiuso</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-display font-bold mb-4">Assistenza Urgente?</h3>
                <p className="text-white/70 mb-6">Per sinistri o emergenze, contattaci subito.</p>
                <a href="tel:+390000000000" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                  <Phone size={18} className="text-secondary-400" />
                  <span>+39 000 000 0000</span>
                </a>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-100">
                <div className="p-4">
                  <h3 className="font-display font-bold text-neutral-900 mb-1">Dove Trovarci</h3>
                  <p className="text-neutral-600 text-sm">Via Roma, 123 - 00100 Città</p>
                </div>
                <div className="h-48 bg-neutral-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.6544!2d12.4963655!3d41.9027835"
                    width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContattiPage
