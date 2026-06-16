import { useState, useEffect } from 'react'

function getTimeLeft() {
  const now = new Date()
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  const diff = Math.max(0, end - now)
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return { h, m, s }
}

export default function FlashTimer() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="flash-timer">
      <span>Ends in</span>
      <div className="flash-timer-box">
        <span className="flash-timer-unit">{pad(time.h)}</span>
        <span className="flash-timer-sep">:</span>
        <span className="flash-timer-unit">{pad(time.m)}</span>
        <span className="flash-timer-sep">:</span>
        <span className="flash-timer-unit">{pad(time.s)}</span>
      </div>
    </div>
  )
}
