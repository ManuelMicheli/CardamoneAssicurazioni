import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

const CountUp = ({ end, duration = 2000, suffix = '', prefix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })
  const countRef = useRef(null)

  useEffect(() => {
    if (inView) {
      let startTime = null
      const startValue = 0

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = startValue + (end - startValue) * easeOutQuart

        setCount(currentValue)

        if (progress < 1) {
          countRef.current = requestAnimationFrame(animate)
        }
      }

      countRef.current = requestAnimationFrame(animate)

      return () => {
        if (countRef.current) {
          cancelAnimationFrame(countRef.current)
        }
      }
    }
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default CountUp

