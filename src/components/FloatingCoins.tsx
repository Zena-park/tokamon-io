import { useMemo } from 'react'
import './FloatingCoins.css'

export default function FloatingCoins() {
  const coins = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 22,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 20,
      opacity: 0.08 + Math.random() * 0.12,
    })),
    []
  )

  return (
    <div className="floating-coins" aria-hidden="true">
      {coins.map(coin => (
        <div
          key={coin.id}
          className="floating-coin"
          style={{
            left: `${coin.left}%`,
            width: `${coin.size}px`,
            height: `${coin.size}px`,
            animationDelay: `${coin.delay}s`,
            animationDuration: `${coin.duration}s`,
            opacity: coin.opacity,
          }}
        >
          T
        </div>
      ))}
    </div>
  )
}
