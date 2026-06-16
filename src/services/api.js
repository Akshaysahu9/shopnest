const BASE = import.meta.env.VITE_API_URL || '/api'

function getToken() {
  return localStorage.getItem('shopnest_token')
}

export async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })

  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new Error('API unavailable')
  }

  const data = await res.json().catch(() => {
    throw new Error('Invalid API response')
  })

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`)
  }
  return data
}

export const authApi = {
  register: (body) => api('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => api('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => api('/auth/me'),
}

export const productApi = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return api(`/products${q ? `?${q}` : ''}`)
  },
  get: (id) => api(`/products/${id}`),
  deals: () => api('/products/deals/list'),
}

export const cartApi = {
  get: () => api('/cart'),
  add: (productId, qty = 1) => api('/cart', { method: 'POST', body: JSON.stringify({ productId, qty }) }),
  update: (productId, qty) => api(`/cart/${productId}`, { method: 'PUT', body: JSON.stringify({ qty }) }),
  remove: (productId) => api(`/cart/${productId}`, { method: 'DELETE' }),
  clear: () => api('/cart', { method: 'DELETE' }),
  merge: (items) => api('/cart/merge', { method: 'POST', body: JSON.stringify({ items }) }),
}

export const orderApi = {
  create: (body) => api('/orders', { method: 'POST', body: JSON.stringify(body) }),
  list: () => api('/orders'),
  get: (id) => api(`/orders/${id}`),
}
