"use client"

import { useState, useEffect } from "react"
import { Calendar, Trophy, Gift, Flame, Star, CheckCircle } from "lucide-react"
import axios from "../utils/axios"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet"

function DailyLoginRewards({ guestId }) {
  const today = new Date().toISOString().split("T")[0]
  const [streak, setStreak] = useState(0)
  const [claimedDays, setClaimedDays] = useState([])
  const [alertShown, setAlertShown] = useState(false)

  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  const isTodayClaimed = claimedDays.includes(today)
  const progress = (claimedDays.length / 30) * 100

  useEffect(() => {
    const fetchClaimedDays = async () => {
      try {
        const res = await axios.get("/daily-login/history", {
          withCredentials: true,
          headers: { "x-guest-id": guestId },
        })

        const claimedDates = res.data.map((entry) => new Date(entry.date).toISOString().split("T")[0])
        console.log("Claimed Dates:", claimedDates)
        setClaimedDays(claimedDates)
        setStreak(claimedDates.length)
      } catch (err) {
        console.error("Failed to fetch claimed days:", err)
      }
    }

    fetchClaimedDays()
  }, [guestId])

  const handleClaim = async () => {
    if (isTodayClaimed) {
      if (!alertShown) {
        toast.error("Already claimed for today!")
        setAlertShown(true)
      }
      return
    }

    try {
      const res = await axios.post(
        "/daily-login/claim",
        {},
        {
          withCredentials: true,
          headers: { "x-guest-id": guestId },
        },
      )

      if (res.data.reward === "🪙3000") {
        toast.success("🎉 🪙3000 added to your wallet for 30-day streak!")
      } else {
        toast.success("✅ Day claimed! Keep logging in.")
      }

      setClaimedDays((prev) => [...prev, today])
      setStreak((prev) => prev + 1)
      setAlertShown(false)
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please log in to claim your reward.")
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Something went wrong.")
      }
      console.error("Claim failed:", error)
    }
  }

  return (
    <>
      <Helmet>
        <title>Daily Login Rewards - Free Redeem Code Daily</title>
        <meta name="description" content="Login daily for 30 days to earn rewards." />
        <link rel="canonical" href="https://freeredeemcodedaily.com/daily-login" />
        <meta property="og:title" content="Daily Login Rewards - Free Redeem Code Daily" />
        <meta property="og:description" content="Login daily for 30 days to earn rewards." />
        <meta property="og:url" content="https://freeredeemcodedaily.com/daily-login" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl mb-4 shadow-lg">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
              Daily Login Rewards
            </h1>
            <p className="text-gray-400">Complete 30 consecutive days to earn the ultimate reward</p>
          </div>

          {/* Main Reward Card */}
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-yellow-500/30 mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 via-transparent to-orange-600/10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl">
                    <Flame className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Current Streak</h2>
                    <p className="text-gray-400">Keep the momentum going!</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-yellow-400 mb-1">{streak}</div>
                  <p className="text-gray-400 text-sm">{streak === 1 ? "day" : "days"}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 text-sm">Progress to Ultimate Reward</span>
                  <span className="text-yellow-400 font-semibold">{claimedDays.length}/30 days</span>
                </div>
                <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Ultimate Reward Display */}
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6 text-center">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-yellow-400 mb-1">Ultimate Reward</h3>
                <div className="text-3xl font-bold text-white">🪙3000</div>
                <p className="text-gray-300 text-sm mt-2">Complete all 30 days to unlock</p>
              </div>
            </div>
          </div>

          {/* Warning Alert */}
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-xl">
                <Calendar className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-red-400 font-semibold text-sm">⚠️ Important Notice</p>
                <p className="text-gray-300 text-sm">
                  You must login consecutively for 30 days. Missing a day will reset your progress to 0!
                </p>
              </div>
            </div>
          </div>

          {/* Days Grid */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50 mb-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-400" />
              30-Day Challenge
            </h3>

            <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
              {days.map((day, index) => {
                const isClaimed = index < claimedDays.length
                const isToday = claimedDays[index] === today
                const isNextToClaim = index === claimedDays.length && !isToday

                return (
                  <div
                    key={day}
                    className={`relative p-4 rounded-xl border text-center font-medium transition-all duration-300 ${
                      isClaimed
                        ? "bg-green-500/20 border-green-500/30 text-green-400"
                        : isToday
                          ? "bg-blue-500/20 border-blue-500/30 text-blue-400"
                          : isNextToClaim
                            ? "bg-gradient-to-r from-purple-600 to-cyan-600 border-purple-400 text-white shadow-lg"
                            : "bg-slate-800/50 border-gray-600 text-gray-400"
                    }`}
                  >
                    <p className="font-bold text-sm mb-1">Day {day}</p>
                    <p className="text-xs mb-2">🪙100</p>
                    {isClaimed && (
                      <div className="absolute -top-1 -right-1">
                        <CheckCircle className="w-5 h-5 text-green-400 bg-slate-900 rounded-full" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Claim Button */}
          <div className="text-center">
            <button
              onClick={handleClaim}
              className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex items-center gap-3">
                <Gift className="w-6 h-6" />
                Claim Daily Reward
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DailyLoginRewards
