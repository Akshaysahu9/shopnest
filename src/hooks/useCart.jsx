import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { cartApi } from '../services/api'
import { useAuth } from './useAuth'
import { products as localCatalog } from '../data/products'

const CartContext = createContext(null)
const GUEST_KEY = 'shopnest_guest_cart'

function loadGuestCart() {
  try {
    const raw = localStorage.getItem(GUEST_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const toastListeners = new Set()
export function showToast(msg, type = 'success') {
  toastListeners.forEach(fn => fn({ msg, type, id: Date.now() }))
}
export function subscribeToast(fn) {
  toastListeners.add(fn)
  return () => toastListeners.delete(fn)
}

export function CartProvider({ children }) {
  const { isLoggedIn, user } = useAuth()
  const [guestItems, setGuestItems] = useState(loadGuestCart)
  const [cartDetails, setCartDetails] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const syncFromServer = useCallback(async () => {
    setLoading(true)
    try {
      const data = await cartApi.get()
      setCartDetails(data.cartDetails || [])
      setSubtotal(data.subtotal || 0)
      setCartCount(data.cartCount || 0)
    } catch {
      setCartDetails([])
      setSubtotal(0)
      setCartCount(0)
    } finally {
      setLoading(false)
    }
  }, [])

  const syncGuestDisplay = useCallback(async () => {
    if (!guestItems.length) {
      setCartDetails([])
      setSubtotal(0)
      setCartCount(0)
      return
    }

    const map = new Map(localCatalog.map(p => [p.id, p]))

    const details = guestItems
      .map(i => {
        const p = map.get(i.id)
        return p ? { ...p, qty: i.qty } : null
      })
      .filter(Boolean)

    setCartDetails(details)
    setSubtotal(details.reduce((s, i) => s + i.price * i.qty, 0))
    setCartCount(details.reduce((s, i) => s + i.qty, 0))
  }, [guestItems])

  useEffect(() => {
    localStorage.setItem(GUEST_KEY, JSON.stringify(guestItems))
  }, [guestItems])

  useEffect(() => {
    if (isLoggedIn) {
      syncFromServer()
    } else {
      syncGuestDisplay()
    }
  }, [isLoggedIn, user, guestItems, syncFromServer, syncGuestDisplay])

  useEffect(() => {
    if (!isLoggedIn || !guestItems.length) return

    cartApi.merge(guestItems)
      .then(() => {
        setGuestItems([])
        localStorage.removeItem(GUEST_KEY)
        syncFromServer()
      })
      .catch(() => {})
  }, [isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

  const addItem = useCallback(async (productId, qty = 1) => {
    if (isLoggedIn) {
      try {
        const data = await cartApi.add(productId, qty)
        setCartDetails(data.cartDetails || [])
        setSubtotal(data.subtotal || 0)
        setCartCount(data.cartCount || 0)
        const item = data.cartDetails?.find(i => i.id === productId)
        showToast(`Added to cart: ${item?.title?.slice(0, 40) || 'Item'}...`)
      } catch (err) {
        showToast(err.message, 'error')
      }
      return
    }

    setGuestItems(prev => {
      const existing = prev.find(i => i.id === productId)
      if (existing) {
        return prev.map(i => i.id === productId ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { id: productId, qty }]
    })
    showToast('Added to cart')
  }, [isLoggedIn])

  const removeItem = useCallback(async (productId) => {
    if (isLoggedIn) {
      const data = await cartApi.remove(productId)
      setCartDetails(data.cartDetails || [])
      setSubtotal(data.subtotal || 0)
      setCartCount(data.cartCount || 0)
      return
    }
    setGuestItems(prev => prev.filter(i => i.id !== productId))
  }, [isLoggedIn])

  const updateQty = useCallback(async (productId, qty) => {
    if (qty < 1) {
      removeItem(productId)
      return
    }

    if (isLoggedIn) {
      const data = await cartApi.update(productId, qty)
      setCartDetails(data.cartDetails || [])
      setSubtotal(data.subtotal || 0)
      setCartCount(data.cartCount || 0)
      return
    }

    setGuestItems(prev =>
      prev.map(i => i.id === productId ? { ...i, qty } : i)
    )
  }, [isLoggedIn, removeItem])

  const clearCart = useCallback(async () => {
    if (isLoggedIn) {
      await cartApi.clear()
      setCartDetails([])
      setSubtotal(0)
      setCartCount(0)
      return
    }
    setGuestItems([])
  }, [isLoggedIn])

  return (
    <CartContext.Provider value={{
      cartDetails,
      subtotal,
      cartCount,
      loading,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      refreshCart: isLoggedIn ? syncFromServer : syncGuestDisplay,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
