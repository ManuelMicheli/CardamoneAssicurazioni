import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, ArrowLeft, CheckCircle, Shield, Phone, MessageCircle,
  Car, Home, Heart, Briefcase, User, Mail, Send, Clock, Star
} from 'lucide-react'
import { AGENCY } from '../config/agency'

// Landing page "Richiedi un Preventivo" con form wizard
const PreventivoPage = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1 - Tipo polizza
    policyType: '',
    // Step 2 - Dettagli (variano in base al tipo)
    details: '',
    // Step 3 - Contatti
    name: '',
    email: '',
    phone: '',
    preferredContact: 'phone',
    message: '',
    privacy: false,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const policyTypes = [
    { id: 'auto', icon: Car, title: 'Auto e Moto', description: 'RC Auto, Kasko, Furto' },
    { id: 'casa', icon: Home, title: 'Casa e Famiglia', description: 'Incendio, Furto, RC' },
    { id: 'vita', icon: Heart, title: 'Vita e Salute', description: 'Infortuni, Malattia' },
    { id: 'business', icon: Briefcase, title: 'Business', description: 'RC Professionale, Attività' },
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const selectPolicyType = (type) => {
    setFormData(prev => ({ ...prev, policyType: type }))
    setErrors(prev => ({ ...prev, policyType: '' }))
  }

  const validateStep = (stepNum) => {
    const newErrors = {}
    
    if (stepNum === 1) {
      if (!formData.policyType) newErrors.policyType = 'Seleziona un tipo di polizza'
    }
    
    if (stepNum === 3) {
      if (!formData.name.trim()) newErrors.name = 'Campo obbligatorio'
      if (!formData.phone.trim()) newErrors.phone = 'Campo obbligatorio'
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email non valida'
      }
      if (!formData.privacy) newErrors.privacy = 'Accetta la privacy policy'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(3)) return
    
    setIsSubmitting(true)
    // Simula invio
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  // Success screen
  if (isSubmitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-[70px] lg:pt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center bg-white rounded-3xl shadow-2xl p-10 border border-neutral-100 m-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-primary-600" />
          </motion.div>
          
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
            Richiesta Inviata!
          </h2>
          <p className="text-neutral-600 mb-2">
            Grazie per averci contattato, <strong>{formData.name.split(' ')[0]}</strong>.
          </p>
          <p className="text-neutral-600 mb-8">
            Ti ricontatteremo entro <strong>24 ore lavorative</strong> al numero indicato.
          </p>

          <div className="bg-neutral-50 rounded-xl p-4 mb-8">
            <p className="text-sm text-neutral-500 mb-2">Preferisci parlare subito?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href={`tel:${AGENCY.phone.fissoClean}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-700 text-white font-medium rounded-xl hover:bg-primary-800 transition-colors"
              >
                <Phone size={16} />
                Chiama ora
              </a>
              <a 
                href={AGENCY.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>

          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700"
          >
            <ArrowLeft size={16} />
            Torna alla Home
          </Link>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-[70px] lg:pt-24 pb-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-100 mb-6">
              <Shield className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-neutral-700">Preventivo Gratuito</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Richiedi un Preventivo <span className="text-primary-600">Personalizzato</span>
            </h1>
            <p className="text-neutral-600 max-w-xl mx-auto">
              Compila il form in 3 semplici passi. Ti ricontatteremo entro 24 ore con la migliore offerta per te.
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-colors ${
                    s < step ? 'bg-primary-600 text-white' :
                    s === step ? 'bg-primary-600 text-white ring-4 ring-primary-100' :
                    'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {s < step ? <CheckCircle size={20} /> : s}
                </div>
              ))}
            </div>
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary-600 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((step - 1) / 2) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between text-xs text-neutral-500 mt-2">
              <span>Tipo polizza</span>
              <span>Dettagli</span>
              <span>Contatti</span>
            </div>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-6 md:p-10"
          >
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1 - Policy Type */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-display font-bold text-neutral-900 mb-2">
                      Di cosa hai bisogno?
                    </h2>
                    <p className="text-neutral-600 mb-6">
                      Seleziona il tipo di polizza che ti interessa
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      {policyTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => selectPolicyType(type.id)}
                          className={`p-5 rounded-2xl border-2 text-left transition-all ${
                            formData.policyType === type.id
                              ? 'border-primary-600 bg-primary-50 shadow-lg'
                              : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                            formData.policyType === type.id ? 'bg-primary-600' : 'bg-neutral-100'
                          }`}>
                            <type.icon className={`w-6 h-6 ${
                              formData.policyType === type.id ? 'text-white' : 'text-neutral-600'
                            }`} />
                          </div>
                          <h3 className="font-semibold text-neutral-900 mb-1">{type.title}</h3>
                          <p className="text-sm text-neutral-500">{type.description}</p>
                        </button>
                      ))}
                    </div>
                    {errors.policyType && (
                      <p className="text-sm text-red-500 mb-4">{errors.policyType}</p>
                    )}
                  </motion.div>
                )}

                {/* Step 2 - Details */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-display font-bold text-neutral-900 mb-2">
                      Raccontaci di più
                    </h2>
                    <p className="text-neutral-600 mb-6">
                      Aggiungi qualche dettaglio per aiutarci a prepararti un preventivo accurato (opzionale)
                    </p>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {formData.policyType === 'auto' && 'Tipo di veicolo, anno, uso...'}
                        {formData.policyType === 'casa' && 'Tipo di abitazione, mq, uso...'}
                        {formData.policyType === 'vita' && 'Età, professione, esigenze...'}
                        {formData.policyType === 'business' && 'Tipo di attività, fatturato...'}
                      </label>
                      <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors resize-none"
                        placeholder="Es. Auto Fiat 500, anno 2020, uso privato, guida esperta..."
                      />
                    </div>

                    <div className="bg-neutral-50 rounded-xl p-4">
                      <p className="text-sm text-neutral-600">
                        💡 <strong>Suggerimento:</strong> Più dettagli ci fornisci, più preciso sarà il preventivo.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 3 - Contact Info */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-display font-bold text-neutral-900 mb-2">
                      Come possiamo contattarti?
                    </h2>
                    <p className="text-neutral-600 mb-6">
                      Inserisci i tuoi dati e ti ricontatteremo entro 24 ore
                    </p>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Nome e Cognome *
                        </label>
                        <div className="relative">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                              errors.name ? 'border-red-300 bg-red-50' : 'border-neutral-200'
                            } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors`}
                            placeholder="Mario Rossi"
                          />
                        </div>
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Telefono *
                        </label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                              errors.phone ? 'border-red-300 bg-red-50' : 'border-neutral-200'
                            } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors`}
                            placeholder="+39 333 333 3333"
                          />
                        </div>
                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Email (opzionale)
                        </label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                              errors.email ? 'border-red-300 bg-red-50' : 'border-neutral-200'
                            } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors`}
                            placeholder="mario@email.it"
                          />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="privacy"
                            checked={formData.privacy}
                            onChange={handleChange}
                            className="mt-1 w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-neutral-600">
                            Accetto la <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link> e 
                            acconsento al trattamento dei miei dati per ricevere il preventivo. *
                          </span>
                        </label>
                        {errors.privacy && <p className="mt-1 text-sm text-red-500">{errors.privacy}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-neutral-600 font-medium hover:text-neutral-800 transition-colors"
                  >
                    <ArrowLeft size={18} />
                    Indietro
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                  >
                    Continua
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/30 hover:bg-primary-700 disabled:opacity-50 transition-all"
                  >
                    {isSubmitting ? (
                      <>Invio in corso...</>
                    ) : (
                      <>
                        <Send size={18} />
                        Invia Richiesta
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-neutral-500"
          >
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary-600" />
              <span>Risposta entro 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-primary-600" />
              <span>Dati protetti</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-secondary-500" />
              <span>{AGENCY.reviews.text}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PreventivoPage

