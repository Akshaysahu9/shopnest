import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
      </button>

      <div className="footer-grid">
        <div className="footer-col">
          <h4>Get to Know Us</h4>
          <a href="#">About ShopNest</a>
          <a href="#">Careers</a>
          <a href="#">Press Releases</a>
          <a href="#">ShopNest Science</a>
        </div>
        <div className="footer-col">
          <h4>Connect with Us</h4>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
        <div className="footer-col">
          <h4>Make Money with Us</h4>
          <a href="#">Sell on ShopNest</a>
          <a href="#">Become an Affiliate</a>
          <a href="#">Advertise Your Products</a>
        </div>
        <div className="footer-col">
          <h4>Let Us Help You</h4>
          <a href="#">Your Account</a>
          <a href="#">Returns Centre</a>
          <a href="#">100% Purchase Protection</a>
          <a href="#">Help</a>
        </div>
      </div>

      <div className="footer-bottom">
        <Link to="/" className="footer-logo">ShopNest</Link>
        <div className="footer-meta">
          <button>🌐 English</button>
          <button>🇮🇳 India</button>
        </div>
        <p className="footer-copy">© 2024-2026 ShopNest.com, Inc. or its affiliates</p>
      </div>
    </footer>
  )
}
