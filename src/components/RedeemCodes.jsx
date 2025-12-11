import React, { useEffect, useState } from "react";
import { Sparkles, RefreshCw, Search, Filter, AlertCircle } from "lucide-react";
import RedeemCard from "./RedeemCard";
import axios from "../utils/axios";

export default function RedeemCodes() {
  const [redeemData, setRedeemData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPromoCodes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/promo/getAll"); // Replace with your actual endpoint
      console.log("redeemData response:", res.data); // 👀
      setRedeemData(res.data);
    } catch (error) {
      console.error("Failed to fetch promo codes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const filteredData = redeemData
    ?.filter(({ amount }) => {
      if (selectedFilter === "🪙10-100") return amount >= 10 && amount <= 100;
      if (selectedFilter === "🪙100+") return amount > 100;
      return true;
    })
    .filter(({ code }) =>
      code.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

  return (
  <div className="relative bg-gradient-to-br from-purple-100 via-cyan-100 to-emerald-100 rounded-2xl shadow-lg p-6 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center bg-gradient-to-br from-purple-400 via-cyan-400 to-emerald-400 rounded-full p-3 shadow-lg">
              <Sparkles className="w-8 h-8 text-white drop-shadow" />
            </span>
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-500 text-transparent bg-clip-text drop-shadow-lg">
              Redeem Google Play Codes
            </h2>
          </div>
          <p className="text-gray-500 text-sm mt-1 font-medium">Updated 22 July 2025</p>
        </div>
        <button
          onClick={fetchPromoCodes}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white rounded-xl hover:opacity-90 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "🪙10-100", "🪙100+"].map((label) => (
            <button
              key={label}
              onClick={() => setSelectedFilter(label)}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl border transition-colors ${
                selectedFilter === label
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Filter className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Alert */}
      <div className="flex items-center gap-2 p-4 rounded-xl bg-yellow-50 border border-yellow-400 text-yellow-700">
        <AlertCircle className="w-5 h-5" />
        <span className="font-medium">
          Click on unlock code to get new redeem codes.
        </span>
      </div>

      {/* Cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item, idx) => (
            <React.Fragment key={idx}>
              <RedeemCard
                code={item.code}
                amount={item.amount}
                image="https://www.freepnglogos.com/uploads/google-play-png-logo/google-severs-music-studio-png-logo-21.png"
              />
              {/* {(idx + 1) % 3 === 0 && (
                <div className="col-span-full bg-gray-100 rounded-lg p-4 text-center text-gray-500 border border-dashed border-gray-300">
                  <div className="h-24 flex items-center justify-center">
                    Simulated Ad Banner
                  </div>
                </div>
              )} */}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
