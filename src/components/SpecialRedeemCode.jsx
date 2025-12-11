// SpecialRedeemCode.jsx
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axios";
// import { useNavigate } from "react-router-dom";

const AdModal = ({ countdown, onClose }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-xl w-[90%] max-w-md text-center relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4"
        aria-label="Close Ad"
      >
        <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
      </button>
      {/* <h2 className="text-lg font-bold mb-2 text-yellow-800">Watch this Ad</h2>
      <p className="text-gray-600 mb-4 text-sm">
        Stay here to complete the ad.
      </p> */}
      <div className="bg-gray-100 w-full rounded-lg py-8 px-4 flex flex-col items-center border border-yellow-200">
        <div className="text-lg font-mono text-orange-500 mb-2">
          ⏳ {countdown} seconds
        </div>
        <p className="text-sm text-gray-600">Unlocking your code...</p>
      </div>
      <p className="mt-6 text-xs text-gray-500 italic">
        Don’t close or refresh early.
      </p>
    </div>
  </div>
);

export default function SpecialRedeemCode() {
  // const [showModal, setShowModal] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [redeemCode, setRedeemCode] = useState("••••-••••-••••-••••");
  const [day, setDay] = useState("");
  // const [timer, setTimer] = useState(5);
  // const intervalRef = useRef(null);

  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setDay(days[new Date().getDay()]);
  }, []);

  const handleWatchAd = () => {
    // setShowModal(true);
    // setUnlocking(true);
    // setTimer(5);
    // setUnlocked(false);

    // intervalRef.current = setInterval(() => {
    //   setTimer((prev) => {
    //     if (prev <= 1) {
    //       clearInterval(intervalRef.current);
    //       setShowModal(false);
    //       setUnlocking(false);
    //       setUnlocked(true);
          fetchRedeemCode();
    //     }
    //     return prev - 1;
    //   });
    // }, 1000);
  };

  const fetchRedeemCode = async () => {
    try {
      const res = await axios.get("/redeem/special-code");
      setRedeemCode(res.data.code);
      toast.success("Use the Special redeem code in Special Rewards!");
    } catch (err) {
      toast.error("Error getting redeem code", err);
    }
  };

  const goToPromoPageWithCode = () => {
    navigator.clipboard.writeText(redeemCode); // copy to clipboard
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 md:p-8 rounded-3xl bg-white/30 backdrop-blur-lg border border-yellow-100 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-300/40 to-yellow-100/30 z-0 rounded-3xl" />
      <div className="relative z-10 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-yellow-800 drop-shadow mb-2">
          ⭐ {day} Special Redeem Code
        </h2>
        <div className="inline-block bg-white px-4 py-1 rounded-full font-semibold text-yellow-700 shadow mb-4 text-sm">
          Worth 🪙100
        </div>
        <div className="h-16 flex items-center justify-center bg-orange-200 rounded-xl my-4 shadow-inner">
          <span className="text-2xl tracking-widest text-orange-500 font-mono select-all">
            {redeemCode}
          </span>
        </div>

        {!unlocked ? (
          <button
            className="w-full my-2 py-2 bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-600 hover:to-orange-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50"
            onClick={handleWatchAd}
            disabled={unlocking}
          >
            {unlocking ? "⏳ Watching Ad..." : "Unlock Special Redeem Code"}
          </button>
        ) : (
          <button
            onClick={goToPromoPageWithCode}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-bold"
          >
            🎯 Special Code Unlocked
          </button>
        )}
      </div>
      {/* {showModal && (
        <AdModal
          countdown={timer}
          onClose={() => clearInterval(intervalRef.current)}
        />
      )} */}
    </div>
  );
}
