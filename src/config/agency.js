// =====================================================
// CONFIGURAZIONE DATI AGENZIA - CARDAMONE ASSICURAZIONI
// Dati reali per compilazione del sito
// =====================================================

export const AGENCY = {
  // Dati Legali
  name: 'Cardamone Assicurazioni',
  fullName: 'Cardamone Assicurazioni di Francesco Cardamone',
  owner: 'Francesco Cardamone',
  rui: 'E000354443',
  ruiLink: 'https://servizi.ivass.it/RuirPubblica/',
  
  // Contatti
  phone: {
    fisso: '+39 02 9356 2401',
    fissoClean: '+390293562401',
    mobile: '+39 392 836 3715',
    mobileClean: '+393928363715',
  },
  email: 'info@cardamoneassicurazioni.it', // placeholder - da sostituire
  whatsapp: {
    number: '+39 392 836 3715',
    link: 'https://wa.me/393928363715',
  },
  
  // Indirizzo
  address: {
    street: 'Via San Martino 16',
    cap: '20010',
    city: 'Cornaredo',
    province: 'MI',
    full: 'Via San Martino 16, 20010 Cornaredo (MI)',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.123!2d9.0234!3d45.4987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVia+San+Martino+16%2C+Cornaredo!5e0!3m2!1sit!2sit!4v1',
    googleMapsLink: 'https://maps.google.com/?q=Via+San+Martino+16,+Cornaredo+MI',
  },
  
  // Orari (placeholder - da confermare)
  hours: {
    weekdays: '9:00 - 13:00 / 15:00 - 19:00',
    saturday: 'Su appuntamento',
    sunday: 'Chiuso',
  },
  
  // Recensioni Google
  reviews: {
    rating: 5,
    count: 4,
    text: '5/5 su Google - 4 Recensioni',
  },
  
  // Social Media (placeholder)
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
  },
  
  // Esperienza
  experience: {
    years: 15,
    yearStarted: 2009,
  },
  
  // Area di competenza
  serviceArea: 'Cornaredo e comuni limitrofi',
  
  // P.IVA (placeholder - da inserire)
  piva: 'P.IVA: XXXXXXXXXX',
}

// Compagnie Partner (placeholder - da confermare quali sono reali)
export const PARTNERS = [
  { name: 'Generali', logo: '/images/partners/generali.svg' },
  { name: 'Allianz', logo: '/images/partners/allianz.svg' },
  { name: 'Unipol', logo: '/images/partners/unipol.svg' },
  { name: 'Zurich', logo: '/images/partners/zurich.svg' },
  { name: 'Axa', logo: '/images/partners/axa.svg' },
  { name: 'Cattolica', logo: '/images/partners/cattolica.svg' },
]

// Servizi Principali
export const SERVICES = [
  {
    id: 'auto-moto',
    title: 'Auto e Moto',
    shortDesc: 'RC Auto, Kasko, furto e incendio. Tariffe competitive per la tua mobilità.',
    icon: 'Car',
    popular: true,
  },
  {
    id: 'casa-famiglia',
    title: 'Casa e Famiglia',
    shortDesc: 'Protezione completa per la tua abitazione e responsabilità civile familiare.',
    icon: 'Home',
  },
  {
    id: 'vita-infortuni-salute',
    title: 'Vita, Infortuni e Salute',
    shortDesc: 'Tutela il tuo futuro e quello dei tuoi cari con polizze su misura.',
    icon: 'Heart',
  },
  {
    id: 'business',
    title: 'Business e Professionisti',
    shortDesc: 'Soluzioni per imprese, artigiani e liberi professionisti del territorio.',
    icon: 'Briefcase',
  },
]

// Target Clienti
export const CLIENT_TARGETS = [
  {
    title: 'Famiglie',
    description: 'Proteggi casa, auto e i tuoi cari con soluzioni complete e accessibili.',
    icon: 'Users',
  },
  {
    title: 'Professionisti',
    description: 'RC professionale, tutela legale e protezione del patrimonio.',
    icon: 'Briefcase',
  },
  {
    title: 'Attività Locali',
    description: 'Polizze aziendali su misura per artigiani, commercianti e PMI.',
    icon: 'Building',
  },
]

// Benefici (Perché sceglierci)
export const BENEFITS = [
  {
    title: 'Consulenza Personalizzata',
    description: 'Analizziamo le tue esigenze per proporti solo ciò che ti serve davvero.',
    icon: 'UserCheck',
  },
  {
    title: 'Esperienza Locale',
    description: 'Da oltre 15 anni al servizio di Cornaredo e comuni limitrofi.',
    icon: 'MapPin',
  },
  {
    title: 'Assistenza Sinistri',
    description: 'Ti seguiamo in ogni fase, dalla denuncia alla liquidazione.',
    icon: 'Shield',
  },
  {
    title: 'Migliori Compagnie',
    description: 'Collaboriamo con le principali compagnie per offrirti le tariffe più competitive.',
    icon: 'Award',
  },
]

// Processo "Come Funziona"
export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Contatto',
    description: 'Chiamaci, scrivici su WhatsApp o compila il form. Rispondiamo in 24h.',
  },
  {
    step: 2,
    title: 'Analisi',
    description: 'Valutiamo insieme le tue esigenze per trovare la soluzione ideale.',
  },
  {
    step: 3,
    title: 'Polizza Personalizzata',
    description: 'Ti presentiamo le migliori opzioni e ti accompagniamo nella scelta.',
  },
]

// Recensioni Reali (da Google)
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Cliente Verificato',
    role: 'Cornaredo',
    text: 'Professionalità e disponibilità. Francesco è sempre presente quando serve.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Cliente Verificato',
    role: 'Cornaredo',
    text: 'Ottimo servizio, prezzi competitivi e assistenza rapida.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Cliente Verificato',
    role: 'Cornaredo',
    text: 'Consiglio vivamente. Finalmente un\'agenzia che ascolta le esigenze del cliente.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Cliente Verificato',
    role: 'Cornaredo',
    text: 'Esperienza positiva dall\'inizio alla fine. Molto soddisfatto.',
    rating: 5,
  },
]

export default AGENCY

