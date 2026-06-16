import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { orderApi } from '../services/api'
import { formatPrice } from '../utils/helpers'
import ProductImage from '../components/ProductImage'

export default function CheckoutPage() {
  const { cartDetails, subtotal, clearCart } = useCart()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [placed, setPlaced] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const delivery = subtotal > 500 ? 0 : 40
  const total = subtotal + delivery

  const [form, setForm] = useState({
    name: '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
    payment: 'upi',
  })

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handlePlaceOrder(e) {
    e.preventDefault()
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/checkout' } })
      return
    }
    if (!form.name || !form.address || !form.pincode) return

    setSubmitting(true)
    setError('')
    try {
      const res = await orderApi.create({
        shippingAddress: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
        paymentMethod: form.payment,
      })
      setPlaced(res.order)
      clearCart()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!isLoggedIn && !placed) {
    return (
      <div className="page-empty">
        <h2>Sign in to checkout</h2>
        <p>Your cart is saved. Sign in to complete your order.</p>
        <Link to="/login" state={{ from: '/checkout' }} className="btn-primary">Sign in</Link>
      </div>
    )
  }

  if (cartDetails.length === 0 && !placed) {
    return (
      <div className="page-empty">
        <h2>Nothing to checkout</h2>
        <Link to="/">Go shopping</Link>
      </div>
    )
  }

  if (placed) {
    return (
      <div className="order-success">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with ShopNest.</p>
          <p className="order-id">Order ID: {placed.orderNumber}</p>
          <p>Total paid: {formatPrice(placed.total)}</p>
          <p>Estimated delivery: 2-3 business days</p>
          <div className="success-actions">
            <Link to="/orders" className="btn-secondary">View Orders</Link>
            <button className="btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-steps">
        <span className={step >= 1 ? 'active' : ''}>1. Address</span>
        <span className={step >= 2 ? 'active' : ''}>2. Payment</span>
        <span className={step >= 3 ? 'active' : ''}>3. Review</span>
      </div>

      {error && <div className="page-error">{error}</div>}

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          {step === 1 && (
            <section className="form-section">
              <h2>Delivery Address</h2>
              <div className="form-row">
                <label>
                  Full Name
                  <input type="text" value={form.name} onChange={e => update('name', e.target.value)} required />
                </label>
                <label>
                  Phone Number
                  <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} />
                </label>
              </div>
              <label>
                Address
                <textarea value={form.address} onChange={e => update('address', e.target.value)} rows={3} required />
              </label>
              <div className="form-row three">
                <label>
                  Pincode
                  <input type="text" value={form.pincode} onChange={e => update('pincode', e.target.value)} required />
                </label>
                <label>
                  City
                  <input type="text" value={form.city} onChange={e => update('city', e.target.value)} />
                </label>
                <label>
                  State
                  <input type="text" value={form.state} onChange={e => update('state', e.target.value)} />
                </label>
              </div>
              <button type="button" className="btn-primary" onClick={() => setStep(2)}>Deliver to this address</button>
            </section>
          )}

          {step === 2 && (
            <section className="form-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                {[
                  { id: 'upi', label: 'UPI (GPay, PhonePe, Paytm)' },
                  { id: 'card', label: 'Credit / Debit Card' },
                  { id: 'cod', label: 'Cash on Delivery' },
                  { id: 'netbanking', label: 'Net Banking' },
                ].map(opt => (
                  <label key={opt.id} className="payment-option">
                    <input type="radio" name="payment" value={opt.id} checked={form.payment === opt.id} onChange={() => update('payment', opt.id)} />
                    {opt.label}
                  </label>
                ))}
              </div>
              <div className="form-nav">
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}>Back</button>
                <button type="button" className="btn-primary" onClick={() => setStep(3)}>Continue</button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="form-section">
              <h2>Review Your Order</h2>
              <div className="review-address">
                <h4>Delivering to {form.name}</h4>
                <p>{form.address}, {form.city} {form.pincode}</p>
                <p>Phone: {form.phone || '—'}</p>
              </div>
              <p>Payment: <strong>{form.payment.toUpperCase()}</strong></p>

              <div className="review-items">
                {cartDetails.map(item => (
                  <div key={item.id} className="review-item">
                    <ProductImage src={item.image} alt={item.title} category={item.category} />
                    <span>{item.title.slice(0, 40)}...</span>
                    <span>Qty: {item.qty}</span>
                    <span>{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="form-nav">
                <button type="button" className="btn-secondary" onClick={() => setStep(2)}>Back</button>
                <button type="submit" className="btn-checkout" disabled={submitting}>
                  {submitting ? 'Placing order...' : 'Place your order'}
                </button>
              </div>
            </section>
          )}
        </form>

        <aside className="checkout-summary">
          <h3>Order Summary</h3>
          {cartDetails.map(item => (
            <div key={item.id} className="summary-item">
              <ProductImage src={item.image} alt={item.title} category={item.category} />
              <span className="summary-qty">{item.qty}</span>
            </div>
          ))}
          <hr />
          <div className="summary-line"><span>Items:</span><span>{formatPrice(subtotal)}</span></div>
          <div className="summary-line"><span>Delivery:</span><span>{delivery === 0 ? 'FREE' : formatPrice(delivery)}</span></div>
          <div className="summary-line total"><span>Order Total:</span><span>{formatPrice(total)}</span></div>
        </aside>
      </div>
    </div>
  )
}
