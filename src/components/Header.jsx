import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { CATEGORIES } from '../data/products'

export default function Header() {
  const { cartCount } = useCart()
  const { user, logout, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [badgePop, setBadgePop] = useState(false)
  const prevCount = useRef(cartCount)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (cartCount > prevCount.current) {
      setBadgePop(true)
      const t = setTimeout(() => setBadgePop(false), 500)
      prevCount.current = cartCount
      return () => clearTimeout(t)
    }
    prevCount.current = cartCount
  }, [cartCount])

  function handleSearch(e) {
    e.preventDefault()
    const q = search.trim()
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="header-location">
        <div className="location-inner">
          <span className="loc-icon">📍</span>
          <span>Deliver to <strong>India</strong></span>
        </div>
      </div>
      <div className="header-top">
        <div className="header-inner">
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>

          <Link to="/" className="logo">
            <span className="logo-icon">🛍</span>
            <span className="logo-text">ShopNest</span>
          </Link>

          <form className="search-form" onSubmit={handleSearch}>
            <select className="search-cat" defaultValue="all" aria-label="Category">
              <option value="all">All</option>
              {CATEGORIES.map(c => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
            <input
              type="search"
              placeholder="Search ShopNest"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
            </button>
          </form>

          <div className="header-actions">
            {isLoggedIn ? (
              <div className="header-action account-menu">
                <span className="action-line1">Hello, {user.name.split(' ')[0]}</span>
                <span className="action-line2">Account ▾</span>
                <div className="account-dropdown">
                  <Link to="/orders">Your Orders</Link>
                  <button onClick={logout}>Sign Out</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="header-action">
                <span className="action-line1">Hello, sign in</span>
                <span className="action-line2">Account & Lists ▾</span>
              </Link>
            )}

            <Link to="/orders" className="header-action">
              <span className="action-line1">Returns</span>
              <span className="action-line2">& Orders</span>
            </Link>

            <Link to="/cart" className="header-cart">
              <span className="cart-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6h15l-1.5 9h-12z" />
                  <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                  <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                  <path d="M6 6L5 3H2" />
                </svg>
                {cartCount > 0 && (
                  <span className={`cart-badge ${badgePop ? 'cart-badge--pop' : ''}`}>{cartCount}</span>
                )}
              </span>
              <span className="cart-label">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        <div className="nav-inner">
          <button className="nav-all" onClick={() => setMenuOpen(!menuOpen)}>☰ All</button>
          {CATEGORIES.map(c => (
            <Link key={c.slug} to={`/category/${c.slug}`} onClick={() => setMenuOpen(false)}>{c.label}</Link>
          ))}
          <Link to="/deals" className="nav-deals">Today's Deals</Link>
          <span className="nav-prime">ShopNest<span>Plus</span></span>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)}>
          <aside className="side-menu" onClick={e => e.stopPropagation()}>
            <div className="side-menu-head">
              <span>👤 Hello, {isLoggedIn ? user.name.split(' ')[0] : 'Guest'}</span>
            </div>
            <div className="side-menu-body">
              {!isLoggedIn && <Link to="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>}
              {isLoggedIn && <button className="side-link-btn" onClick={() => { logout(); setMenuOpen(false) }}>Sign Out</button>}
              <hr />
              <p className="side-label">Shop by Category</p>
              {CATEGORIES.map(c => (
                <Link key={c.slug} to={`/category/${c.slug}`} onClick={() => setMenuOpen(false)}>
                  {c.icon} {c.label}
                </Link>
              ))}
              <hr />
              <Link to="/orders" onClick={() => setMenuOpen(false)}>📦 Your Orders</Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>🛒 Cart ({cartCount})</Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  )
}
