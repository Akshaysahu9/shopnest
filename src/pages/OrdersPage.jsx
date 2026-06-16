import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { orderApi } from '../services/api'
import { useAuth } from '../hooks/useAuth'
import { formatPrice } from '../utils/helpers'
import ProductImage from '../components/ProductImage'

export default function OrdersPage() {
  const { isLoggedIn } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false)
      return
    }

    orderApi.list()
      .then(res => setOrders(res.orders || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [isLoggedIn])

  if (!isLoggedIn) {
    return (
      <div className="page-empty">
        <h2>Sign in to view your orders</h2>
        <Link to="/login" className="btn-primary">Sign in</Link>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>

      {loading && <div className="page-loading">Loading orders...</div>}
      {error && <div className="page-error">{error}</div>}

      {!loading && !error && orders.length === 0 && (
        <div className="page-empty">
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="btn-primary">Start shopping</Link>
        </div>
      )}

      <div className="orders-list">
        {orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-head">
              <div>
                <span className="order-label">ORDER PLACED</span>
                <span>{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
              <div>
                <span className="order-label">TOTAL</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              <div>
                <span className="order-label">ORDER #</span>
                <span>{order.orderNumber}</span>
              </div>
              <div className="order-status-badge">{order.status}</div>
            </div>
            <div className="order-items">
              {order.items?.map((item, i) => (
                <div key={i} className="order-item-row">
                  <ProductImage src={item.image} alt={item.title} category={item.category} />
                  <div>
                    <p>{item.title}</p>
                    <p className="order-qty">Qty: {item.qty}</p>
                  </div>
                  <span>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
