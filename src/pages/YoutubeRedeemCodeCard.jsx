import React from 'react';
import { Link } from 'react-router-dom';

function YoutubeRedeemCodeCard  ()  {
  

  return (
    <Link to="/youtube-apps" className="flex justify-center items-center p-4">
      <div className="bg-gradient-to-br from-red-100 via-white to-purple-100 rounded-2xl shadow-xl p-7 flex items-center gap-6 max-w-3xl w-full hover:scale-[1.02] transition-transform">
        {/* YouTube Icon with NEW tag */}
        <div className="relative flex-shrink-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
            alt="YouTube Icon"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg shadow-lg border-4 border-white"
          />
          <span className="absolute -top-3 -left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12">
            NEW
          </span>
        </div>

        {/* Text content */}
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Youtube Videos</h2>
          <p className="text-gray-600 text-base mb-3">
            Watch YouTube videos and get redeem codes for popular apps instantly!
          </p>
          <div className="flex items-center">
            <span className="inline-block bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition-colors text-sm cursor-pointer">
              Click to Open
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 text-purple-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default YoutubeRedeemCodeCard;
