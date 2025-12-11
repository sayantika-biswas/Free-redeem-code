import React from 'react';
import { Wallet, History, Gift, CreditCard } from 'lucide-react'; // Importing icons from lucide-react
import { useNavigate } from 'react-router-dom';
// import { useWallet } from '../context/WalletContext';




function WalletPage () {
    const navigate = useNavigate();
    // const { walletBalance } = useWallet();

  return (
    <div className=" bg-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col items-center mt-[140px]">
      <div className="w-full max-w-4xl mx-auto">
        {/* Wallet Card Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white mb-6 md:mb-8 flex flex-col justify-between h-48 sm:h-56">
          <div className="flex items-center mb-4">
            <Wallet className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
            <h1 className="text-xl sm:text-2xl font-semibold">My Wallet</h1>
          </div>
          <div className="flex flex-col">
            {/* <p className="text-4xl sm:text-5xl font-bold mb-1">🪙0</p> */}
            {/* <p className="text-4xl sm:text-5xl font-bold mb-1">🪙{walletBalance}</p> */}
            <p className="text-sm sm:text-base text-violet-200">Available Balance</p>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8">
          {/* Add Money Card */}
          <div onClick={() => navigate("/wallet/add-money")} className="bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center text-center cursor-pointer">
            <div className="bg-purple-100 p-3 rounded-full mb-3">
              <CreditCard className="text-purple-600 w-6 h-6" />
            </div>
            <p className="text-base sm:text-lg font-medium text-gray-800">Add Money</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Use a promo code</p>
          </div>

          {/* History Card */}
          <div onClick={() => navigate("/wallet/history")}
 className="bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center text-center cursor-pointer">
            <div className="bg-blue-100 p-3 rounded-full mb-3">
              <History className="text-blue-600 w-6 h-6" />
            </div>
            <p className="text-base sm:text-lg font-medium text-gray-800">History</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">View transactions</p>
          </div>

          {/* Withdraw Card */}
          <div  onClick={() => navigate("/redeem-balance")} className="bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center text-center cursor-pointer">
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <Gift className="text-green-600 w-6 h-6" />
            </div>
            <p className="text-base sm:text-lg font-medium text-gray-800">Withdraw</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Get Google Play codes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default  WalletPage ;
