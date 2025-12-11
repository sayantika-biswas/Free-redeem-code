"use client"

import { useState, useEffect } from "react"
import { Lock, Unlock, Gift, Sparkles } from "lucide-react"
import { toast } from "react-toastify"

const AdModal = ({ countdown }) => (
  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl w-[90%] max-w-md shadow-2xl relative border border-purple-500/30">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl mb-4">
          <Sparkles className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Unlocking Code</h3>
        <p className="text-gray-400 mb-6">Your reward is being prepared...</p>
        <div className="bg-slate-700/50 rounded-xl p-4 border border-gray-600">
          <div className="text-3xl font-bold text-purple-400 mb-2">{countdown}</div>
          <p className="text-gray-300 text-sm">seconds remaining</p>
        </div>
      </div>
    </div>
  </div>
)

const RedeemCard = ({ code, amount, name, image }) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [countdown, setCountdown] = useState(5)

  const handleUnlock = () => {
    setShowModal(true)
    setCountdown(1)
  }

  useEffect(() => {
    if (showModal && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    }

    if (showModal && countdown === 0) {
      setShowModal(false)
      setIsRevealed(true)
      toast.info("Code unlocked. Use it in the Special Rewards Section.")
    }
  }, [showModal, countdown])

  return (
    <>
      <div className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-[1.02] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10 group-hover:from-purple-600/20 group-hover:to-cyan-600/15 transition-all duration-300"></div>

        <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center border border-gray-600">
            <img src={image || "/placeholder.svg"} className="h-10 w-10 object-contain" alt={name} />
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-1">{name || "Google Play"}</h3>
            <p className="text-gray-400 text-sm">Redeem Code</p>
          </div>

          <div className="w-full bg-slate-700/30 rounded-xl p-4 border border-gray-600">
            <div
              className={`text-xl font-mono font-bold tracking-wider transition-all duration-300 ${
                isRevealed ? "text-white" : "blur-md text-gray-500"
              }`}
            >
              {code}
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
            <Gift className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-lg">🪙{amount}</span>
          </div>

          <button
            onClick={handleUnlock}
            disabled={isRevealed}
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              isRevealed
                ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                : "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isRevealed ? (
              <>
                <Unlock className="w-5 h-5" />
                Code Unlocked
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Unlock Code
              </>
            )}
          </button>
        </div>
      </div>

      {showModal && <AdModal countdown={countdown} />}
    </>
  )
}

export default RedeemCard
