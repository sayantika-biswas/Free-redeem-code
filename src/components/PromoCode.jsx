"use client"

import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Gift, Sparkles, Wallet, History, ArrowRight } from "lucide-react"
import axios from "../utils/axios"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet"

const PromoCode = () => {
  const [promoCode, setPromoCode] = useState("")
  const [specialCode, setSpecialCode] = useState("")
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const incomingCode = searchParams.get("code")
    if (incomingCode) {
      setSpecialCode(incomingCode)
      toast.info("Special code auto-filled. Click redeem to claim!")
    }
  }, [searchParams])

  const handlePromoRedeem = async () => {
    if (!promoCode) {
      toast.error("Please enter a promo code.")
      return
    }
    try {
      const res = await axios.post("/promo/apply", { code: promoCode })
      toast.success(res.data.message || "Promo applied successfully!")
      setPromoCode("")
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to apply promo.")
    }
  }

  const handleSpecialRedeem = async () => {
    const token = localStorage.getItem("token")
    if (!specialCode) {
      toast.error("Please enter a special redeem code.")
      return
    }
    try {
      const res = await axios.post(
        "/redeem/claim",
        { code: specialCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      toast.success(res.data.message || "Special code redeemed!")
      setSpecialCode("")
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to redeem special code.")
    }
  }

  return (
    <>
      <Helmet>
        <title>Promo Code | Free Redeem Code Daily</title>
        <meta name="description" content="Enter your promo code or special redeem code to claim rewards." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-3xl mb-4 shadow-lg">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  Redeem Your Code
                </h2>
                <p className="text-gray-400">Enter codes to claim amazing rewards</p>
              </div>

              <div className="space-y-8">
                {/* Promo Code Section */}
                <div className="bg-slate-800/30 rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Promo Code</h3>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={handlePromoRedeem}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Special Redeem Code Section */}
                <div className="bg-slate-800/30 rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center gap-3 mb-4">
                    <Gift className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">Special Redeem Code</h3>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter special code"
                      value={specialCode}
                      onChange={(e) => setSpecialCode(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={handleSpecialRedeem}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Claim
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    to="/my-wallet"
                    className="group flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl hover:border-green-400/50 transition-all duration-300"
                  >
                    <div className="p-2 bg-green-500/20 rounded-xl">
                      <Wallet className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">My Wallet</p>
                      <p className="text-gray-400 text-sm">Check balance</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/transactions"
                    className="group flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl hover:border-blue-400/50 transition-all duration-300"
                  >
                    <div className="p-2 bg-blue-500/20 rounded-xl">
                      <History className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">History</p>
                      <p className="text-gray-400 text-sm">View transactions</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="text-center">
                  <p className="text-gray-500 text-sm">
                    Use valid promo or special codes. Each can be redeemed only once.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PromoCode
