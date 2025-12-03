# Cardamone Assicurazioni - Sito Web Premium

Sito web moderno e professionale per Cardamone Assicurazioni, sviluppato con React, Tailwind CSS e Framer Motion.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC)

## ✨ Caratteristiche

- **Design Premium** - Interfaccia moderna con palette colori professionale
- **Animazioni Fluide** - Scroll parallax, fade-in, hover effects con Framer Motion
- **Responsive** - Mobile-first design ottimizzato per tutti i dispositivi
- **Performance** - Lazy loading, code splitting, ottimizzazioni SEO
- **Form Validati** - Form contatto con validazione in tempo reale
- **WhatsApp Integration** - Pulsante flottante per contatto rapido

## 🚀 Quick Start

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Preview build di produzione
npm run preview
```

## 📁 Struttura Progetto

```
cardamone-assicurazioni/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── home/           # Componenti homepage
│   │   │   ├── HeroSection.jsx
│   │   │   ├── StatsSection.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── WhyUsSection.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   ├── PartnersSection.jsx
│   │   │   ├── FAQSection.jsx
│   │   │   └── CTASection.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── AnimatedSection.jsx
│   │   ├── CountUp.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── WhatsAppButton.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ServiziPage.jsx
│   │   ├── ChiSiamoPage.jsx
│   │   └── ContattiPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎨 Design System

### Colori

| Colore | HEX | Uso |
|--------|-----|-----|
| Primary | `#1E3A8A` | Colore principale, fiducia |
| Secondary | `#F59E0B` | Accento premium, CTA |
| Accent | `#10B981` | Successo, sicurezza |

### Font

- **Display**: Playfair Display (titoli)
- **Sans**: DM Sans (corpo testo)

### Componenti

- `btn-primary` - Pulsante principale blu
- `btn-secondary` - Pulsante secondario outline
- `btn-gold` - Pulsante oro premium
- `card-elevated` - Card con ombra
- `section-padding` - Padding sezioni standard

## 📱 Pagine

### Homepage
- Hero con parallax e badge rating
- Statistiche animate (clienti, rating, anni)
- Servizi in cards interattive
- Sezione "Perché Sceglierci"
- Carosello testimonial
- Partner assicurativi
- FAQ accordion
- CTA finale

### Servizi
- Lista dettagliata servizi
- Features per ogni categoria
- Immagini rappresentative
- CTA preventivo

### Chi Siamo
- Storia aziendale
- Mission e Vision
- Valori aziendali
- Timeline interattiva
- Team members

### Contatti
- Form con validazione
- Info contatto
- Orari apertura
- Mappa Google integrata
- Link WhatsApp

## 🛠️ Tecnologie

- **React 18** - UI Library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animazioni
- **React Router** - Routing
- **Lucide React** - Icone
- **React Intersection Observer** - Scroll detection

## 📈 Performance

- Page Speed Score: > 90
- First Contentful Paint: < 1.5s
- Lazy loading immagini
- Code splitting automatico

## 🔧 Configurazione

### Modificare contatti

Aggiorna i dati di contatto in:
- `src/components/Header.jsx`
- `src/components/Footer.jsx`
- `src/pages/ContattiPage.jsx`
- `src/components/WhatsAppButton.jsx`

### Modificare servizi

I servizi sono definiti in:
- `src/components/home/ServicesSection.jsx`
- `src/pages/ServiziPage.jsx`

### Modificare team

Il team è definito in:
- `src/pages/ChiSiamoPage.jsx`

## 📝 TODO - Fasi Future

### Fase 2
- [ ] Blog/News section
- [ ] Analytics integration
- [ ] Cookie banner GDPR
- [ ] Form backend integration

### Fase 3
- [ ] Area clienti con login
- [ ] Comparatore preventivi
- [ ] Chat integration
- [ ] Booking appuntamenti

## 📄 Licenza

© 2024 Cardamone Assicurazioni. Tutti i diritti riservati.

