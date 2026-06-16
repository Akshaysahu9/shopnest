import { useState, useEffect } from 'react'
import { subscribeToast } from '../hooks/useCart'

export default function Toast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    return subscribeToast(({ msg, type, id }) => {
      setToasts(prev => [...prev, { msg, type, id, exiting: false }])
      setTimeout(() => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t))
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id))
        }, 280)
      }, 2500)
    })
  }, [])

  if (!toasts.length) return null

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast--${t.type} ${t.exiting ? 'toast--exit' : ''}`}>
          {t.type === 'success' && <span className="toast-icon">✓</span>}
          {t.type === 'error' && <span className="toast-icon">✕</span>}
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}
