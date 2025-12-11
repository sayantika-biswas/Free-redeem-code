"use client"

import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import axios from "../utils/axios"

const InviteNow = ({ onClose }) => {
  const [copied, setCopied] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userInvites] = useState(0) // You can update this from backend later
  const [error, setError] = useState(null)
  const totalInvites = 10

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/profile") // Ensure token is included
        setUserId(res.data.user._id)
        // Optionally fetch invite count too
        // setUserInvites(res.data.inviteCount || 0);
      } catch (error) {
        console.error("Failed to fetch user", error)
        setError("Please login to access this feature")
      }
    }

    fetchUser()
  }, [])

  const referralLink = `https://freeredeemcodedaily.com/invite?ref=${userId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    const message = encodeURIComponent(`Join this app and earn rewards! Use my link: ${referralLink}`)
    window.open(`https://wa.me/?text=${message}`, "_blank")
  }

  const progressPercent = (userInvites / totalInvites) * 100

  return (
    <>
      <Helmet>
        <title> Invite Friends - Free Redeem Code Daily</title>
        <meta name="description" content="Invite your friends to Free Redeem Code Daily and earn rewards." />
        <meta name="keywords" content="redeem codes, game, free fire, pubg, bgmi, amazon, spotify" />
        <link rel="canonical" href="https://freeredeemcodedaily.com/invite-and-earn" />
        <meta property="og:title" content="Invite Friends - Free Redeem Code Daily" />
        <meta property="og:description" content="Invite your friends to Free Redeem Code Daily and earn rewards." />
        <meta property="og:url" content="https://freeredeemcodedaily.com/invite-and-earn" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-xl shadow-2xl space-y-6 mt-[120px] border border-purple-500/30 backdrop-blur-sm relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded-full flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-110"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          🎁 Invite & Earn
        </h2>

        <p className="text-center text-gray-300 text-sm">
          Invite friends and earn <span className="text-green-400 font-semibold">🪙25</span> per referral.
        </p>

        <div className="bg-gray-800/50 border border-purple-500/30 px-4 py-3 rounded-lg flex justify-between items-center text-sm backdrop-blur-sm">
          <span className="truncate text-gray-300">{referralLink}</span>
          <button
            onClick={handleCopy}
            className="ml-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 py-1 rounded hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 hover:scale-105"
            disabled={!userId}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <button
          onClick={handleShare}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 hover:scale-105 shadow-lg"
          disabled={!userId}
        >
          📲 Share via WhatsApp
        </button>

        <div>
          <div className="flex justify-between text-sm mb-1 text-gray-400">
            <span>Invited: {userInvites}</span>
            <span>Target: {totalInvites}</span>
          </div>
          <div className="w-full h-3 bg-gray-700 rounded-full border border-purple-500/30">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InviteNow
