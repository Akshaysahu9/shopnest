import { useState, useEffect } from 'react'
import { productApi } from '../services/api'
import { filterProducts, getProduct, getRelated } from '../data/products'

export function useProducts(params = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)
  const [offline, setOffline] = useState(false)

  const key = JSON.stringify(params)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setOffline(false)

    productApi.list(params)
      .then(res => {
        if (cancelled) return
        setProducts(res.products || [])
        setTotal(res.total || 0)
      })
      .catch(() => {
        if (cancelled) return
        const local = filterProducts(params)
        setProducts(local.products)
        setTotal(local.total)
        setOffline(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  return { products, loading, error, total, offline }
}

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    setOffline(false)

    productApi.get(id)
      .then(res => {
        if (cancelled) return
        setProduct(res.product)
        setRelated(res.related || [])
      })
      .catch(() => {
        if (cancelled) return
        const local = getProduct(id)
        if (local) {
          setProduct(local)
          setRelated(getRelated(local))
          setOffline(true)
          setError(null)
        } else {
          setError('Product not found')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [id])

  return { product, related, loading, error, offline }
}
