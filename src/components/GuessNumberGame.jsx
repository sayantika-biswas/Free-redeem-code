"use client"

import { useState, useEffect } from "react"
import axios from "../utils/axios"
import { Helmet } from "react-helmet"

const GuessNumberGame = () => {
  const [input, setInput] = useState("")
  const [message, setMessage] = useState("")
  const [chances, setChances] = useState(3)
  const [blocked, setBlocked] = useState(false)
  const [showAd, setShowAd] = useState(false)
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem("token")
  const headers = token ? { Authorization: `Bearer ${token}` } : {}

  const fetchStart = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/guess/start", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          guestId: localStorage.getItem("guestId") || "",
        },
      })
      const attempts = res.data.attemptsLeft ?? 3
      setChances(attempts)
      setBlocked(attempts === 0)
      setMessage("")
      setResult("")
    } catch (err) {
      setMessage(err?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchStart()
  }, [token])

  const handleGuess = async () => {
    const guess = Number(input)
    if (!guess || guess < 1 || guess > 100) {
      setMessage("❗ Enter a number between 1 and 100")
      return
    }

    try {
      setLoading(true)
      const { data } = await axios.post("/guess/guess", { guess }, { headers })

      if (data.blocked) {
        setBlocked(true)
        setResult(data.message || "❌ You already won today.")
      } else if (data.correct) {
        setBlocked(true)
        setResult("🎉 Correct! 🪙30 has been added to your wallet.")
      } else {
        const remaining = chances - 1
        setChances(remaining)
        setMessage(data.hint || "❌ Wrong guess")
        if (remaining === 0) {
          setBlocked(true)
          setResult("❌ Out of attempts! Try again tomorrow.")
        }
      }
    } catch (err) {
      setBlocked(true)
      setResult(err?.response?.data?.message || "Server error")
    } finally {
      setInput("")
      setLoading(false)
    }
  }

  const handleWatchAd = async () => {
    setShowAd(true)
    setTimeout(async () => {
      try {
        await axios.post("/guess/ad", {}, { headers })
        fetchStart()
      } catch (err) {
        setMessage(err?.response?.data?.message || "Failed to grant more chances.")
      } finally {
        setShowAd(false)
      }
    }, 5000)
  }

  return (
    <>
      <Helmet>
        <title>Guess The Number | Free Redeem Code Daily</title>
        <meta
          name="description"
          content="Play Guess The Number for a chance to win exciting rewards. Enter your guess and see if you can hit the target!"
        />
        <meta name="keywords" content="Guess The Number, game, rewards" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeredeemcodedaily.com/guess-the-number" />
        <meta property="og:title" content="Guess The Number | Free Redeem Code Daily" />
        <meta property="og:description" content="Play Guess The Number for a chance to win exciting rewards." />
        <meta property="og:url" content="https://freeredeemcodedaily.com/guess-the-number" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-xl w-full mx-auto p-8 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-purple-900/20 backdrop-blur-md rounded-2xl shadow-2xl mt-10 space-y-6 border border-purple-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 rounded-2xl"></div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center mb-2">
            🎯 Guess The Number
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-6"></div>

          {showAd ? (
            <div className="text-center p-8 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl border border-yellow-400/30">
              <div className="text-2xl font-medium text-yellow-400 animate-pulse mb-4">
                ⏳ Watching ad... Please wait
              </div>
              <div className="flex justify-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          ) : blocked ? (
            <div className="text-center space-y-6">
              <div className="p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl border border-red-400/30">
                <p className="text-xl font-semibold text-red-400 mb-4">{result}</p>
              </div>
              <button
                onClick={handleWatchAd}
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg border border-yellow-400/50"
              >
                ▶️ Try Again Now (Watch Ad)
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="number"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter a number (1–100)"
                  className="w-full px-6 py-4 bg-gray-900/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-xl pointer-events-none"></div>
              </div>

              <button
                onClick={handleGuess}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg border border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🔍 {loading ? "Checking..." : "Guess"}
              </button>

              {message && (
                <div className="text-center p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl border border-orange-400/30">
                  <div className="text-orange-300 font-medium">{message}</div>
                </div>
              )}

              <div className="flex justify-center items-center gap-4">
                <div className="text-gray-300 text-sm">Chances left:</div>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < chances ? "bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg" : "bg-gray-600"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="text-center p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-400/30 mt-6">
            <h3 className="text-lg font-semibold text-green-400 mb-2">🎮 Game Objective</h3>
            <p className="text-gray-300 text-sm">Guess the correct number to win a 🪙30 Google Play redeem code!</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default GuessNumberGame
