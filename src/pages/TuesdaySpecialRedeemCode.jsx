import React from 'react';

function TuesdaySpecialRedeemCode () {
  return (
    <div className="flex justify-center items-center  bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-xl p-4 md:p-8 relative overflow-hidden">
        {/* Decorative dots in the background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" fill="none" viewBox="0 0 100 100">
            {Array.from({ length: 50 }).map((_, i) => {
              const x = Math.random() * 100;
              const y = Math.random() * 100;
              const r = Math.random() * 0.5 + 0.1; // Random radius for dots
              return <circle key={i} cx={x} cy={y} r={r} fill="white" />;
            })}
          </svg>
        </div>

        <div className="relative z-10 flex flex-col space-y-4">
          {/* Top section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-white">
            <h2 className="flex items-center text-xl md:text-2xl font-semibold mb-2 md:mb-0">
              <span className="mr-2 text-2xl md:text-3xl">⭐</span> Tuesday Special Redeem Code
            </h2>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm md:text-base">
              <span className="mr-2">Worth 🪙5000</span>
              <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-full transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM11 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
                </svg>
                Digital code
              </button>
            </div>
          </div>

          {/* Placeholder for the large empty space */}
          <div className="flex-grow min-h-[150px] md:min-h-[200px]">
            {/* You can add content here if needed, or leave it empty for spacing */}
          </div>

          {/* Unlock Special Code button */}
          <div className="w-full">
            <button className="w-full bg-white bg-opacity-30 hover:bg-opacity-40 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center text-lg">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              Unlock Special Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuesdaySpecialRedeemCode;
