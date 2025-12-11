"use client"

import { ArrowRight, Gift, Users, Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa"
import LoginModal from "../pages/LoginModal"
import SignupModal from "../pages/SignupModal"

const userData = [
  { name: "Trisha Bhardwaj", amount: 30 },
  { name: "Manoj Narula", amount: 10 },
  { name: "Yamini Kulshreshtha", amount: 50 },
  { name: "Oindrila Trivedi", amount: 500 },
]

function Navbar({ currentUser, setCurrentUser }) {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setCurrentUser(null)
    window.location.reload()
  }

  return (
    <div className="w-full">
      <div className="px-4 py-3 flex items-center justify-between text-white relative bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 shadow-lg border-b border-purple-500/30">
        {/* Left: Home */}
        <Link to="/" className="flex items-center text-2xl gap-1 hover:text-cyan-400 transition-colors">
          <FaHome className="text-xl h-7 w-7 drop-shadow-lg" />
        </Link>

        <h1 className="text-white bg-gradient-to-r from-cyan-400 to-blue-600 font-bold text-lg sm:text-xl absolute left-1/2 -translate-x-1/2 bg-clip-text text-transparent drop-shadow-lg">
          EARN REDEEM CODE
        </h1>

        <div className="hidden sm:flex gap-2 items-center">
          {currentUser ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm px-4 py-2 rounded-lg flex items-center gap-1 shadow-lg border border-purple-400/30 transition-all hover:scale-105"
              >
                {currentUser.name}
              </button>
              <button
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-sm px-4 py-2 rounded-lg flex items-center gap-1 shadow-lg border border-red-400/30 transition-all hover:scale-105"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-sm px-4 py-2 rounded-lg flex items-center gap-1 shadow-lg border border-cyan-400/30 transition-all hover:scale-105"
                onClick={() => setShowLogin(true)}
              >
                <FaSignInAlt className="text-sm" /> Login
              </button>
              <button
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-sm px-4 py-2 rounded-lg flex items-center gap-1 shadow-lg border border-green-400/30 transition-all hover:scale-105"
                onClick={() => setShowSignup(true)}
              >
                <FaUserPlus className="text-sm" /> Sign Up
              </button>
            </>
          )}
        </div>

        <button
          className="sm:hidden p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg border border-purple-400/30"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="text-white w-5 h-5" />
        </button>

        {menuOpen && (
          <div className="absolute right-4 bg-gray-900/90 backdrop-blur-md top-full text-white z-50 rounded-xl shadow-2xl p-4 px-8 space-y-3 sm:hidden border border-purple-500/30">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    navigate("/profile")
                    setMenuOpen(false)
                  }}
                  className="block w-full text-left hover:text-cyan-400 transition-colors py-2"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left hover:text-red-400 transition-colors py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowLogin(true)
                    setMenuOpen(false)
                  }}
                  className="block w-full text-left hover:text-cyan-400 transition-colors py-2"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowSignup(true)
                    setMenuOpen(false)
                  }}
                  className="block w-full text-left hover:text-green-400 transition-colors py-2"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {userData.length > 0 && shouldAnimate && (
        <div className="bg-gradient-to-r from-gray-900 via-purple-900/50 to-gray-900 py-3 marquee-wrapper">
          <div className="marquee-track">
            {[...userData, ...userData].map((user, index) => (
              <div
                key={index}
                className="mx-3 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-800/50 to-blue-800/50 text-white flex-shrink-0 border border-purple-500/30 shadow-lg backdrop-blur-sm"
              >
                <span className="text-cyan-400 font-semibold">{user.name}</span>{" "}
                <span className="text-gray-300">generated</span>{" "}
                <span className="text-green-400 font-semibold">🪙{user.amount}</span>{" "}
                <span className="text-gray-300">redeem code</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        onClick={() => navigate("/invite-and-earn")}
        className="w-full bg-gradient-to-r from-pink-600/70 via-purple-600/70 to-blue-600/70 backdrop-blur-sm text-white py-4 px-6 flex items-center justify-center space-x-6 shadow-lg cursor-pointer hover:from-pink-700/80 hover:via-purple-700/80 hover:to-blue-700/80 transition-all border-b border-purple-500/30 fixed bottom-0 left-0 z-40"
        
      >
        <div className="flex items-center space-x-2 bounce-animation">
          <Users className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-semibold">Invite 10 Friends</span>
        </div>
        <Gift className="w-5 h-5 zoom-animation text-yellow-400" />
        <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform">
          Get 🪙500
        </button>
        <div className="flex items-center space-x-1 cursor-pointer hover:text-cyan-400 transition-colors">
          <span className="font-semibold">Claim Now</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        openSignupModal={() => {
          setShowLogin(false)
          setShowSignup(true)
        }}
        setCurrentUser={setCurrentUser}
      />
      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false)
          setShowLogin(true)
        }}
        setCurrentUser={setCurrentUser}
      />
    </div>
  )
}

export default Navbar
