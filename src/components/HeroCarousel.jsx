import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const SLIDE_MS = 5500

const slides = [
  {
    id: 1,
    tag: 'Limited Time',
    title: 'Electronics Mega Sale',
    subtitle: 'Headphones, laptops & gadgets — up to 40% off',
    cta: 'Shop Electronics',
    link: '/category/electronics',
    bg: 'linear-gradient(105deg, #0f172a 0%, #1e3a5f 45%, #2563eb 100%)',
    img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    tag: 'New Season',
    title: 'Fashion Fest 2026',
    subtitle: 'Trending styles from top brands starting ₹499',
    cta: 'Explore Fashion',
    link: '/category/fashion',
    bg: 'linear-gradient(105deg, #1a0a12 0%, #4a1942 50%, #9d174d 100%)',
    img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    tag: 'Home & Living',
    title: 'Upgrade Your Space',
    subtitle: 'Kitchen appliances & home essentials on deal',
    cta: 'Shop Home',
    link: '/category/home',
    bg: 'linear-gradient(105deg, #0a1f16 0%, #14532d 50%, #059669 100%)',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    tag: 'Today Only',
    title: 'Flash Deals',
    subtitle: 'Grab them before midnight — prices won\'t last',
    cta: 'View All Deals',
    link: '/deals',
    bg: 'linear-gradient(105deg, #1c0a00 0%, #7c2d12 50%, #ea580c 100%)',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop',
  },
]

export default function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [progressKey, setProgressKey] = useState(0)

  const go = useCallback((dir) => {
    setActive(i => (i + dir + slides.length) % slides.length)
    setProgressKey(k => k + 1)
  }, [])

  const goTo = useCallback((i) => {
    setActive(i)
    setProgressKey(k => k + 1)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(i => (i + 1) % slides.length)
      setProgressKey(k => k + 1)
    }, SLIDE_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-carousel">
      <div className="hero-slides">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero-slide ${i === active ? 'hero-slide--active' : ''}`}
            style={{ background: slide.bg }}
            aria-hidden={i !== active}
          >
            <div className="hero-content">
              <span className="hero-tag">{slide.tag}</span>
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <Link to={slide.link} className="hero-cta">{slide.cta} →</Link>
            </div>
            <div className="hero-img-wrap">
              <img src={slide.img} alt="" className="hero-img" />
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="hero-arrow hero-arrow--left" onClick={() => go(-1)} aria-label="Previous">‹</button>
      <button type="button" className="hero-arrow hero-arrow--right" onClick={() => go(1)} aria-label="Next">›</button>

      <div className="hero-dots">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={i === active ? 'active' : ''}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="hero-progress" aria-hidden="true">
        <div
          key={progressKey}
          className="hero-progress-bar"
          style={{ '--slide-duration': `${SLIDE_MS}ms` }}
        />
      </div>
    </section>
  )
}
