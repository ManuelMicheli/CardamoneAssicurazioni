import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

/**
 * InteractiveBackground - Sfondo interattivo che reagisce allo scroll
 * 
 * Props:
 * @param {string} variant - 'particles' | 'blobs' | 'grid' | 'waves' | 'geometric'
 * @param {string} color - 'primary' | 'secondary' | 'neutral' | 'gradient'
 * @param {number} intensity - 0-1, intensità dell'animazione
 */
const InteractiveBackground = ({ 
  variant = 'particles', 
  color = 'primary',
  intensity = 0.5 
}) => {
  const containerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.1 })

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Track scroll progress within section
  useEffect(() => {
    if (!containerRef.current || !inView) return

    const handleScroll = () => {
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height
      
      // Calculate progress: 0 when section enters viewport, 1 when fully scrolled past
      const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [inView])

  // Track mouse position for interactive effects
  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      })
    }

    containerRef.current.addEventListener('mousemove', handleMouseMove)
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  // Color palette
  const colors = {
    primary: {
      light: 'rgba(37, 99, 235, 0.1)',
      medium: 'rgba(37, 99, 235, 0.2)',
      dark: 'rgba(30, 58, 138, 0.15)',
      gradient: 'from-primary-500/10 via-primary-400/5 to-primary-600/10'
    },
    secondary: {
      light: 'rgba(245, 158, 11, 0.1)',
      medium: 'rgba(245, 158, 11, 0.15)',
      dark: 'rgba(217, 119, 6, 0.1)',
      gradient: 'from-secondary-500/10 via-secondary-400/5 to-secondary-600/10'
    },
    neutral: {
      light: 'rgba(100, 116, 139, 0.08)',
      medium: 'rgba(100, 116, 139, 0.12)',
      dark: 'rgba(71, 85, 105, 0.1)',
      gradient: 'from-neutral-400/5 via-neutral-300/3 to-neutral-500/5'
    },
    gradient: {
      light: 'rgba(37, 99, 235, 0.1)',
      medium: 'rgba(245, 158, 11, 0.1)',
      dark: 'rgba(30, 58, 138, 0.15)',
      gradient: 'from-primary-500/10 via-secondary-400/8 to-primary-600/10'
    }
  }

  const palette = colors[color] || colors.primary

  // Variant: Particles - Particelle animate che seguono lo scroll
  const ParticlesVariant = () => {
    // Riduci particelle su mobile per performance
    const particleCount = isMobile ? 10 : 20
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 0.5 + 0.2,
      delay: Math.random() * 2
    }))

    return (
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: palette.light,
              transform: `translate(${isMobile ? 0 : (mousePosition.x - 0.5) * 20}px, ${isMobile ? scrollProgress * 50 : (mousePosition.y - 0.5) * 20 + scrollProgress * 100}px)`,
              opacity: intensity * (0.3 + Math.sin(scrollProgress * Math.PI * 2 + particle.delay) * 0.2),
              transition: isMobile ? 'opacity 0.3s ease-out' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
              willChange: isMobile ? 'opacity' : 'transform, opacity'
            }}
          />
        ))}
      </div>
    )
  }

  // Variant: Blobs - Forme organiche animate
  const BlobsVariant = () => {
    // Riduci blob su mobile
    const blobCount = isMobile ? 2 : 3
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Blob 1 */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: isMobile ? '250px' : '400px',
            height: isMobile ? '250px' : '400px',
            background: `radial-gradient(circle, ${palette.medium} 0%, transparent 70%)`,
            top: `${20 + scrollProgress * 20}%`,
            left: isMobile ? '5%' : `${10 + mousePosition.x * 10}%`,
            transform: `scale(${1 + scrollProgress * 0.3})`,
            opacity: intensity * (isMobile ? 0.4 : 0.6),
            transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
            willChange: 'transform'
          }}
        />
        {/* Blob 2 */}
        {blobCount >= 2 && (
          <div
            className="absolute rounded-full blur-3xl"
            style={{
              width: isMobile ? '200px' : '300px',
              height: isMobile ? '200px' : '300px',
              background: `radial-gradient(circle, ${palette.light} 0%, transparent 70%)`,
              bottom: `${15 + scrollProgress * 15}%`,
              right: isMobile ? '5%' : `${15 + (1 - mousePosition.x) * 10}%`,
              transform: `scale(${1 + scrollProgress * 0.2}) rotate(${scrollProgress * 45}deg)`,
              opacity: intensity * (isMobile ? 0.3 : 0.5),
              transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
              willChange: 'transform'
            }}
          />
        )}
        {/* Blob 3 - Solo desktop */}
        {blobCount >= 3 && !isMobile && (
          <div
            className="absolute rounded-full blur-3xl"
            style={{
              width: '350px',
              height: '350px',
              background: `radial-gradient(circle, ${palette.dark} 0%, transparent 70%)`,
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${0.8 + scrollProgress * 0.4}) rotate(${scrollProgress * -30}deg)`,
              opacity: intensity * 0.4,
              transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
              willChange: 'transform'
            }}
          />
        )}
      </div>
    )
  }

  // Variant: Grid - Griglia animata che si muove con lo scroll
  const GridVariant = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${palette.light} 1px, transparent 1px),
              linear-gradient(to bottom, ${palette.light} 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? '40px 40px' : '60px 60px',
            transform: `translate(${scrollProgress * (isMobile ? 20 : 30)}px, ${scrollProgress * (isMobile ? 20 : 30)}px)`,
            opacity: intensity * (isMobile ? 0.25 : 0.4),
            transition: 'transform 0.1s linear',
            willChange: 'transform'
          }}
        />
        {/* Overlay gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${palette.gradient}`}
          style={{
            opacity: intensity * 0.3,
            mixBlendMode: 'multiply'
          }}
        />
      </div>
    )
  }

  // Variant: Waves - Onde animate
  const WavesVariant = () => {
    // Su mobile mostra solo un'onda invece di due
    const waveCount = isMobile ? 1 : 2
    return (
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          style={{
            opacity: intensity * (isMobile ? 0.3 : 0.5)
          }}
        >
          <path
            d={`M 0,100 Q ${300 + scrollProgress * (isMobile ? 100 : 200)},${80 + Math.sin(scrollProgress * Math.PI) * (isMobile ? 10 : 20)} ${600 + scrollProgress * (isMobile ? 100 : 200)},100 T 1200,100 L 1200,200 L 0,200 Z`}
            fill={palette.medium}
            style={{
              transition: prefersReducedMotion ? 'none' : 'd 0.3s ease-out',
              willChange: prefersReducedMotion ? 'auto' : 'd'
            }}
          />
          {waveCount >= 2 && (
            <path
              d={`M 0,120 Q ${400 + scrollProgress * 150},${100 + Math.cos(scrollProgress * Math.PI) * 15} ${800 + scrollProgress * 150},120 T 1200,120 L 1200,200 L 0,200 Z`}
              fill={palette.light}
              style={{
                transition: prefersReducedMotion ? 'none' : 'd 0.3s ease-out',
                willChange: prefersReducedMotion ? 'auto' : 'd'
              }}
            />
          )}
        </svg>
      </div>
    )
  }

  // Variant: Geometric - Forme geometriche animate
  const GeometricVariant = () => {
    // Su mobile mostra solo 2 forme invece di 3
    const showAll = !isMobile
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Triangle 1 */}
        <div
          className="absolute"
          style={{
            width: isMobile ? '120px' : '200px',
            height: isMobile ? '120px' : '200px',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            background: palette.medium,
            top: `${10 + scrollProgress * 10}%`,
            left: isMobile ? '5%' : `${5 + mousePosition.x * 5}%`,
            transform: `rotate(${scrollProgress * 180}deg) scale(${0.8 + scrollProgress * 0.4})`,
            opacity: intensity * (isMobile ? 0.2 : 0.3),
            transition: 'transform 0.5s ease-out',
            willChange: 'transform'
          }}
        />
        {/* Circle */}
        {showAll && (
          <div
            className="absolute rounded-full"
            style={{
              width: '150px',
              height: '150px',
              border: `2px solid ${palette.light}`,
              bottom: `${20 + scrollProgress * 15}%`,
              right: isMobile ? '5%' : `${10 + (1 - mousePosition.x) * 5}%`,
              transform: `scale(${1 + scrollProgress * 0.3})`,
              opacity: intensity * 0.4,
              transition: 'transform 0.5s ease-out',
              willChange: 'transform'
            }}
          />
        )}
        {/* Hexagon - Solo desktop */}
        {showAll && (
          <div
            className="absolute"
            style={{
              width: '120px',
              height: '120px',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              background: palette.dark,
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${scrollProgress * 360}deg) scale(${0.7 + scrollProgress * 0.5})`,
              opacity: intensity * 0.25,
              transition: 'transform 0.5s ease-out',
              willChange: 'transform'
            }}
          />
        )}
      </div>
    )
  }

  const renderVariant = () => {
    // Se l'utente preferisce motion ridotto, mostra solo un gradiente statico
    if (prefersReducedMotion) {
      return (
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${palette.light} 0%, transparent 50%, ${palette.medium} 100%)`,
            opacity: intensity * 0.2
          }}
        />
      )
    }

    switch (variant) {
      case 'particles':
        return <ParticlesVariant />
      case 'blobs':
        return <BlobsVariant />
      case 'grid':
        return <GridVariant />
      case 'waves':
        return <WavesVariant />
      case 'geometric':
        return <GeometricVariant />
      default:
        return <ParticlesVariant />
    }
  }

  return (
    <div
      ref={(node) => {
        containerRef.current = node
        if (ref) ref(node)
      }}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {renderVariant()}
    </div>
  )
}

export default InteractiveBackground

