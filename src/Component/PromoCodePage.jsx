// import React, { useState } from 'react';
// import { Trash2, Wallet, History } from 'lucide-react'; // Importing icons from lucide-react
// // import { useWallet } from '../context/WalletContext';

// import { useNavigate } from "react-router-dom";


// function PromoCodePage() {
//     const [promoCode, setPromoCode] = useState('');
//     // const [walletBalance, setWalletBalance] = useState(0); // Initialize wallet balance
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//     const [redeemedAmount, setRedeemedAmount] = useState(0);
//     // const { walletBalance, setWalletBalance,addTransaction } = useWallet();
    
//  const navigate = useNavigate();
//     // const handleRedeem = () => {
//     //     // Basic validation (you can enhance this)
//     //     if (promoCode.trim() === '') {
//     //         alert('Please enter a promo code.');
//     //         return;
//     //     }

//         // Simulate successful redemption
//         // const amountToAdd = 1; // Assuming each redemption adds 🪙1 as per your image
//         // setWalletBalance(prevBalance => prevBalance + amountToAdd);
//         // setRedeemedAmount(amountToAdd);
//         // setShowSuccessMessage(true);
    

// //   const amountToAdd = 1;
// //   setWalletBalance(prev => prev + amountToAdd);
// //   setRedeemedAmount(amountToAdd);
// //   setShowSuccessMessage(true);
// //   setPromoCode('');
// //   setTimeout(() => setShowSuccessMessage(false), 3000);


// //         // Clear the input after redemption attempt
// //         setPromoCode('');

// //         // Hide the success message after a few seconds
// //         setTimeout(() => {
// //             setShowSuccessMessage(false);
// //         }, 3000); // 3 seconds
// //     };



// const handleRedeem = () => {
//   if (promoCode.trim() === '') {
//     alert('Please enter a promo code.');
//     return;
//   }

//   const amountToAdd = 1;
//   const code = promoCode.trim().toUpperCase();
//   const timestamp = new Date();

//   // Update wallet
//   setWalletBalance(prev => prev + amountToAdd);

//   // Add transaction to history
//   addTransaction({
//     type: 'Redeem',
//     code,
//     amount: amountToAdd,
//     date: timestamp.toLocaleDateString(),
//     time: timestamp.toLocaleTimeString(),
//   });

//   setRedeemedAmount(amountToAdd);
//   setShowSuccessMessage(true);
//   setPromoCode('');

//   setTimeout(() => setShowSuccessMessage(false), 3000);
// };

//     return (
//         <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col items-center mt-[140px]">
//             <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
//                 {/* Success Messages */}
//                 {/* {showSuccessMessage && (
//                     <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-2">
//                         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md flex items-center">
//                             <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                             </svg>
//                             <span>New wallet balance: 🪙{walletBalance}</span>
//                         </div>
//                         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md flex items-center">
//                             <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                             </svg>
//                             <span>Successfully redeemed 🪙{redeemedAmount}!</span>
//                         </div>
//                     </div>
//                 )} */}
//                 {showSuccessMessage && (
//         <div className="fixed flex top-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2 z-50 transition-opacity duration-300 ease-in-out opacity-100">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="w-5 h-5 text-green-500"
//           >
//             <path
//               fillRule="evenodd"
//               d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span className="text-gray-700 text-sm font-medium">New wallet balance: 🪙{walletBalance}</span>
//           <br></br>
//            <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="w-5 h-5 text-green-500"
//           >
//             <path
//               fillRule="evenodd"
//               d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span className='text-gray-700 text-sm font-medium'>Successfully redeemed 🪙{redeemedAmount}!</span>
//         </div>
//       )}

//                 {/* Trash Icon */}
//                 <div className="h-32 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 text-sm mb-6">
//                     {/* This area can be used for more information or related content */}
//                     Another Content Area
//                 </div>
//                 <div className="flex justify-center mb-6">
//                     <Trash2 className="w-12 h-12 text-gray-500" />
//                 </div>

//                 {/* Enter Your Promo Code Section */}
//                 <h2 className="text-center text-xl sm:text-2xl font-semibold text-purple-700 mb-6">
//                     Enter Your Promo Code
//                 </h2>

//                 {/* Promo Code Input and Button */}
//                 <div className="flex flex-col sm:flex-row gap-3 mb-8">
//                     <input
//                         type="text"
//                         placeholder="Enter promo code"
//                         className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
//                         value={promoCode}
//                         onChange={(e) => setPromoCode(e.target.value)}
//                     />
//                     <button
//                         className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 ease-in-out"
//                         onClick={handleRedeem}
//                     >
//                         Redeem
//                     </button>
//                 </div>

//                 {/* Placeholder for content below input (as seen in image) */}
//                 <div className="h-48 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 text-sm mb-8">
//                     {/* This area can be used for displaying redemption status, offers, etc. */}
//                     Content Area
//                 </div>

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-around sm:justify-center gap-4 sm:gap-8 mb-8">
//                     <button onClick={() => navigate("/wallet")}  className="flex flex-col items-center text-gray-600 hover:text-purple-700 transition duration-300 ease-in-out">
//                         <Wallet className="w-6 h-6 sm:w-7 sm:h-7 mb-1" />
//                         <span className="text-sm sm:text-base">View Wallet</span>
//                     </button>
//                     <button onClick={() => navigate("/wallet/history")} className="flex flex-col items-center text-gray-600 hover:text-purple-700 transition duration-300 ease-in-out">
//                         <History className="w-6 h-6 sm:w-7 sm:h-7 mb-1" />
//                         <span className="text-sm sm:text-base">Transaction History</span>
//                     </button>
//                 </div>

//                 {/* Another Placeholder content area */}
//                 <div className="h-32 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 text-sm mb-6">
//                     {/* This area can be used for more information or related content */}
//                     Another Content Area
//                 </div>

//                 {/* Footer Note */}
//                 <p className="text-xs text-gray-500 text-center px-2">
//                     Enter a valid promo code to receive rewards in your wallet. Each promo code can only be used once.
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default PromoCodePage;
