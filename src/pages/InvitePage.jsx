import React from 'react';
import { Helmet } from 'react-helmet';
import { FaUserFriends, FaCheckCircle, FaGift } from "react-icons/fa";

function InviteFriendsSection() {
  return (
    <>
      <Helmet>
        <title> Invite Friends - Free Redeem Code Daily</title>
        <meta
          name="description"
          content="Invite your friends to Free Redeem Code Daily and earn rewards."
        />
        <meta
          name="keywords"
          content="redeem codes, game, free fire, pubg, bgmi, amazon, spotify"
        />
        <link rel="canonical" href="https://freeredeemcodedaily.com/invite-and-earn" />
        <meta property="og:title" content="Invite Friends - Free Redeem Code Daily" />
        <meta
          property="og:description"
          content="Invite your friends to Free Redeem Code Daily and earn rewards."
        />
        <meta property="og:url" content="https://freeredeemcodedaily.com/invite-and-earn" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="  bg-gray-100 py-6  mt-[90px]  "> {/* Removed mt-[180px] for better spacing */}
        {/* Top Advertisement Section */}
        {/* <div className="bg-gray-100 border border-gray-300 rounded-md p-3 text-center text-gray-700 font-semibold text-sm mx-2 sm:mx-4 md:mx-6 lg:mx-8 mb-4">
          Advertisement
        </div> */}

        <main className="max-w-4xl mx-auto px-4 ">
          {/* Invite Friends & Earn Section */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center justify-center mb-4">
              {/* Replaced img with SVG person icon and matched color from the provided image */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 text-[#24906F]" // Color matched from the provided image
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-center text-xl font-bold text-gray-800 mb-4">Invite Friends & Earn 🪙500</h2>

            <div className="mb-6 bg-gray-400 p-5 rounded-md">
              <p className="text-sm text-gray-800 mb-2 ">Invite Progress</p>
              <div className="relative w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: '10%' }} // Adjust based on invite progress (1/10)
                ></div>
                <span className="absolute right-0 top-0 -mt-5 text-xs text-gray-600">1/10 Invites</span>
              </div>
            </div>

            {/* Advertisement Section within Invite Friends */}
            <div className="bg-gray-100 border border-gray-300 rounded-md p-4 text-center text-gray-700 font-semibold text-lg mb-6">
              Advertisement
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
              {/* Card 1 - Invite Friends */}
              <button className="flex flex-col items-center p-4 rounded-md border border-gray-300 text-gray-700 bg-gray-500 hover:bg-gray-400 transition-colors">
                <FaUserFriends className="w-6 h-6 text-blue-500 mb-1" />
                <span className="text-xs text-center text-gray-800">Invite Friends</span>
              </button>

              {/* Card 2 - Complete 10 Invites */}
              <button className="flex flex-col items-center p-4 rounded-md border border-gray-300 text-gray-700 bg-gray-500 hover:bg-gray-400 transition-colors">
                <FaCheckCircle className="w-6 h-6 text-purple-500 mb-1" />
                <span className="text-xs text-gray-800 text-center">Complete 10 Invites</span>
              </button>

              {/* Card 3 - Get 🪙500 Reward */}
              <button className="flex flex-col items-center p-4 rounded-md border border-gray-300 text-gray-700 bg-gray-500 hover:bg-gray-400 transition-colors">
                <FaGift className="w-6 h-6 text-red-500 mb-1" />
                <span className="text-xs text-center text-gray-800">Get 🪙500 Reward</span>
              </button>
            </div>


            <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center justify-between cursor-pointer">
              <div>

                <p className="text-sm text-gray-400">Ads</p>
              </div>

            </div>
          </div>

          {/* Invite Now Button Section */}
          <div className="bg-green-600 rounded-lg p-3 text-center mb-4 cursor-pointer hover:bg-green-700 transition-colors">
            <button className="flex items-center justify-center w-full text-white text-lg font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.769-.283 1.093m0-2.186A9.75 9.75 0 0 1 12 15.75c2.665 0 5.174-.86 7.217-2.343m0 0a2.25 2.25 0 1 0 0 2.186m0-2.186c-.18.324-.283.696-.283 1.093s.103.769.283 1.093M3.75 6.25c-.18.324-.283.696-.283 1.093s.103.769.283 1.093m0-2.186a9.75 9.75 0 0 1 7.217-2.343m0 0a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324-.283.696-.283 1.093s-.103.769-.283 1.093m-4.773 2.186A9.75 9.75 0 0 0 3.75 12c0 2.665.86 5.174 2.343 7.217m0 0a2.25 2.25 0 1 0 0 2.186m0-2.186c-.18.324-.283.696-.283 1.093s.103.769.283 1.093"
                />
              </svg>
              Invite Now
            </button>
          </div>

          {/* Bottom Advertisement Section */}
          <div className="bg-gray-100 border border-gray-300 rounded-md p-3 text-center text-gray-700 font-semibold text-sm mb-4">
            Advertisement
          </div>

          {/* PDF Options Section */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            {/* <div className="grid grid-cols-3 gap-2 sm:gap-4">
          
            <div className="flex flex-col items-center p-2 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-2 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 21l-3.279-3.279A3.375 3.375 0 0 1 3.75 14.25V6.75a3.375 3.375 0 0 1 3.375-3.375H12m0 15.75h3.375C17.129 21 18 20.129 18 19.125V16.5a3.375 3.375 0 0 0-3.375-3.375H13.5M12 12H9.75" />
              </svg>
              <p className="font-semibold text-sm text-gray-800 mb-1 text-center">Free mein PDF le lo</p>
              <p className="text-xs text-gray-500 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                ApplyTube PDF
              </p>
            </div>
            <div className="flex flex-col items-center p-2 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
            
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-2 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 21l-3.279-3.279A3.375 3.375 0 0 1 3.75 14.25V6.75a3.375 3.375 0 0 1 3.375-3.375H12m0 15.75h3.375C17.129 21 18 20.129 18 19.125V16.5a3.375 3.375 0 0 0-3.375-3.375H13.5M12 12H9.75" />
              </svg>
              <p className="font-semibold text-sm text-gray-800 mb-1 text-center">Continue</p>
              <p className="text-xs text-gray-500 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                PDF Applytube
              </p>
            </div>
            <div className="flex flex-col items-center p-2 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
              
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-2 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 21l-3.279-3.279A3.375 3.375 0 0 1 3.75 14.25V6.75a3.375 3.375 0 0 1 3.375-3.375H12m0 15.75h3.375C17.129 21 18 20.129 18 19.125V16.5a3.375 3.375 0 0 0-3.375-3.375H13.5M12 12H9.75" />
              </svg>
              <p className="font-semibold text-sm text-gray-800 mb-1 text-center">View</p>
              <p className="text-xs text-gray-500 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                Full PDF
              </p>
            </div>
          </div> */}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8 pb-4">
            Share with your friends on WhatsApp to earn rewards
          </p>
        </main>
      </div>
    </>
  );
}

export default InviteFriendsSection;
