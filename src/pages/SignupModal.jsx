"use client"

import { useState } from "react"
import { X, Gamepad2, Zap, Gift, Eye, EyeOff } from "lucide-react"
import axios from "../utils/axios"
import { toast } from "react-toastify"

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name cannot contain numbers"
    } else if (formData.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    } else if (formData.password.length > 20) {
      newErrors.password = "Password must be under 20 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const response = await axios.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })

      const { success, message } = response.data

      if (success === false) {
        setErrors({ email: message, password: message })
        return
      }
      toast.success("Signup successful! Please login.")
      setErrors({})
      onClose() // Close signup modal
      onSwitchToLogin() // Open login modal
    } catch (err) {
      console.error("Signup error:", err)
      const errorMsg = err.response?.data?.message || "Something went wrong during signup."
      toast.error(errorMsg)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-purple-500/30 p-8 relative animate-fadeIn overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 p-1 rounded-full hover:bg-white/10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Join the Arena
            </h2>
            <p className="text-gray-400 text-sm">Create your gaming account</p>
          </div>

          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
            <div className="flex items-center gap-2 text-yellow-400 font-medium">
              <Gift className="w-5 h-5" />
              <span>Welcome Bonus: 🪙100 Coins!</span>
            </div>
            <p className="text-yellow-300/80 text-sm mt-1">Claim your starter coins on first login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Player Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your gaming name"
                maxLength={50}
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="player@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a secure password"
                maxLength={20}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12"
              />
              <button
                type="button"
                className="absolute right-4 top-14 transform -translate-y-1/2 text-slate-400 hover:text-purple-400"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-6 h-6  transition-colors duration-200 group-hover:text-purple-400 text-slate-400 drop-shadow-md" style={{ filter: 'drop-shadow(0 0 4px #a78bfa)' }} />
                ) : (
                  <Eye className="w-6 h-6  transition-colors duration-200 group-hover:text-purple-400 text-slate-400 drop-shadow-md" style={{ filter: 'drop-shadow(0 0 4px #a78bfa)' }} />
                )}
              </button>
              {errors.password && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12"
              />
              <button
                type="button"
                className="absolute right-4 top-14 transform -translate-y-1/2 text-slate-400 hover:text-purple-400"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-6 h-6 transition-colors duration-200 group-hover:text-purple-400 text-slate-400 drop-shadow-md" style={{ filter: 'drop-shadow(0 0 4px #a78bfa)' }} />
                ) : (
                  <Eye className="w-6 h-6 transition-colors duration-200 group-hover:text-purple-400 text-slate-400 drop-shadow-md" style={{ filter: 'drop-shadow(0 0 4px #a78bfa)' }} />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                Create Account
              </span>
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => {
                  onClose()
                  onSwitchToLogin()
                }}
                className="text-purple-400 font-medium hover:text-purple-300 cursor-pointer transition-colors"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupModal
