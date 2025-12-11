"use client"

import { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Footer from "./components/Footer"
import FreeRewards from "./pages/FreeRewards"
import Task from "./pages/Task"
import Home from "./pages/Home"
import FAQ from "./pages/FAQ"
import SlugComponents from "./components/SlugComponents"
import PromoCode from "./components/PromoCode"
import MyWallet from "./components/MyWallet"
import Withdraw from "./components/Withdraw"
import Navbar from "./Component/Navbar"
import SpinAndWinGame from "./pages/SpinAndWinGame"
import DailyLoginRewards from "./pages/DailyLoginRewards"
import LoginModal from "./pages/LoginModal"
import SignupModal from "./pages/SignupModal"
import YouTubeRedeemApps from "./pages/YouTubeRedeemApps"
import ProfilePage from "./pages/ProfilePage"
import WalletPage from "./pages/Wallet"
import TransactionHistoryCard from "./Component/TransactionHistoryCard"
import ContactUs from "./pages/ContactUs"
import FooterContent from "./pages/FooterContent"
import SpinGame from "./pages/SpinGame"
import InviteNow from "./components/InviteNow"
import { ToastContainer } from "react-toastify"
import PrivateRoute from "./components/PrivateRoutes"
import axios from "./utils/axios"
import Sidebar from "./Component/Sidebar"
import ParticleBackground from "./components/ParticleBackground"
import GamingEffects from "./components/GamingEffects"

export default function App() {
  const [loadingUser, setLoadingUser] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) // toggle for mobile
  const navigate = useNavigate()

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoadingUser(false)
        return
      }

      try {
        const res = await axios.get("/auth/profile")
        setCurrentUser(res.data.user)
      } catch (err) {
        console.error("Auto-login failed", err)
        localStorage.removeItem("token")
      } finally {
        setLoadingUser(false)
      }
    }

    loadUser()
  }, [])

  const handleBundleSelect = (bundle) => {
    navigate("/spin-game", { state: { selectedBundle: bundle } }) // ✅ Pass bundle in state
    setIsSidebarOpen(false) // close sidebar on mobile
  }

  const handleInviteClose = () => {
    navigate("/") // Navigate to home page
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      <GamingEffects />

      <div className="fixed w-full z-50">
        {!loadingUser && (
          <Navbar
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowLogin={setShowLogin}
            setShowSignup={setShowSignup}
          />
        )}
      </div>

      <ToastContainer
        theme="dark"
        toastClassName="!bg-slate-800/90 !text-white !border !border-purple-500/20 !backdrop-blur-sm"
        progressClassName="!bg-gradient-to-r !from-purple-500 !to-pink-500"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="flex flex-1 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-48 h-48 bg-pink-500 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-32 h-32 bg-yellow-500 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <Sidebar onSelect={handleBundleSelect} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className="flex-1 w-full mb-12 mt-4 px-4 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spin-game" element={<SpinGame />} />
            <Route path="/spin-and-win" element={<SpinAndWinGame />} />
            <Route path="/free-rewards" element={<FreeRewards />} />
            <Route path="/daily-login" element={<DailyLoginRewards />} />
            <Route path="/youtube-apps" element={<YouTubeRedeemApps />} />
            <Route path="/invite-and-earn" element={<InviteNow onClose={handleInviteClose} />} />
            <Route path="/task" element={<Task />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/:slug" element={<SlugComponents />} />
            <Route path="/footer/:slug" element={<FooterContent />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route
              path="/wallet" 
              element={
                <PrivateRoute currentUser={currentUser}>
                  <WalletPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/wallet/history"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <TransactionHistoryCard />
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <TransactionHistoryCard />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-wallet"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <MyWallet />
                </PrivateRoute>
              }
            />
            <Route
              path="/withdraw"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <Withdraw />
                </PrivateRoute>
              }
            />
            <Route
              path="/promo-code"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <PromoCode />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>

      <Footer />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        setCurrentUser={setCurrentUser}
        openSignupModal={() => {
          setShowLogin(false)
          setShowSignup(true)
        }}
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
