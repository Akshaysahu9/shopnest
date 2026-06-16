export default function TrustBar() {
  const items = [
    { icon: '🚚', title: 'Free Delivery', sub: 'On orders above ₹500' },
    { icon: '🔒', title: 'Secure Payments', sub: '100% protected checkout' },
    { icon: '↩️', title: 'Easy Returns', sub: '7-day return policy' },
    { icon: '⭐', title: 'Top Rated', sub: 'Verified product reviews' },
  ]

  return (
    <section className="trust-bar">
      <div className="trust-bar-inner">
        {items.map(item => (
          <div key={item.title} className="trust-item">
            <span className="trust-icon">{item.icon}</span>
            <div>
              <strong>{item.title}</strong>
              <span>{item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
