import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatPrice, calcDiscount } from '../utils/helpers'
import StarRating from '../components/StarRating'
import ProductImage from '../components/ProductImage'

export default function CartPage() {
  const { cartDetails, subtotal, updateQty, removeItem } = useCart()

  const delivery = subtotal > 500 ? 0 : 40
  const total = subtotal + delivery

  if (cartDetails.length === 0) {
    return (
      <div className="cart-page empty">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your ShopNest Cart is empty</h2>
          <p>Your shopping cart is waiting. Give it purpose — fill it with groceries, clothing, electronics and more.</p>
          <Link to="/" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-layout">
        <div className="cart-items">
          <h1>Shopping Cart</h1>
          <p className="cart-count">Price ({cartDetails.length} items)</p>

          {cartDetails.map(item => {
            const off = calcDiscount(item.price, item.mrp)
            return (
              <div key={item.id} className="cart-item">
                <Link to={`/product/${item.id}`} className="cart-item-img">
                  <ProductImage src={item.image} alt={item.title} category={item.category} />
                </Link>
                <div className="cart-item-info">
                  <Link to={`/product/${item.id}`} className="cart-item-title">
                    {item.title}
                  </Link>
                  {item.inStock
                    ? <span className="in-stock">In Stock</span>
                    : <span className="out-stock">Out of Stock</span>
                  }
                  {item.prime && <span className="prime-tag"><span className="prime-logo">prime</span> Eligible</span>}
                  <StarRating rating={item.rating} size="sm" />

                  <div className="cart-item-actions">
                    <div className="qty-control">
                      <label>Qty:</label>
                      <select
                        value={item.qty}
                        onChange={e => updateQty(item.id, Number(e.target.value))}
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                    <span className="action-divider">|</span>
                    <button className="text-btn" onClick={() => removeItem(item.id)}>Delete</button>
                    <span className="action-divider">|</span>
                    <button className="text-btn">Save for later</button>
                  </div>
                </div>
                <div className="cart-item-price">
                  <span className="price-current">{formatPrice(item.price * item.qty)}</span>
                  {off > 0 && (
                    <span className="price-mrp">{formatPrice(item.mrp * item.qty)}</span>
                  )}
                </div>
              </div>
            )
          })}

          <div className="cart-subtotal-line">
            Subtotal ({cartDetails.reduce((s, i) => s + i.qty, 0)} items):
            <strong>{formatPrice(subtotal)}</strong>
          </div>
        </div>

        <aside className="cart-summary">
          <div className="summary-card">
            {subtotal > 500 && (
              <p className="free-delivery-msg">✓ Your order qualifies for FREE Delivery</p>
            )}
            <p className="summary-total">
              Subtotal ({cartDetails.reduce((s, i) => s + i.qty, 0)} items):
              <strong>{formatPrice(subtotal)}</strong>
            </p>
            <Link to="/checkout" className="btn-checkout">
              Proceed to Buy
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
