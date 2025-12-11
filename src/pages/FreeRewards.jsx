import { Gift } from "lucide-react";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const rewardsData = [
  {
    slug: "free-fire-diamonds",
    title: "Free Fire Diamonds",
    description: "Get free diamonds for Free Fire",
    img: "https://play-lh.googleusercontent.com/__sFbjeWJumZIO08G8ygUWNdhEeBYgJj6EpvwTDU2Xu4gYucFNN6nsWu-hC4xc2Vlck",
    textColor: "text-purple-700",
  },
  {
    slug: "google-play-codes",
    title: "Google Play Codes",
    description: "Redeem free Google Play gift cards",
    img: "https://freelogopng.com/images/all_img/1664285914google-play-logo-png.png",
    textColor: "text-sky-700",
  },
  {
    slug: "redeem-code-generator",
    title: "Redeem Code Generator",
    description: "Generate Free Redeem Code (100% Working)",
    img: "https://freelogopng.com/images/all_img/1664285914google-play-logo-png.png",
    textColor: "text-emerald-700",
  },
  {
    slug: "guess-number-game",
    title: "Guess Number Game",
    description: "Just guess the correct number and get a redeem code",
    img: "https://m.media-amazon.com/images/I/61BRwWBPKfL.png",
    textColor: "text-green-700",
  },
  {
    slug: "flip-a-coin",
    title: "Flip a Coin",
    description: "Flip the coin and if you win, you get a redeem code",
    img: "https://cdn3d.iconscout.com/3d/premium/thumb/hand-flipping-coin-3d-icon-download-in-png-blend-fbx-gltf-file-formats--action-cash-charity-gesture-pack-sign-symbols-icons-9993167.png?f=webp",
    textColor: "text-lime-700",
  },
  {
    slug: "invite-and-earn",
    title: "Invite & Earn",
    description: "Invite friends and earn rewards together",
    img: "https://cdni.iconscout.com/illustration/premium/thumb/referral-program-illustration-download-in-svg-png-gif-file-formats--refer-a-friend-marketing-scheme-offer-programs-pack-people-illustrations-3926260.png",
    textColor: "text-yellow-600",
  },
];

const RewardCard = ({ title, description, img, textColor, slug }) => (
  <Link
    to={`/${slug}`}
    className="bg-gradient-to-br from-purple-100 via-cyan-100 to-emerald-100 border border-purple-200 rounded-2xl shadow-xl p-7 hover:shadow-2xl transition-all group hover:scale-[1.04] hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-100 hover:via-purple-100 hover:to-cyan-100"
  >
    <div className="flex flex-col items-center text-center">
      <img
        src={img}
        alt={title}
        className="w-28 h-28 mb-5 rounded-2xl bg-white p-2 object-contain shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
      />
      <h2 className={`text-2xl font-bold ${textColor} drop-shadow mb-1`}>{title}</h2>
      <p className="mt-2 text-gray-700 text-base font-medium group-hover:text-emerald-600 transition-colors duration-300">{description}</p>
    </div>
  </Link>
);

function FreeRewards() {
  return (
    <>
      <Helmet>
        <title>Free Rewards - Free Redeem Code Daily</title>
        <meta
          name="description"
          content="Get Free Rewards of your favourite games"
        />
        <link
          rel="canonical"
          href="https://freeredeemcodedaily.com/free-rewards"
        />
        <meta
          property="og:title"
          content="Free Rewards - Free Redeem Code Daily"
        />
        <meta
          property="og:description"
          content="Get Free Rewards of your favourite games"
        />
        <meta
          property="og:url"
          content="https://freeredeemcodedaily.com/free-rewards"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="  py-12 px-4 flex flex-col items-center mt-[100px]">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-400 to-sky-500 text-transparent bg-clip-text">
          <Gift size={20} className="inline-block mr-2" /> Claim Your Free
          Rewards
        </h1>

        <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewardsData.map((card, idx) => (
            <RewardCard key={idx} {...card} />
          ))}
        </div>
      </div>
    </>
  );
}

export default FreeRewards;
