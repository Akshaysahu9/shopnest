import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/products'

export default function CategoryStrip() {
  return (
    <section className="category-strip">
      <div className="category-strip-inner">
        {CATEGORIES.map(cat => (
          <Link key={cat.slug} to={`/category/${cat.slug}`} className="cat-pill">
            <span className="cat-pill-icon">{cat.icon}</span>
            <span className="cat-pill-label">{cat.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
