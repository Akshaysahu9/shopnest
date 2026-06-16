import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function ProductRow({ products, title, linkTo, linkLabel = 'See all', delay = 0 }) {
  const rowRef = useRef(null)

  function scroll(dir) {
    rowRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  if (!products?.length) return null

  return (
    <Reveal as="section" className="product-section" delay={delay}>
      <div className="section-head">
        <h2>{title}</h2>
        {linkTo && <Link to={linkTo}>{linkLabel}</Link>}
      </div>
      <div className="product-row-wrap">
        <button type="button" className="row-arrow row-arrow--left" onClick={() => scroll(-1)} aria-label="Scroll left">‹</button>
        <div className="product-row" ref={rowRef}>
          {products.map(p => <ProductCard key={p.id} product={p} compact />)}
        </div>
        <button type="button" className="row-arrow row-arrow--right" onClick={() => scroll(1)} aria-label="Scroll right">›</button>
      </div>
    </Reveal>
  )
}
