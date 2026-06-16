import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

export default function SearchPage() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''
  const { products, loading, error, total } = useProducts({
    search: query,
    limit: 50,
  })

  return (
    <div className="search-page">
      <div className="page-header">
        <h1>
          {query
            ? loading ? `Searching for "${query}"...` : `${total} results for "${query}"`
            : 'Search ShopNest'}
        </h1>
      </div>

      {loading && <div className="page-loading">Searching...</div>}
      {error && <div className="page-error">{error}</div>}

      {!loading && !error && query && products.length === 0 && (
        <div className="page-empty">
          <p>No results found for "{query}". Try different keywords.</p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="product-grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
