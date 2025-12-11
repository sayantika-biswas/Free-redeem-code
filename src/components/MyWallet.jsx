"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Wallet, Plus, History, Gift, Coins, TrendingUp, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import axios from "../utils/axios"
import TransactionHistoryCard from "../Component/TransactionHistoryCard"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet"

const MyWallet = () => {
  const navigate = useNavigate()
  const [walletBalance, setWalletBalance] = useState(0)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const token = localStorage.getItem("token")
        const headers = { Authorization: `Bearer ${token}` }

        // Fetch wallet balance
        const walletRes = await axios.get("/auth/wallet", { headers })
        setWalletBalance(walletRes.data.wallet || 0)

        // Fetch transaction history
        const txRes = await axios.get("/transactions", { headers })
        setTransactions(txRes.data || [])
      } catch (error) {
        toast.error(`Failed to load wallet data. Make sure to Login`, error)
      }
    }

    fetchWalletData()
  }, [])

  return (
    <>
      <Helmet>
        <title>My Wallet | Free Redeem Code Daily</title>
        <meta name="description" content="View and manage your wallet balance, transaction history, and more." />
        <meta name="keywords" content="wallet, transactions, balance" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeredeemcodedaily.com/my-wallet" />
        <meta property="og:title" content="My Wallet | Free Redeem Code Daily" />
        <meta property="og:description" content="View and manage your wallet balance." />
        <meta property="og:url" content="https://freeredeemcodedaily.com/my-wallet" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-500/30 mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl shadow-lg">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Gaming Wallet</h1>
                    <p className="text-gray-400 text-sm">Your digital treasure chest</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm mb-1">Available Balance</p>
                  <div className="flex items-center gap-2">
                    <Coins className="w-6 h-6 text-yellow-400" />
                    <span className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      {walletBalance}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-gray-700">
                  <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-xs">Total Earned</p>
                  <p className="text-white font-semibold">🪙{walletBalance}</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-gray-700">
                  <History className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-xs">Transactions</p>
                  <p className="text-white font-semibold">{transactions.length}</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-gray-700">
                  <Gift className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-xs">Rewards</p>
                  <p className="text-white font-semibold">Active</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => navigate("/promo-code")}
              className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-600/5 group-hover:from-purple-600/20 group-hover:to-purple-600/10 transition-all duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-4 shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Add Coins</h3>
                <p className="text-gray-400 text-sm">Use promo codes to earn</p>
                <div className="mt-3 flex items-center justify-center gap-1 text-purple-400 text-sm">
                  <span>Redeem Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </button>

            <div className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-cyan-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-transparent to-cyan-600/5"></div>
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl mb-4 shadow-lg">
                  <History className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">History</h3>
                <p className="text-gray-400 text-sm">View all transactions</p>
                <div className="mt-3 flex items-center justify-center gap-1 text-cyan-400 text-sm">
                  <span>Scroll Down</span>
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/withdraw")}
              className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-green-600/5 group-hover:from-green-600/20 group-hover:to-green-600/10 transition-all duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4 shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Withdraw</h3>
                <p className="text-gray-400 text-sm">Get Google Play codes</p>
                <div className="mt-3 flex items-center justify-center gap-1 text-green-400 text-sm">
                  <span>Cash Out</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          </div>

          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50">
            <TransactionHistoryCard transactions={transactions} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MyWallet
