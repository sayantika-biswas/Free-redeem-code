"use client"

import { useState, useEffect } from "react"
import { X, Gamepad2, Zap, Eye, EyeOff } from "lucide-react"
import axios from "../utils/axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function LoginModal({ isOpen, onClose, setCurrentUser, openSignupModal }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  // Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      setEmail("")
      setPassword("")
      setErrors({})
    }
  }, [isOpen])

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address"
    }

    if (!password.trim()) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      try {
        const response = await axios.post("/auth/login", {
          email,
          password,
        })

        const { success, user, token, message } = response.data
        if (success === false) {
          setErrors({ email: message, password: message })
          return
        }

        // ✅ Store token BEFORE making any authenticated request
        localStorage.setItem("token", token)

        toast.success("LogIn successful!")
        setCurrentUser(user)

        const guestId = localStorage.getItem("guestId")
        if (!guestId) return

        try {
          // Try both migrations
          const dailyLoginRes = await axios.post("/daily-login/migrate")
          await Promise.all([
            axios.post("/spin/migrate"),
            axios.post("/flipcoin/migrate"),
            axios.post("/game-spin/migrate"),
          ])

          // ✅ Show reward toast if eligible
          if (dailyLoginRes.data.rewardInfo?.rewardGiven) {
            toast.success(`₹${dailyLoginRes.data.rewardInfo.rewardAmount} credited to your wallet!`)
          }

          // Remove guestId after successful migration
          localStorage.removeItem("guestId")
        } catch (error) {
          console.error(error.response?.data?.message || "Migration failed:", error)
        }

        onClose()
        navigate(-1)
      } catch (err) {
        console.error("Login failed:", err)
        const errorMsg = err.response?.data?.message || "Invalid email or password"
        setErrors({ email: errorMsg, password: errorMsg })
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-purple-500/30 p-8 relative animate-fade-in overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm">Enter the gaming arena</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                placeholder="player@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${
                  errors.password ? "border-red-500" : "border-gray-600"
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 top-8 flex items-center text-slate-400 hover:text-purple-400"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-6 h-6 transition-colors duration-200 group-hover:text-purple-400 text-slate-400 drop-shadow-md" style={{ filter: 'drop-shadow(0 0 4px #a78bfa)' }} />
                ) : (
                  <Eye className="w-6 h-6 transition-colors duration-200 group-hover:text-purple-400 text-slate-400 drop-shadow-md" style={{ filter: 'drop-shadow(0 0 4px #a78bfa)' }} />
                )}
              </button>
              {errors.password && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                Enter Game
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              New to the arena?{" "}
              <span
                onClick={openSignupModal}
                className="text-purple-400 font-medium hover:text-purple-300 cursor-pointer transition-colors"
              >
                Join Now
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
