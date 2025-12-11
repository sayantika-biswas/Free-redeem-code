"use client"

import { useState } from "react"
import axios from "../utils/axios"
import { Helmet } from "react-helmet"

const FlipCoinGame = () => {
  const [choice, setChoice] = useState("")
  const [result, setResult] = useState("")
  const [flipping, setFlipping] = useState(false)

  const handleFlip = async () => {
    if (!choice) return
    setFlipping(true)
    setResult("")

    try {
      const res = await axios.post("/flipcoin/play", { choice })

      setFlipping(false)
      if (res.data.won) {
        setResult(`🎉 It's ${res.data.result}! You won 🪙100!`)
      } else {
        setResult(`😞 It's ${res.data.result}. You lost.`)
      }
    } catch (err) {
      setFlipping(false)
      if (err.response?.data?.message) {
        setResult(`⚠️ ${err.response.data.message}`)
      } else {
        setResult("⚠️ Error occurred. Try again later.")
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Flip the Coin | Free Redeem Code Daily</title>
        <meta
          name="description"
          content="Play the Flip the Coin to win exciting rewards. Choose Heads or Tails and flip the coin for a chance to win 🪙100 Google Play redeem code. Join now and test your luck!"
        />
        <meta name="keywords" content="Flip the Coin, game, rewards" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeredeemcodedaily.com/flip-a-coin" />
        <meta property="og:title" content="Flip the Coin | Free Redeem Code Daily" />
        <meta property="og:description" content="Play the Flip the Coin to win exciting rewards." />
        <meta property="og:url" content="https://freeredeemcodedaily.com/flip-a-coin" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-xl w-full mx-auto p-8 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-md rounded-2xl shadow-2xl mt-14 space-y-8 border border-blue-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-pink-600/10 rounded-2xl"></div>
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-2">
              🪙 Flip the Coin
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-400 mx-auto rounded-full mb-4"></div>
            <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-400/30">
              <h3 className="text-lg font-semibold text-yellow-400">Win 🪙100 Google Play Redeem Code!</h3>
            </div>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            <button
              onClick={() => setChoice("Heads")}
              className={`py-4 px-8 rounded-xl font-bold border-2 transition-all transform hover:scale-105 ${
                choice === "Heads"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-400/25"
                  : "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border-gray-600 hover:border-gray-500"
              }`}
            >
              <div className="text-2xl mb-1">🧠</div>
              <div>Heads</div>
            </button>
            <button
              onClick={() => setChoice("Tails")}
              className={`py-4 px-8 rounded-xl font-bold border-2 transition-all transform hover:scale-105 ${
                choice === "Tails"
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-400 shadow-lg shadow-pink-400/25"
                  : "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border-gray-600 hover:border-gray-500"
              }`}
            >
              <div className="text-2xl mb-1">🌀</div>
              <div>Tails</div>
            </button>
          </div>

          <button
            onClick={handleFlip}
            disabled={flipping || !choice}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform ${
              flipping || !choice
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white hover:scale-105 shadow-lg shadow-emerald-400/25"
            }`}
          >
            {flipping ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>🌀
                Flipping...
              </div>
            ) : (
              "🎯 Flip Coin"
            )}
          </button>

          {result && (
            <div className="text-center p-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-400/30 mt-6">
              <div className="text-xl font-bold text-white mb-2">{result}</div>
              {result.includes("won") && (
                <div className="flex justify-center gap-1 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default FlipCoinGame
