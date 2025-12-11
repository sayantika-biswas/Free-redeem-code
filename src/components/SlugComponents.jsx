"use client"

import { useParams, useNavigate } from "react-router-dom"
import FreeDiamonds from "../components/FreeDiamonds"
import RedeemCodeGenerator from "../components/RedeemCodeGenerator"
import GoogleCard from "../components/GoogleCard"
import GuessNumberGame from "./GuessNumberGame"
import FlipCoinGame from "./FlipCoinGame"
import InviteNow from "./InviteNow"

const SlugComponents = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const handleClose = () => {
    navigate(-1) // Go back to previous page
  }

  // Match component based on slug
  switch (slug) {
    case "free-fire-diamonds":
      return <FreeDiamonds />
    case "google-play-codes":
      return <GoogleCard />
    case "redeem-code-generator":
      return <RedeemCodeGenerator />
    case "guess-number-game":
      return <GuessNumberGame />
    case "flip-a-coin":
      return <FlipCoinGame />
    case "invite-and-earn":
      return <InviteNow onClose={handleClose} />
    default:
      return <div className="text-center mt-20 text-lg">Reward not found.</div>
  }
}

export default SlugComponents
