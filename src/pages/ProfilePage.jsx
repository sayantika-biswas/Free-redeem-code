import React, { useEffect, useState } from "react";
import { User, Wallet, History, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DailyPromoCode from "../components/DailyPromoCode";
import axios from "../utils/axios";
import { Helmet } from "react-helmet";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

    useEffect(() => {
    const fetchUserProfile = async () => {
      try {
      

        const response = await axios.get("/auth/profile");

        setUserData(response.data.user);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
        console.error("Profile fetch error:", err);
        if (err.response?.status === 401) {
          // Unauthorized - token expired or invalid
          localStorage.removeItem("token");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

    if (loading) {
    return (
      <div className="p-4 max-w-2xl mx-auto mt-[130px] flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-2xl mx-auto mt-[130px] text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="p-4 max-w-2xl mx-auto mt-[130px] text-center">
        No user data available
      </div>
    );
  }

  // Format the join date
  const joinDate = new Date(userData.createdAt).toLocaleDateString();

  return (
     <>
     <Helmet>
      <title>Profile | Free Redeem Code Daily</title>
      <meta
        name="description"
        content="View and manage your profile information."
      />
      <meta name="keywords" content="profile, user information, account settings" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://freeredeemcodedaily.com/profile" />
      <meta property="og:title" content="Profile | Free Redeem Code Daily" />
      <meta property="og:description" content="View and manage your profile information." />
      <meta property="og:url" content="https://freeredeemcodedaily.com/profile" />
      <meta property="og:type" content="website" />
    </Helmet>
    <div className=" p-4 flex flex-col gap-4 max-w-2xl mx-auto mt-[130px]">
      

      {/* User Profile */}
      <div className="bg-gradient-to-br from-purple-100 via-cyan-100 to-white rounded-3xl shadow-lg p-6 flex items-center gap-6 mb-2">
        <div className="bg-gradient-to-br from-purple-400 to-cyan-400 p-4 rounded-full shadow">
          <User className="text-white w-8 h-8" />
        </div>
        <div>
          <p className="text-lg font-bold text-gray-800">{userData.name}</p>
          <p className="text-sm text-gray-500">{userData.email}</p>
          <p className="text-xs text-gray-400">Member since: {joinDate}</p>
        </div>
      </div>

      {/* Ad Section */}
      {/* <div className="h-32 bg-white rounded-2xl shadow flex items-center justify-center text-gray-400 text-sm">
        <span>Ads by Google</span>
      </div> */}

      {/* Promo Code Card */}
      <DailyPromoCode />

      {/* Ad Section */}
      {/* <div className="h-32 bg-white rounded-2xl shadow flex items-center justify-center text-gray-400 text-sm">
        <span>Ads by Google</span>
      </div> */}

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => navigate("/my-wallet")}
          className="bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl p-5 flex flex-col items-center shadow cursor-pointer hover:scale-[1.03] transition-transform"
        >
          <Wallet className="text-blue-600 mb-2 w-7 h-7" />
          <p className="text-base font-semibold text-blue-700">Wallet</p>
          <p className="text-xs text-blue-500">🪙{userData.wallet}</p>
        </div>
        <div
          onClick={() => navigate("/my-wallet")}
          className="bg-gradient-to-br from-green-100 to-green-300 rounded-xl p-5 flex flex-col items-center shadow cursor-pointer hover:scale-[1.03] transition-transform"
        >
          <History className="text-green-600 mb-2 w-7 h-7" />
          <p className="text-base font-semibold text-green-700">History</p>
          <p className="text-xs text-green-500">View transactions</p>
        </div>
        <div
          onClick={() => navigate("/withdraw")}
          className="bg-gradient-to-br from-pink-100 to-pink-300 rounded-xl p-5 flex flex-col items-center shadow cursor-pointer hover:scale-[1.03] transition-transform"
        >
          <Gift className="text-pink-600 mb-2 w-7 h-7" />
          <p className="text-base font-semibold text-pink-700">Redeem</p>
          <p className="text-xs text-pink-500">Get rewards</p>
        </div>
      </div>

      {/* Footer Info Boxes */}
      <div className="rounded-2xl p-4 shadow grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-3">
          <p className="font-semibold text-purple-700">Redeem Promo Code</p>
          <p className="text-xs text-purple-500">Use a promo code to get rewards</p>
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-3">
          <p className="font-semibold text-blue-700">Redeem History</p>
          <p className="text-xs text-blue-500">View your Google Play codes</p>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-3">
          <p className="font-semibold text-green-700">Free Rewards</p>
          <p className="text-xs text-green-500">Earn more rewards</p>
        </div>
        <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl p-3">
          <p className="font-semibold text-pink-700">Special Rewards</p>
          <p className="text-xs text-pink-500">Exclusive member rewards</p>
        </div>
      </div>
    </div>
     </>
  );
}

export default ProfilePage;
