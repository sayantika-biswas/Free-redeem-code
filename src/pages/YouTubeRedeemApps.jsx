import React, { useState, useEffect } from "react";
import { Search, Download, Play, Link, ClipboardList, Calendar } from "lucide-react";
import axios from "../utils/axios";
import { Helmet } from "react-helmet";

function YouTubeRedeemApps() {
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [search, setSearch] = useState("");
  const [showCopiedModal, setShowCopiedModal] = useState(false);
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get("/youtube-codes");
        setCodes(response.data);
      } catch (err) {
        console.error("Error fetching codes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCodes();
  }, []);

  const filteredCodes = codes.filter(code => {
    const monthMatch = selectedMonth === "All Months" || 
      new Date(code.createdAt).toLocaleString('default', { month: 'long' }) === selectedMonth;
    const searchMatch = code.title.toLowerCase().includes(search.toLowerCase());
    return monthMatch && searchMatch;
  });

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans mt-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <>
    <Helmet>
      <title>YouTube Redeem Code | Free Redeem Code Daily</title>
      <meta
        name="description"
        content="watch the YouTube videos to earn redeem codes."
      />
      <meta name="keywords" content="YouTube, redeem codes, apps" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://freeredeemcodedaily.com/youtube-apps" />
      <meta property="og:title" content="YouTube Redeem Code | Free Redeem Code Daily" />
      <meta property="og:description" content="watch the YouTube videos to earn redeem codes." />
      <meta property="og:url" content="https://freeredeemcodedaily.com/youtube-apps" />
      <meta property="og:type" content="website" />
    </Helmet>
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans mt-[100px]">
      <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-6 text-[#3B82F6] drop-shadow-md">
        YouTube Redeem Code Apps
      </h1>

      <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-8">
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-8">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              className="w-full border border-purple-300 rounded-xl py-2.5 px-5 pl-11 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 ease-in-out shadow-md text-base placeholder:text-purple-400"
              placeholder="Search by app name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-4 top-3 text-purple-400" size={22} />
          </div>

          <div className="flex items-center gap-3 border border-purple-300 rounded-xl px-4 py-2.5 bg-white shadow-md">
            <Calendar size={22} className="text-purple-500" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-white focus:outline-none text-purple-700 font-semibold rounded-lg px-2 py-1 text-base"
            >
              <option value="All Months">All Months</option>
              <option value="jan">Jan</option>
              <option value="feb">Feb</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="aug">Aug</option>
              <option value="sept">Sept</option>
              <option value="oct">Oct</option>
              <option value="nov">Nov</option>
              <option value="dec">Dec</option>
            </select>
          </div>
        </div>
      </div>

      {filteredCodes.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-10">
          No apps found for the selected criteria.
        </div>
      ) : (
        <div className="mb-12 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center" style={{marginLeft: '40px'}}>
            {filteredCodes.map((code) => (
              <div
                key={code._id}
                className="bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 rounded-2xl border border-purple-200 shadow-xl p-6 flex flex-col gap-4 relative transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:border-pink-400 hover:bg-gradient-to-br hover:from-pink-100 hover:via-purple-100 hover:to-blue-100"
              >
                <span className="absolute top-3 right-3 bg-purple-200 text-purple-800 text-xs font-bold px-2 py-1 rounded-full border border-purple-300 shadow">
                  {new Date(code.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </span>

                <div className="flex items-center gap-3 text-xl font-bold text-purple-700 mb-2">
                  <img
                    src="https://freelogopng.com/images/all_img/1664285914google-play-logo-png.png"
                    alt="Play Store"
                    className="w-8 h-8 rounded shadow"
                  />
                  {code.title}
                </div>

                {code.applink.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2.5 rounded-xl flex items-center justify-center gap-3 text-base font-semibold transition duration-200 ease-in-out shadow-md hover:shadow-lg hover:scale-[1.03]"
                  >
                    <Download size={22} /> Download App {code.applink.length > 1 ? index + 1 : ''}
                  </a>
                ))}

                {code.videolink.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2.5 rounded-xl flex items-center justify-center gap-3 text-base font-semibold transition duration-200 ease-in-out shadow-md hover:shadow-lg hover:scale-[1.03]"
                  >
                    <Play size={22} /> Watch Video {code.videolink.length > 1 ? index + 1 : ''}
                  </a>
                ))}

                {code.refercode && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(code.refercode);
                      setShowCopiedModal(true);
                    }}
                    className="bg-gradient-to-r from-green-500 to-green-400 text-white py-2.5 rounded-xl flex items-center justify-center gap-3 text-base font-semibold transition duration-200 ease-in-out shadow-md hover:shadow-lg hover:scale-[1.03]"
                  >
                    <ClipboardList size={22} /> Copy Redeem Code
                  </button>
                )}

                {code.weblink.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-purple-500 text-white py-2.5 rounded-xl flex items-center justify-center gap-3 text-base font-semibold transition duration-200 ease-in-out shadow-md hover:shadow-lg hover:scale-[1.03]"
                  >
                    <Link size={22} /> Website Link {code.weblink.length > 1 ? index + 1 : ''}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {showCopiedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl text-center relative">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 rounded-full p-2">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-lg font-bold text-gray-800">Refer Code Copied</h2>
            <p className="text-gray-600 text-sm mt-1 mb-5">
              Refer code copied successfully!
            </p>
            <button
              onClick={() => setShowCopiedModal(false)}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-1.5 rounded-full text-sm font-semibold shadow"
            >
              OK
            </button>
            <button
              onClick={() => setShowCopiedModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default YouTubeRedeemApps;
