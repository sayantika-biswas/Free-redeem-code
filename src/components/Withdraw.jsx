"use client"

import { useState, useEffect } from "react"
import { Gift, Wallet, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import axios from "../utils/axios"
import { toast } from "react-toastify"

const Withdraw = () => {
  const [customAmount, setCustomAmount] = useState("")
  const [upi, setUpi] = useState("")
  const [walletBalance, setWalletBalance] = useState(0)
  const [withdrawStatus, setWithdrawStatus] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        const headers = { Authorization: `Bearer ${token}` }

        const walletRes = await axios.get("/auth/wallet", { headers })
        setWalletBalance(walletRes.data.wallet || 0)

        const statusRes = await axios.get("/auth/withdraw/status", { headers })
        console.log(statusRes.data)
        setWithdrawStatus(statusRes.data.requests || [])
      } catch (error) {
        toast.error("Failed to load wallet or withdrawal status.", error)
      }
    }

    fetchData()
  }, [])

  const handleWithdraw = async () => {
    const amountToWithdraw = Number(customAmount)

    if (!amountToWithdraw || isNaN(amountToWithdraw) || amountToWithdraw <= 0 || !upi.trim()) {
      return toast.error("Enter a valid amount and UPI ID.")
    }

    setLoading(true)
    try {
      const res = await axios.post(
        "/auth/withdraw",
        { amount: amountToWithdraw, upiId: upi },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )

      toast.success(res.data.message)
      setCustomAmount("")
      setUpi("")
      setWalletBalance((prev) => prev - amountToWithdraw)
    } catch (err) {
      toast.error(err.response?.data?.message || "Withdrawal failed.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-400" />
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "pending":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "rejected":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-green-500/30 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-green-600/10"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl mb-4 shadow-lg">
                <Gift className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                Withdraw Balance
              </h2>
              <p className="text-gray-400">Convert your coins to real rewards</p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 mb-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wallet className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Available Balance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">🪙{walletBalance}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Withdrawal Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount to withdraw"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">UPI ID</label>
                <input
                  type="text"
                  placeholder="Enter your UPI ID (e.g., user@paytm)"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  value={upi}
                  onChange={(e) => setUpi(e.target.value)}
                />
              </div>

              <button
                onClick={handleWithdraw}
                disabled={loading}
                className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Gift className="w-5 h-5" />
                    Request Withdrawal
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-400" />
            Withdrawal History
          </h3>

          {withdrawStatus.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800/50 rounded-2xl mb-4">
                <Gift className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-gray-400 text-lg font-medium mb-2">No withdrawals yet</p>
              <p className="text-gray-500 text-sm">Make your first withdrawal request above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {withdrawStatus.map((w) => (
                <div key={w._id} className="bg-slate-800/30 border border-gray-700/50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(w.status)}
                      <div>
                        <p className="font-semibold text-white">₹{w.amount}</p>
                        <p className="text-gray-400 text-sm">{new Date(w.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(w.status)}`}>
                      {w.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Withdraw
