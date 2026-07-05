'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const images = [
  { src: '/hero-products.png', alt: 'SRI BLOOM Complete Set', href: '/products/complete-ritual-set' },
  { src: '/serum.png', alt: 'Botanical Glow Serum', href: '/products/botanical-glow-serum' },
  { src: '/day-cream.png', alt: 'Luminance Day Cream', href: '/products/luminance-day-cream' },
]

export default function HeroImageSlider() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotate disabled because it's now interactive, but let's keep a slow auto-rotation
  // just so it feels alive. If they click, we handle it explicitly.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const handleCardClick = (index: number) => {
    if (index === currentIndex) {
      // Front card clicked -> navigate
      router.push(images[index].href)
    } else {
      // Background card clicked -> bring to front
      setCurrentIndex(index)
    }
  }

  return (
    <>
      {images.map((img, i) => {
        // Calculate relative position in the stack (0 = front, 1 = right, 2 = left for 3 items)
        const diff = (i - currentIndex + images.length) % images.length

        let transform = ''
        let opacity = 1
        let zIndex = 1

        if (diff === 0) {
          // Front
          transform = 'translateX(0) scale(1) rotate(0deg)'
          zIndex = 30
          opacity = 1
        } else if (diff === 1) {
          // Right/Next
          transform = 'translateX(30px) scale(0.9) rotate(5deg)'
          zIndex = 20
          opacity = 0.8
        } else {
          // Left/Prev (or just diff === 2)
          transform = 'translateX(-30px) scale(0.9) rotate(-5deg)'
          zIndex = 10
          opacity = 0.6
        }

        return (
          <div
            key={img.src}
            onClick={() => handleCardClick(i)}
            style={{
              position: 'absolute',
              inset: 0,
              transform,
              zIndex,
              opacity,
              transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
              cursor: 'pointer',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: diff === 0 ? '0 10px 40px rgba(0,0,0,0.5)' : 'none',
              border: '1px solid var(--color-border-hover)',
              background: 'var(--color-surface)',
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              style={{ objectFit: 'cover' }}
              priority={i === 0}
            />
          </div>
        )
      })}
    </>
  )
}
