// import React, { useState } from 'react';
// import { Wallet, ChevronRight } from 'lucide-react'; // Importing icons from lucide-react
// import { useWallet } from '../context/WalletContext';

// function RedeemBalancePage() {
//   const [selectedAmount, setSelectedAmount] = useState(null);
//   const [email, setEmail] = useState('');
//   const { walletBalance } = useWallet();

//   const handleRedeem = () => {
//     if (selectedAmount === null) {
//       alert('Please select an amount to redeem.');
//       return;
//     }
//     if (!email) {
//       alert('Please enter your email address.');
//       return;
//     }
//     if (selectedAmount > walletBalance) {
//       alert('Insufficient balance to redeem this amount.');
//       return;
//     }
//     // Implement your redemption logic here
//     console.log(`Redeeming 🪙${selectedAmount} to ${email}`);
//     alert(`Redeeming 🪙${selectedAmount} to ${email}. Processing in 24-48 hours.`);
//     // You might want to clear state or navigate away after successful redemption
//     setSelectedAmount(null);
//     setEmail('');
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
//         {/* Google Play Logo */}
//         <div className="flex justify-center mb-6">
//           {/* You would typically use an actual image here */}
//           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" className="h-16 w-16 sm:h-20 sm:w-20 object-contain" />
//         </div>

//         {/* Header and Balance */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Redeem Balance</h1>
//           <div className="flex items-center text-gray-600">
//             <Wallet className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
//             <span className="text-sm sm:text-base">Balance: 🪙{walletBalance}</span>
            
//           </div>
//         </div>


         

//         {/* Select Amount Section */}
//         <div className="mb-6">
//           <p className="text-gray-700 text-sm sm:text-base font-medium mb-3">Select Amount</p>
//           <div className="grid grid-cols-3 gap-3">
//             {[30, 50, 100].map((amount) => (
//               <button
//                 key={amount}
//                 className={`py-3 px-2 sm:py-4 rounded-xl border-2 transition-all duration-200
//                   ${selectedAmount === amount
//                     ? 'border-purple-600 bg-purple-50 text-purple-700'
//                     : 'border-gray-300 bg-gray-50 text-gray-800 hover:border-gray-400'
//                   } text-sm sm:text-base font-medium focus:outline-none`}
//                 onClick={() => setSelectedAmount(amount)}
//               >
//                 🪙{amount}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Email Address Input */}
//         <div className="mb-8">
//           <p className="text-gray-700 text-sm sm:text-base font-medium mb-3">Email Address</p>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 text-sm sm:text-base"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         {/* Redeem Now Button */}
//         <button
//           className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl shadow-md transition duration-300 ease-in-out flex items-center justify-center text-base sm:text-lg"
//           onClick={handleRedeem}
//         >
//           Redeem Now <ChevronRight className="w-5 h-5 ml-2" />
//         </button>

//         {/* Information List */}
//         <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 mt-8">
//           <ul className="list-disc pl-5 text-gray-600 text-xs sm:text-sm space-y-2">
//             <li>Google Play code will be sent to your email</li>
//             <li>Processing time: 24-48 hours</li>
//             <li>Amount will be deducted immediately</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RedeemBalancePage;
