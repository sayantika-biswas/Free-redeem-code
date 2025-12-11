"use client"

import { useEffect, useState } from "react"
import { Gift, Clock, Sparkles } from "lucide-react"
import axios from "../utils/axios"
import { toast } from "react-toastify"

const PromoCodeCard = () => {
  const [codeData, setCodeData] = useState({ code: "", amount: 0 })

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const { data } = await axios.get("/daily-code/")
        setCodeData(data)
      } catch (error) {
        console.error("Failed to fetch code", error)
      }
    }

    fetchCode()
  }, [])

  const handleRedeem = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.post("/daily-code/redeem", {}, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Redeemed successfully")
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong while redeeming"
      toast.error(msg)
    }
  }

  return (
    <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-500/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-emerald-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Today's Promo Code</h3>
            <p className="text-gray-400 text-sm">Daily special reward</p>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-gray-700 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 text-sm">
              Worth <span className="font-bold text-yellow-400">🪙{codeData.amount}</span>
            </span>
          </div>

          <div className="flex justify-between items-center bg-slate-700/50 px-4 py-3 rounded-lg border border-gray-600">
            <span className="text-xl font-mono tracking-wider text-white font-bold">{codeData.code}</span>
            <button
              onClick={handleRedeem}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-sm rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Redeem Now
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Clock className="w-3 h-3" />
          <span>This code resets daily at midnight. Use it before it expires!</span>
        </div>
      </div>
    </div>
  )
}

export default PromoCodeCard
