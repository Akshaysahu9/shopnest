import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import { formatPrice, calcDiscount } from '../utils/helpers'

export default function DealsPage() {
  const { products, loading, error } = useProducts({ deals: 'true', limit: 50 })

  return (
    <div className="deals-page">
      <div className="deals-hero">
        <h1>Today's Deals</h1>
        <p>Big savings on top brands — limited time offers</p>
      </div>

      {loading && <div className="page-loading">Loading deals...</div>}
      {error && <div className="page-error">{error}</div>}

      {!loading && !error && (
        <div className="deals-grid">
          {products.map(p => {
            const off = calcDiscount(p.price, p.mrp)
            return (
              <div key={p.id} className="deal-card">
                <span className="deal-badge">{off}% OFF</span>
                <ProductCard product={p} />
                <p className="deal-savings">You save {formatPrice(p.mrp - p.price)}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
