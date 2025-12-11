import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const RedeemCodeGenerator = () => {
  const [amount, setAmount] = useState(null);
  const [platform, setPlatform] = useState("Android");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const amounts = [10, 30, 50, 100, 500];

  const handleGenerateCode = async () => {
    if (!amount) {
      alert("Please select an amount first");
      return;
    }

    setLoading(true);

    // Simulate code generation process
    setTimeout(() => {
      setLoading(false);
      // Redirect to /task after loading completes
      navigate("/task");
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Redeem Code Generator | Free Redeem Code Daily</title>
        <meta name="description" content="Generate redeem codes for various platforms and enjoy exciting rewards. Join now and start saving!" />
        <meta name="keywords" content="redeem code, generator, rewards, discounts" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeredeemcodedaily.com/redeem-code-generator" />
        <meta property="og:title" content="Redeem Code Generator | Free Redeem Code Daily" />
        <meta property="og:description" content="Generate redeem codes for various platforms and enjoy exciting rewards." />
        <meta property="og:url" content="https://freeredeemcodedaily.com/redeem-code-generator" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="max-w-xl w-full mx-auto p-8 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-purple-900/20 backdrop-blur-md rounded-2xl shadow-2xl mt-10 space-y-6 border border-purple-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 rounded-2xl"></div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center mb-2">
            🎁 Redeem Code Generator
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-6"></div>

          {/* Amount Selector */}
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-gray-300">Select Amount</h2>
            <div className="flex flex-wrap gap-4">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`px-6 py-3 rounded-xl text-base font-medium transition-all duration-200 backdrop-blur-md border border-purple-400/30 shadow-lg ${
                    amount === amt
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-105"
                      : "bg-gray-900/50 text-gray-300 hover:bg-purple-900/30"
                  }`}
                >
                  🪙{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Platform Selector */}
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-gray-300">Select Platform</h2>
            <div className="flex gap-4">
              {["Android", "iOS"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-md border border-purple-400/30 shadow-lg ${
                    platform === p
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-105"
                      : "bg-gray-900/50 text-gray-300 hover:bg-purple-900/30"
                  }`}
                >
                  {p === "Android" ? "📱 Android" : "🍎 iOS"}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateCode}
            disabled={loading || !amount}
            className={`w-full py-4 my-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg border border-purple-400/50 ${
              loading || !amount
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-105"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Generating...
              </span>
            ) : (
              "Generate Redeem Code"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default RedeemCodeGenerator;
