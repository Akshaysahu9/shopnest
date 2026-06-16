import { useState, useEffect } from 'react'

const FALLBACKS = {
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop&auto=format&q=80',
  fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop&auto=format&q=80',
  home: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&auto=format&q=80',
  books: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&auto=format&q=80',
  beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&auto=format&q=80',
  sports: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop&auto=format&q=80',
  toys: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop&auto=format&q=80',
  grocery: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&auto=format&q=80',
  default: 'https://picsum.photos/id/26/400/400',
}

export default function ProductImage({ src, alt, category, className }) {
  const fallback = FALLBACKS[category] || FALLBACKS.default
  const [imgSrc, setImgSrc] = useState(src || fallback)

  useEffect(() => {
    setImgSrc(src || fallback)
  }, [src, fallback])

  function handleError() {
    setImgSrc(prev => (prev === fallback ? FALLBACKS.default : fallback))
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
    />
  )
}
