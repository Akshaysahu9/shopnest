import { Link } from 'react-router-dom'
import { formatPrice, calcDiscount } from '../utils/helpers'
import StarRating from './StarRating'
import ProductImage from './ProductImage'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'
import { showToast } from '../hooks/useCart'

export default function ProductCard({ product, compact, showQuickAdd }) {
  const discount = calcDiscount(product.price, product.mrp)
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const wished = has(product.id)

  function handleWish(e) {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id)
    showToast(wished ? 'Removed from wishlist' : 'Added to wishlist')
  }

  function handleQuickAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    addItem(product.id, 1)
  }

  return (
    <article className={`product-card ${compact ? 'compact' : ''}`}>
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-img-wrap">
          {product.badge && <span className="product-badge">{product.badge}</span>}
          {discount >= 20 && !product.badge && (
            <span className="product-badge deal">{discount}% OFF</span>
          )}
          <button
            type="button"
            className={`wish-btn ${wished ? 'active' : ''}`}
            onClick={handleWish}
            aria-label="Add to wishlist"
          >
            {wished ? '♥' : '♡'}
          </button>
          <ProductImage src={product.image} alt={product.title} category={product.category} />
          {(showQuickAdd !== false) && (
            <button type="button" className="quick-add-btn" onClick={handleQuickAdd}>
              Add to Cart
            </button>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <StarRating rating={product.rating} count={product.reviews} />
          <div className="product-price-row">
            <span className="price-current">{formatPrice(product.price)}</span>
            {discount > 0 && (
              <>
                <span className="price-mrp">{formatPrice(product.mrp)}</span>
                <span className="price-off">{discount}% off</span>
              </>
            )}
          </div>
          {product.prime && (
            <span className="prime-tag">
              <span className="prime-logo">prime</span> FREE delivery {product.delivery}
            </span>
          )}
        </div>
      </Link>
    </article>
  )
}
