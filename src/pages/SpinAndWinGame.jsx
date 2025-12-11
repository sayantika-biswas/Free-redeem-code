"use client"

import { useState, useEffect, useRef } from "react"
import axios from "../utils/axios"
import { Helmet } from "react-helmet"

function SpinAndWinGame() {
  const [spinsLeft, setSpinsLeft] = useState(3)
  const [isSpinning, setIsSpinning] = useState(false)
  const [resultMessage, setResultMessage] = useState("")
  const [showResultModal, setShowResultModal] = useState(false)
  // const [ads, setAds] = useState([]);
  const [wallet, setWallet] = useState(0)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef(null)

  const segments = [
    { text: "Better luck next time", color: "#FF6B6B", value: 0 },
    { text: "🪙20", color: "#4ECDC4", value: 20 },
    { text: "Better luck next time", color: "#FF6B6B", value: 0 },
    { text: "🪙10", color: "#45B7D1", value: 10 },
    { text: "Better luck next time", color: "#FF6B6B", value: 0 },
    { text: "🪙30", color: "#96CEB4", value: 30 },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, historyRes] = await Promise.all([
          // axios.get("/ads?page=post"),
          axios.get("/spin/history/today"),
          axios.get("/auth/profile"),
        ])
        // setAds(adsRes.data);
        setWallet(profileRes.data.wallet)
        setSpinsLeft(3 - historyRes?.data?.count)
      } catch (error) {
        console.error(error.response?.data?.message || "Error loading data:", error)
      }
    }
    fetchData()
  }, [])

  const drawSegment = (index, totalSegments, radius, cx, cy) => {
    const angle = 360 / totalSegments
    const startAngle = index * angle
    const endAngle = (index + 1) * angle

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

    const textAngle = startAngle + angle / 2
    const textRadius = radius * 0.65
    const textX = cx + textRadius * Math.cos((Math.PI * textAngle) / 180)
    const textY = cy + textRadius * Math.sin((Math.PI * textAngle) / 180)

    return (
      <g key={index}>
        <defs>
          <filter id={`glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={path} fill={segments[index].color} stroke="#1a1a2e" strokeWidth="0.5" filter={`url(#glow-${index})`} />
        <text
          x={textX}
          y={textY}
          fill="white"
          fontSize="4.2px"
          textAnchor="middle"
          alignmentBaseline="middle"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: "bold",
            textShadow: "0 0 4px rgba(0,0,0,0.8)",
          }}
        >
          {segments[index].value === 0 ? (
            <>
              <tspan x={textX} dy="-2.5">
                Better luck
              </tspan>
              <tspan x={textX} dy="5">
                next time
              </tspan>
            </>
          ) : (
            `🪙${segments[index].value}`
          )}
        </text>
      </g>
    )
  }

  const spinWheel = async () => {
    if (isSpinning || segments.length === 0 || spinsLeft <= 0) return

    setIsSpinning(true)
    setResultMessage("")

    // Calculate a random spin duration (3-5 seconds)
    const spinDuration = 3000 + Math.random() * 2000
    // Calculate total rotation (5 full rotations + random segment)
    const segmentAngle = 360 / segments.length
    const winningSegment = Math.floor(Math.random() * segments.length)
    const targetRotation = 1800 + winningSegment * segmentAngle

    // Start the animation
    const startTime = Date.now()
    const startRotation = rotation

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / spinDuration, 1)

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3)

      const currentRotation = startRotation + targetRotation * easeOut
      setRotation(currentRotation)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Animation complete
        handleSpinComplete(winningSegment)
      }
    }

    animate()
  }

  const handleSpinComplete = async () => {
    try {
      const res = await axios.post("/spin/play")
      const { reward, wallet: updatedWallet, spinsLeft: newSpinsLeft } = res.data

      setWallet(updatedWallet ?? wallet)
      setSpinsLeft(newSpinsLeft ?? spinsLeft)

      const message =
        reward === "Nothing" || reward === "Try Again"
          ? "Better luck next time!"
          : `You won ${reward}! Amount has been added to your wallet.`

      setResultMessage(message)
      setShowResultModal(true)
    } catch (err) {
      const msg = err.response?.data?.message
      setResultMessage(
        msg?.includes("spins") || msg?.includes("played")
          ? "You've used all your spins today. Come back tomorrow!"
          : "Error: " + (msg || "Please log in"),
      )
      setShowResultModal(true)
    } finally {
      setIsSpinning(false)
    }
  }

  const wheelStyle = {
    transform: `rotate(${rotation}deg)`,
    transition: isSpinning ? "none" : "transform 0.1s ease-out",
  }

  return (
    <>
      <Helmet>
        <title>Spin & Win | Free Redeem Code Daily</title>
        <meta name="description" content="Spin the wheel for a chance to win Google Play redeem codes." />
        <meta name="keywords" content="spin and win, google play, redeem codes" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeredeemcodedaily.com/spin-and-win" />
        <meta property="og:title" content="Spin & Win | Free Redeem Code Daily" />
        <meta property="og:description" content="Spin the wheel for a chance to win Google Play redeem codes." />
        <meta property="og:url" content="https://freeredeemcodedaily.com/spin-and-win" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse -top-48 -left-48"></div>
          <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse -bottom-48 -right-48"></div>
          <div className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-bounce top-1/2 left-1/4"></div>
        </div>

        <div className="relative z-10 p-4 sm:p-8 flex flex-col items-center font-inter pt-20">
          <div className="w-full max-w-4xl bg-gray-900/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>

            <div className="relative z-10">
              <div className="mb-8">
                <img
                  src="https://freelogopng.com/images/all_img/1664285914google-play-logo-png.png"
                  alt="Google Play Logo"
                  className="h-12 mb-6 mx-auto filter drop-shadow-lg"
                />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  SPIN & WIN
                </h1>
                <p className="text-gray-300 text-lg mb-6 max-w-md mx-auto">
                  Spin the cosmic wheel to unlock Google Play redeem codes from the digital realm
                </p>

                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 rounded-full px-6 py-3 backdrop-blur-sm">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                  <span className="text-cyan-300 font-semibold">Spins Remaining: {spinsLeft}/3</span>
                </div>
              </div>

              <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] mb-10 flex items-center justify-center">
                {/* Outer glow rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-spin-slow blur-sm"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-pink-500/15 via-cyan-500/15 to-purple-500/15 animate-spin-reverse blur-md"></div>

                {/* Wheel container */}
                <div className="relative bg-gray-800/50 rounded-full p-4 backdrop-blur-sm border border-cyan-500/30 shadow-2xl">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-2xl"
                    style={wheelStyle}
                    ref={wheelRef}
                  >
                    {segments.map((_, idx) => drawSegment(idx, segments.length, 45, 50, 50))}
                    <circle cx="50" cy="50" r="3" fill="#1a1a2e" stroke="#00ffff" strokeWidth="1" />
                  </svg>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 z-20" style={{ top: "-16px" }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-400 blur-md rounded-full animate-pulse"></div>
                    <svg width="32" height="32" viewBox="0 0 24 24" className="relative z-10 filter drop-shadow-lg">
                      <path
                        d="M12 0C7.3125 0 3.5 3.54375 3.5 8.15625C3.5 13.9875 12 24 12 24C12 24 20.5 13.9875 20.5 8.15625C20.5 3.54375 16.6875 0 12 0Z"
                        fill="url(#pointerGradient)"
                      />
                      <defs>
                        <linearGradient id="pointerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00ffff" />
                          <stop offset="100%" stopColor="#ff00ff" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              <button
                onClick={spinWheel}
                disabled={isSpinning || spinsLeft === 0}
                className={`relative w-full max-w-sm py-4 rounded-full text-white font-bold text-xl transition-all duration-300 transform hover:scale-105 ${
                  isSpinning || spinsLeft === 0
                    ? "bg-gray-600/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                <span className="relative z-10">
                  {isSpinning ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      SPINNING...
                    </div>
                  ) : (
                    "🎯 SPIN THE WHEEL"
                  )}
                </span>
              </button>

              <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/50 backdrop-blur-sm rounded-xl p-4 ml-10 mt-8 w-full max-w-sm text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">🚀</span>
                  <p className="font-bold text-amber-300">Boost Your Spins!</p>
                </div>
                <p className="text-amber-200 text-sm">
                  Share with friends to unlock up to 3 daily spins and maximize your rewards!
                </p>
              </div>
            </div>
          </div>
        </div>

        {showResultModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900/90 backdrop-blur-xl border border-cyan-500/50 rounded-2xl shadow-2xl p-8 text-center max-w-md w-full relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl"></div>

              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎊</span>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    Spin Complete!
                  </h3>
                </div>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">{resultMessage}</p>

                <button
                  onClick={() => setShowResultModal(false)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
                >
                  Continue Gaming
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SpinAndWinGame
