import { useState, useEffect, useCallback } from 'react'

const KEY = 'shopnest_wishlist'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function useWishlist() {
  const [ids, setIds] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(ids))
  }, [ids])

  const toggle = useCallback((productId) => {
    setIds(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }, [])

  const has = useCallback((productId) => ids.includes(productId), [ids])

  return { wishlistCount: ids.length, toggle, has, ids }
}
