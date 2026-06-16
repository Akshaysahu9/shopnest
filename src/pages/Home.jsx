import { Link } from 'react-router-dom'

import HeroCarousel from '../components/HeroCarousel'

import ProductCard from '../components/ProductCard'

import ProductRow from '../components/ProductRow'

import CategoryStrip from '../components/CategoryStrip'

import TrustBar from '../components/TrustBar'

import Reveal from '../components/Reveal'

import FlashTimer from '../components/FlashTimer'

import { HomeSkeleton } from '../components/LoadingSkeleton'

import { CATEGORIES } from '../data/products'

import { useProducts } from '../hooks/useProducts'

import { formatPrice, calcDiscount } from '../utils/helpers'
import ProductImage from '../components/ProductImage'



function dealClaimed(id) {

  const n = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)

  return 55 + (n % 40)

}



export default function Home() {

  const { products, loading, offline } = useProducts({ limit: 100 })



  if (loading) {

    return (

      <>

        <div className="page-loading-bar" aria-hidden="true" />

        <HomeSkeleton />

      </>

    )

  }



  const bestsellers = products.filter(p => p.badge === 'Bestseller').slice(0, 6)

  const trending = products.filter(p => p.rating >= 4.5).slice(0, 6)

  const under1000 = products.filter(p => p.price < 1000).slice(0, 6)

  const flashDeals = [...products]

    .filter(p => p.mrp > p.price)

    .sort((a, b) => calcDiscount(b.price, b.mrp) - calcDiscount(a.price, a.mrp))

    .slice(0, 4)



  return (

    <div className="home-page">

      {offline && (

        <div className="offline-banner">

          Demo mode — catalog loaded locally. Sign in & orders need backend running.

        </div>

      )}



      <HeroCarousel />

      <TrustBar />

      <CategoryStrip />



      <Reveal className="home-grid stagger-children">

        {CATEGORIES.slice(0, 4).map(cat => {

          const catProducts = products.filter(p => p.category === cat.slug).slice(0, 4)

          return (

            <section key={cat.slug} className="home-panel">

              <div className="panel-head">

                <h2>{cat.label}</h2>

                <span className="panel-icon">{cat.icon}</span>

              </div>

              <div className="panel-products">

                {catProducts.map(p => (

                  <Link key={p.id} to={`/product/${p.id}`} className="panel-item">

                    <div className="panel-img-wrap">

                      <ProductImage src={p.image} alt={p.title} category={p.category} />

                    </div>

                    <span>{p.title.slice(0, 32)}...</span>

                  </Link>

                ))}

              </div>

              <Link to={`/category/${cat.slug}`} className="panel-link">Explore {cat.label} →</Link>

            </section>

          )

        })}

      </Reveal>



      {flashDeals.length > 0 && (

        <Reveal className="flash-deals" delay={100}>

          <div className="flash-head">

            <div>

              <span className="flash-label">⚡ Lightning Deals</span>

              <h2>Ends tonight — grab fast</h2>

              <FlashTimer />

            </div>

            <Link to="/deals" className="flash-link">See all deals</Link>

          </div>

          <div className="flash-grid">

            {flashDeals.map(p => {

              const off = calcDiscount(p.price, p.mrp)

              const claimed = dealClaimed(p.id)

              return (

                <Link key={p.id} to={`/product/${p.id}`} className="flash-item">

                  <span className="flash-off">{off}% off</span>

                  <ProductImage src={p.image} alt={p.title} category={p.category} />

                  <p className="flash-title">{p.title.slice(0, 40)}...</p>

                  <div className="flash-price">

                    <strong>{formatPrice(p.price)}</strong>

                    <s>{formatPrice(p.mrp)}</s>

                  </div>

                  <div className="deal-progress" aria-hidden="true">

                    <div className="deal-progress-fill" style={{ width: `${claimed}%` }} />

                  </div>

                  <p className="deal-progress-label">{claimed}% claimed</p>

                </Link>

              )

            })}

          </div>

        </Reveal>

      )}



      <ProductRow products={bestsellers} title="Bestsellers" linkTo="/category/electronics" />

      <ProductRow products={trending} title="Top Rated by Customers" delay={80} />

      <ProductRow products={under1000} title="Budget Picks — Under ₹1,000" linkTo="/deals" linkLabel="More deals" delay={120} />



      <Reveal className="promo-banner" delay={80}>

        <div className="promo-inner">

          <div className="promo-text">

            <span className="promo-badge">NEW</span>

            <h3>ShopNest Plus Membership</h3>

            <p>Free fast delivery on millions of items, exclusive deals & early sale access</p>

            <ul className="promo-perks">

              <li>✓ Free delivery</li>

              <li>✓ Extra 10% off on deals</li>

              <li>✓ Priority support</li>

            </ul>

          </div>

          <div className="promo-action">

            <span className="promo-price">₹149<span>/month</span></span>

            <button type="button" className="btn-primary">Start free trial</button>

          </div>

        </div>

      </Reveal>

    </div>

  )

}


