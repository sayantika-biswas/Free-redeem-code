import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const DIAMOND_PACKS = [100, 200, 500, 1000, 5000];

const FreeDiamonds = () => {
  const [uid, setUid] = useState("");
  const [showDiamonds, setShowDiamonds] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = /^\d{6,15}$/.test(uid);
    if (isValid) {
      setShowDiamonds(true);
      setError("");
    } else {
      setShowDiamonds(false);
      setError("UID must be between 6 to 15 digits.");
    }
  };

  return (
    <>
    <Helmet>
      <title>Free Fire Diamonds | Free Redeem Code Daily</title>
      <meta
        name="description"
        content="Get free Fire Diamonds by completing simple tasks. Enter your UID to start earning rewards. Join now and enjoy exclusive offers."
      />
      <meta name="keywords" content="Free Fire, Diamonds, rewards" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://freeredeemcodedaily.com/free-fire-diamonds" />
      <meta property="og:title" content="Free Fire Diamonds | Free Redeem Code Daily" />
      <meta property="og:description" content="Get free Fire Diamonds by completing simple tasks." />
      <meta property="og:url" content="https://freeredeemcodedaily.com/free-fire-diamonds" />
      <meta property="og:type" content="website" />
    </Helmet>
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl text-center font-bold mb-6  bg-gradient-to-r from-emerald-500 to-sky-500 text-transparent bg-clip-text">
        Free Fire Diamonds
      </h1>
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center  bg-gradient-to-r from-emerald-500 to-sky-500 text-transparent bg-clip-text">
          Enter Your Free Fire UID
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="uid" className="block text-sm font-medium text-gray-700 mb-1">
              Free Fire UID
            </label>
            <input
              type="text"
              id="uid"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your UID"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-emerald-400 to-sky-400 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
        </form>
      </div>

      {showDiamonds && (
        <div className="w-full max-w-5xl mt-12">
          <div className="text-center mb-8 text-black text-lg">
            Free Fire UID: <span className="font-bold">{uid}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIAMOND_PACKS.map((amount) => (
              <Link
                to={`/task`}
                key={amount}
                className="relative w-full rounded-2xl p-6 bg-white bg-opacity-90 backdrop-blur-md shadow-xl flex flex-col items-center justify-center gap-4 hover:scale-105 transition-transform"
              >
                <img
                  src="https://freefireupdate.com/wp-content/uploads/2021/10/diamond_box.png"
                  alt={`${amount} Diamonds`}
                  className="w-24 h-24 object-contain mb-2"
                />
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 text-transparent bg-clip-text">
                  {amount} Diamonds
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default FreeDiamonds;
