"use client"

import { useEffect, useState } from "react"
import { Zap, Star, Trophy } from "lucide-react"

const FloatingIcon = ({ icon: Icon, delay = 0 }) => {
  return (
    <div
      className="absolute animate-bounce opacity-20"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      }}
    >
      <Icon className="w-6 h-6 text-purple-400" />
    </div>
  )
}

const GamingEffects = () => {
  const [showEffects, setShowEffects] = useState(true)

  useEffect(() => {
    // Disable effects on mobile for performance
    const isMobile = window.innerWidth < 768
    setShowEffects(!isMobile)
  }, [])

  if (!showEffects) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Gaming Icons */}
      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingIcon key={i} icon={[Zap, Star, Trophy][i % 3]} delay={i * 0.5} />
      ))}

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-3/4 left-3/4 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
    </div>
  )
}

export default GamingEffects
