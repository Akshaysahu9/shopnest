import { useParams } from 'react-router-dom'
import { CATEGORIES } from '../data/products'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

export default function CategoryPage() {
  const { slug } = useParams()
  const category = CATEGORIES.find(c => c.slug === slug)
  const { products, loading, error, total } = useProducts({ category: slug, limit: 50 })

  const title = category ? category.label : slug

  return (
    <div className="category-page">
      <div className="page-header">
        <h1>{title}</h1>
        <p>{loading ? 'Loading...' : `${total || products.length} results`}</p>
      </div>

      <div className="category-layout">
        <aside className="filters">
          <h3>Filter by</h3>
          <div className="filter-group">
            <h4>Price</h4>
            <label><input type="checkbox" readOnly /> Under ₹500</label>
            <label><input type="checkbox" readOnly /> ₹500 – ₹2,000</label>
            <label><input type="checkbox" readOnly /> Above ₹10,000</label>
          </div>
          <div className="filter-group">
            <h4>Delivery</h4>
            <label><input type="checkbox" defaultChecked readOnly /> Prime Eligible</label>
          </div>
        </aside>

        <div className="category-results">
          <div className="sort-bar">
            <span>Sort by:</span>
            <select defaultValue="featured" disabled>
              <option value="featured">Featured</option>
            </select>
          </div>

          {loading && <div className="page-loading">Loading...</div>}
          {error && <div className="page-error">{error}</div>}

          {!loading && !error && products.length === 0 && (
            <div className="page-empty"><p>No products in this category.</p></div>
          )}

          {!loading && products.length > 0 && (
            <div className="product-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
