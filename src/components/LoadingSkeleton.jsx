export function ProductCardSkeleton({ count = 4 }) {
  return (
    <div className="skeleton-row">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-img shimmer" />
          <div className="skeleton-line shimmer" />
          <div className="skeleton-line short shimmer" />
          <div className="skeleton-line medium shimmer" />
        </div>
      ))}
    </div>
  )
}

export function HomeSkeleton() {
  return (
    <div className="home-page">
      <div className="skeleton-hero shimmer" />
      <div className="skeleton-strip shimmer" />
      <ProductCardSkeleton count={5} />
    </div>
  )
}
