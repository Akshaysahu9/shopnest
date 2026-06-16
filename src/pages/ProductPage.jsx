import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProduct } from '../hooks/useProducts'
import { useCart } from '../hooks/useCart'
import { formatPrice, calcDiscount } from '../utils/helpers'
import StarRating from '../components/StarRating'
import ProductCard from '../components/ProductCard'
import ProductImage from '../components/ProductImage'

export default function ProductPage() {
  const { id } = useParams()
  const { product, related, loading, error } = useProduct(id)
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [imgIdx, setImgIdx] = useState(0)

  if (loading) return <div className="page-loading">Loading product...</div>

  if (error || !product) {
    return (
      <div className="page-empty">
        <h2>{error || 'Product not found'}</h2>
        <Link to="/">Back to home</Link>
      </div>
    )
  }

  const discount = calcDiscount(product.price, product.mrp)
  const images = product.images?.length ? product.images : [product.image]

  const fakeReviews = [
    { name: 'Rahul M.', rating: 5, date: '12 Jan 2026', text: 'Exactly as described. Fast delivery and great packaging.' },
    { name: 'Priya S.', rating: 4, date: '3 Feb 2026', text: 'Good quality for the price. Would recommend to friends.' },
    { name: 'Amit K.', rating: 5, date: '28 Dec 2025', text: 'Been using for 2 months now — no complaints at all.' },
  ]

  return (
    <div className="product-page">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to={`/category/${product.category}`}>{product.category}</Link>
        <span>›</span>
        <span>{product.title.slice(0, 50)}...</span>
      </nav>

      <div className="product-layout">
        <div className="product-gallery">
          <div className="gallery-thumbs">
            {images.map((img, i) => (
              <button key={i} className={i === imgIdx ? 'active' : ''} onClick={() => setImgIdx(i)}>
                <ProductImage src={img} alt="" category={product.category} />
              </button>
            ))}
          </div>
          <div className="gallery-main">
            <ProductImage src={images[imgIdx]} alt={product.title} category={product.category} />
          </div>
        </div>

        <div className="product-details">
          <h1>{product.title}</h1>
          <StarRating rating={product.rating} count={product.reviews} />
          <hr className="divider" />

          <div className="price-block">
            {discount > 0 && <span className="discount-label">-{discount}%</span>}
            <span className="price-big">{formatPrice(product.price)}</span>
            {product.mrp > product.price && (
              <span className="price-strike">M.R.P.: <s>{formatPrice(product.mrp)}</s></span>
            )}
          </div>
          <p className="tax-note">Inclusive of all taxes</p>

          {product.prime && (
            <div className="delivery-box">
              <span className="prime-logo">prime</span>
              <span>FREE delivery <strong>{product.delivery}</strong></span>
            </div>
          )}

          <p className="stock-status">{product.inStock ? '✓ In Stock' : 'Out of Stock'}</p>

          <div className="qty-row">
            <label>Qty:</label>
            <select value={qty} onChange={e => setQty(Number(e.target.value))}>
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div className="action-btns">
            <button className="btn-cart" onClick={() => addItem(product.id, qty)} disabled={!product.inStock}>
              Add to Cart
            </button>
            <Link to="/checkout" className="btn-buy">Buy Now</Link>
          </div>

          <div className="seller-info">
            <p>Ships from <strong>ShopNest</strong></p>
            <p>Sold by <a href="#">ShopNest Retail</a></p>
          </div>
        </div>

        <aside className="product-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-price">{formatPrice(product.price)}</div>
            <p className="sidebar-delivery">FREE delivery {product.delivery}</p>
            <p className="sidebar-stock">{product.inStock ? 'In Stock' : 'Unavailable'}</p>
            <button className="btn-cart full" onClick={() => addItem(product.id, qty)}>Add to Cart</button>
            <Link to="/checkout" className="btn-buy full">Buy Now</Link>
          </div>
        </aside>
      </div>

      <section className="product-about">
        <h2>About this item</h2>
        <p>{product.description}</p>
        <ul>{product.features?.map(f => <li key={f}>{f}</li>)}</ul>
      </section>

      {product.specs && (
        <section className="product-specs">
          <h2>Technical Details</h2>
          <table>
            <tbody>
              {Object.entries(product.specs).map(([k, v]) => (
                <tr key={k}><th>{k}</th><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="product-reviews">
        <h2>Customer Reviews</h2>
        <div className="reviews-summary">
          <span className="big-rating">{product.rating}</span>
          <StarRating rating={product.rating} count={product.reviews} />
        </div>
        {fakeReviews.map((r, i) => (
          <div key={i} className="review-item">
            <div className="review-head">
              <span className="reviewer">{r.name}</span>
              <StarRating rating={r.rating} size="sm" />
            </div>
            <span className="review-date">{r.date}</span>
            <p>{r.text}</p>
          </div>
        ))}
      </section>

      {related.length > 0 && (
        <section className="product-section">
          <h2>Customers also viewed</h2>
          <div className="product-row">
            {related.map(p => <ProductCard key={p.id} product={p} compact />)}
          </div>
        </section>
      )}
    </div>
  )
}
