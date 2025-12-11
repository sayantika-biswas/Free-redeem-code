"use client"

// Home.jsx
import { useEffect } from "react"
import { Gift, Lock, Sparkles, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import RedeemCodes from "../components/RedeemCodes"
import SpecialRedeemCode from "../components/SpecialRedeemCode"
import CardSection from "./CardSection"
import StatisticsDashboard from "./StatisticsDashboard"
import YoutubeRedeemCodeCard from "./YoutubeRedeemCodeCard"
// import axios from "../utils/axios";
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Card = ({ icon: Icon, title, description, gradient, to, onClick, locked }) => {
  const isButton = typeof onClick === "function"
  const Wrapper = isButton ? "div" : Link
  const wrapperProps = isButton ? { onClick } : { to }

  return (
    <Wrapper
      {...wrapperProps}
      className="gaming-card aspect-[4/3] md:aspect-square overflow-hidden group relative w-full cursor-pointer slide-in-up hover:scale-105 transition-all duration-500"
    >
      <div className={`absolute inset-0 ${gradient} opacity-80 group-hover:opacity-100 transition-all duration-500`} />

      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative h-full flex flex-col items-center justify-center text-white p-6 md:p-8">
        <div className="relative">
          <Icon className="w-20 h-20 mb-4 group-hover:scale-110 transition-transform duration-500 zoom-animation" />
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center gradient-text mb-2">{title}</h2>

        {locked && (
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-6 h-6 text-yellow-400" />
            <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
        )}

        <p className="mt-2 md:mt-4 text-white/90 text-center text-sm md:text-base leading-relaxed">{description}</p>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-2 text-xs text-white/80">
            <Zap className="w-3 h-3" />
            <span>Click to explore</span>
            <Zap className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

function Home() {
  const navigate = useNavigate()

  const handleClick = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.info("Please login to access promo codes.", {
        className: "!bg-slate-800 !text-white !border !border-purple-500/30",
      })
      return
    }
    navigate("/special-rewards")
  }

  useEffect(() => {
    if (!localStorage.getItem("guestId")) {
      const guestId = crypto.randomUUID()
      localStorage.setItem("guestId", guestId)
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Free Redeem Code Daily</title>
        <meta
          name="description"
          content="Get the latest free redeem codes for top apps and games like Google Play BGMI, Free Fire, and more. Unlock daily rewards, participate in special events, and stay updated with exclusive offers. Join our community to never miss a code!"
        />
        <meta
          name="keywords"
          content="redeem codes, game, free fire, pubg, bgmi, amazon, spotify, daily rewards, exclusive offers, special events"
        />
        <link rel="canonical" href="https://freeredeemcodedaily.com/" />
        <meta property="og:title" content="Free Redeem Code Daily Redeem Code Daily" />
        <meta
          property="og:description"
          content="Get the latest free redeem codes for top apps and games like Google Play BGMI, Free Fire, and more. Unlock daily rewards, participate in special events, and stay updated with exclusive offers."
        />
        <meta property="og:url" content="https://freeredeemcodedaily.com/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="text-center mt-10 mb-12 slide-in-up">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 float-animation">Gaming Rewards Hub</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Unlock exclusive codes, earn rewards, and level up your gaming experience
        </p>
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 glass-morphism px-6 py-3 rounded-full">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-sm text-white/80">New codes added daily</span>
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>

      <CardSection />
      <YoutubeRedeemCodeCard />
      <StatisticsDashboard />
      <SpecialRedeemCode />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto px-4">
        <Card
          icon={Gift}
          to="/free-rewards"
          title="Free Rewards"
          description="Get Free Fire diamonds, Google Play codes, and more! Discover new codes every day and maximize your gaming experience."
          gradient="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800"
          locked={false}
        />
        <Card
          icon={Gift}
          onClick={handleClick}
          to="/special-rewards"
          title="Special Rewards"
          description="Login to access special rewards, participate in exclusive events, and unlock premium codes available only to members."
          gradient="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-800"
        />
      </div>

      <RedeemCodes />
    </>
  )
}

export default Home
