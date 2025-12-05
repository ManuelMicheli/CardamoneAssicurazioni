import HeroSection from '../components/home/HeroSection'
import PartnersSection from '../components/home/PartnersSection'
import TargetClientsSection from '../components/home/TargetClientsSection'
import ServicesSection from '../components/home/ServicesSection'
import WhyUsSection from '../components/home/WhyUsSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import ProcessSection from '../components/home/ProcessSection'
import CTASection from '../components/home/CTASection'

// HomePage - Struttura ottimizzata per lead generation
// Ordine sezioni:
// 1. Hero - Valore locale, CTA principali
// 2. Partner - Compagnie assicurative (scrolling)
// 3. Per chi lavoriamo - Target clienti
// 4. I nostri servizi - Offerta
// 5. Perché sceglierci - Benefici
// 6. Recensioni - Social proof (scrolling)
// 7. Come funziona - Processo
// 8. CTA finale - Contatto

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <TargetClientsSection />
      <ServicesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <ProcessSection />
      <CTASection />
    </>
  )
}

export default HomePage
