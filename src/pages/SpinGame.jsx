"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import instance from "../utils/axios"
import { toast } from "react-toastify"

export default function SpinGame() {
  const location = useLocation()
  const navigate = useNavigate()
  const selectedBundle = location.state?.selectedBundle

  const [segments, setSegments] = useState([])
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [spinsLeft, setSpinsLeft] = useState(3)
  const wheelRef = useRef(null)

  const guestId =
    localStorage.getItem("guestId") ||
    (() => {
      const id = `guest-${Math.random().toString(36).substring(2, 10)}`
      localStorage.setItem("guestId", id)
      return id
    })()

  useEffect(() => {
    if (!selectedBundle) {
      navigate("/")
      return
    }

    const baseColors = ["#00D4FF", "#FF0080", "#00FF88", "#FFD700", "#FF4500", "#8A2BE2"]
    const coloredSegments = selectedBundle.spinItems.map((item, index) => ({
      text: item,
      color: baseColors[index % baseColors.length],
    }))

    setSegments(coloredSegments)
    setRotation(0)
    setResult(null)

    // Fetch remaining spins
    fetchRemainingSpins()
  }, [selectedBundle, navigate])

  const fetchRemainingSpins = async () => {
    try {
      const res = await instance.get(`/game-spin/history`, {
        headers: { guestid: guestId },
        params: { bundleId: selectedBundle._id },
      })
      const remaining = 3 - (res.data.count || 0)
      setSpinsLeft(remaining > 0 ? remaining : 0)
    } catch (err) {
      console.error("Failed to get remaining spins:", err)
    }
  }

  const spinWheel = async () => {
    if (isSpinning || segments.length === 0 || spinsLeft <= 0) return

    try {
      // Request spin result from backend
      const res = await instance.post(
        `/game-spin/play`,
        {
          bundleId: selectedBundle._id,
        },
        {
          headers: { guestid: guestId },
        },
      )

      const reward = res.data.reward
      const winningIndex = segments.findIndex((seg) => seg.text === reward)
      if (winningIndex === -1) throw new Error("Reward not found on wheel")

      const segmentAngle = 360 / segments.length
      const fullRotations = 5
      const newRotation = fullRotations * 360 + winningIndex * segmentAngle + segmentAngle / 2

      setIsSpinning(true)
      const start = performance.now()
      const duration = 4000
      const startRotation = rotation

      const animate = (now) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const current = startRotation + newRotation * easeOut
        setRotation(current)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setIsSpinning(false)
          setResult(reward)
          toast.success(`You won: ${reward}`)
          setSpinsLeft((prev) => prev - 1)
        }
      }

      requestAnimationFrame(animate)
      fetchRemainingSpins()
    } catch (err) {
      console.error("Spin failed:", err)
      toast.error(err.response?.data?.message || "Spin failed. Please try again.")
      setIsSpinning(false)
    }
  }

  const drawSegments = () => {
    const radius = 100
    const cx = 100
    const cy = 100

    return segments.map((seg, i) => {
      const angle = 360 / segments.length
      const startAngle = angle * i
      const endAngle = angle * (i + 1)

      const x1 = cx + radius * Math.cos((Math.PI * startAngle) / 180)
      const y1 = cy + radius * Math.sin((Math.PI * startAngle) / 180)
      const x2 = cx + radius * Math.cos((Math.PI * endAngle) / 180)
      const y2 = cy + radius * Math.sin((Math.PI * endAngle) / 180)

      const path = `
        M ${cx} ${cy}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2}
        Z
      `

      const midAngle = startAngle + angle / 2
      const textX = cx + radius * 0.6 * Math.cos((Math.PI * midAngle) / 180)
      const textY = cy + radius * 0.6 * Math.sin((Math.PI * midAngle) / 180)

      return (
        <g key={i}>
          <path d={path} fill={seg.color} stroke="#00D4FF" strokeWidth="1" filter="url(#glow)" />
          <text
            x={textX}
            y={textY}
            fontSize="7"
            fill="#fff"
            textAnchor="middle"
            alignmentBaseline="middle"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
              textShadow: "0 0 4px rgba(0, 212, 255, 0.8)",
            }}
          >
            {seg.text.length > 8 ? seg.text.slice(0, 8) + "…" : seg.text}
          </text>
        </g>
      )
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-8 space-y-8 px-4 relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            SPIN TO WIN
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-white/90">
            {selectedBundle?.title || "Select a Game"}
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-cyan-400/30 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-bold text-lg">Spins Remaining: {spinsLeft}</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative w-80 h-80 md:w-96 md:h-96 bg-white/5 backdrop-blur-sm rounded-full border-2 border-cyan-400/50 shadow-2xl p-4">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-2xl"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? "none" : "transform 0.2s ease-out",
              }}
              ref={wheelRef}
            >
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="centerGradient">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#0080FF" />
                </radialGradient>
              </defs>
              {drawSegments()}
              <circle cx="100" cy="100" r="6" fill="url(#centerGradient)" stroke="#00D4FF" strokeWidth="2" />
            </svg>

            <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-6 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-b-full shadow-lg border-2 border-white/50">
                <div className="w-full h-full bg-gradient-to-b from-cyan-300 to-cyan-500 rounded-b-full shadow-[0_0_20px_rgba(0,212,255,0.8)]"></div>
              </div>
            </div>
          </div>
        </div>

        <button
          className={`relative px-8 py-4 rounded-full font-bold text-xl shadow-2xl transition-all duration-300 transform ${
            isSpinning || spinsLeft <= 0
              ? "bg-gray-600/50 cursor-not-allowed text-gray-400 scale-95"
              : "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] active:scale-95"
          }`}
          onClick={spinWheel}
          disabled={isSpinning || spinsLeft <= 0}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur animate-pulse"></div>
          <span className="relative z-10">
            {isSpinning ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>SPINNING...</span>
              </div>
            ) : (
              "SPIN NOW"
            )}
          </span>
        </button>

        {result && (
          <div className="bg-gradient-to-r from-green-400/20 to-emerald-500/20 backdrop-blur-md border border-green-400/50 rounded-2xl px-8 py-6 shadow-2xl animate-bounce">
            <div className="text-center space-y-2">
              <div className="text-4xl">🎉</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                CONGRATULATIONS!
              </div>
              <div className="text-xl text-white font-semibold">
                You won: <span className="text-green-400">{result}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
