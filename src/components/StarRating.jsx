export default function StarRating({ rating, count, size }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.25 && rating % 1 < 0.75
  const ceil = Math.ceil(rating - full)

  return (
    <div className={`star-rating ${size || ''}`} title={`${rating} out of 5 stars`}>
      <div className="star-icons">
        {[1, 2, 3, 4, 5].map(i => {
          let cls = 'star-empty'
          if (i <= full) cls = 'star-full'
          else if (i === full + 1 && (half || ceil)) cls = 'star-half'
          return (
            <svg key={i} className={cls} viewBox="0 0 24 24" width="16" height="16">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
            </svg>
          )
        })}
      </div>
      {count != null && (
        <span className="review-count">{count.toLocaleString('en-IN')}</span>
      )}
    </div>
  )
}
