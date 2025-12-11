// import axios from "../utils/axios";
// import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdComponent = () => {
  // const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const res = await axios.get("/ads?page=home");
  //       setAds(res.data);
  //     } catch (error) {
  //       console.error("Failed to load ads:", error);
  //     }
  //   };
  //   fetchAds();
  // }, []);

  const handleSpinClick = () => {
    navigate("/spin-and-win"); // navigate to your route
  };
  const handleDailyLoginClick = () => {
    navigate("/daily-login"); // navigate to your route
  };
  return (
    <div className="  p-4 sm:p-8 flex flex-col items-center mt-[110px]">
      {/* {ads
        .filter((ad) => ad.position === "top")
        .map((ad) => (
          <div key={ad._id} className="text-center mb-8">
            <div className="text-neutral-400 text-sm mb-3 font-medium">
              Sponsored Content
            </div>
            <div
              className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
              dangerouslySetInnerHTML={{ __html: ad.adCode }}
            />
          </div>
        ))} */}
      {/* Cards Section */}
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Spin & Win Card */}
        <div
          className="relative p-6 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center text-center"
          style={{
            background: "linear-gradient(135deg, #9648a4ff 0%, #FFC107 100%)", // Updated for exact match to image
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "30px 30px",
            }}
          ></div>
          <div
            onClick={handleSpinClick}
            className="relative z-10 p-4 cursor-pointer"
          >
            <div className="bg-white bg-opacity-30 rounded-full p-4 mb-4 inline-flex items-center justify-center">
              {/* Spin Icon SVG - Updated to match the image */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 0 .671.742l3.016.603a.75.75 0 0 0 .148-1.484l-2.39-1.331V9Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-white mb-2">
              Spin & Win
            </h2>
            <p className="text-white text-opacity-80">
              Try your luck to win 🪙500
            </p>
          </div>
        </div>

        {/* Daily Login Card */}
        <div
          onClick={handleDailyLoginClick}
          className="relative cursor-pointer  p-6 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center text-center"
          style={{
            background:
              "linear-gradient(135deg, #2E7D32 0%, #9dd1e6ff 100%, #2E7D32)", // Updated for exact match to image
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "30px 30px",
            }}
          ></div>
          <div className="relative z-10 p-4">
            <div className="bg-white bg-opacity-30 rounded-full p-4 mb-4 inline-flex items-center justify-center">
              {/* Calendar Icon SVG - Updated to match the image */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6.75Zm-1.5 9.75a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5H5.25ZM5.25 14.25a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5H5.25ZM5.25 17.25a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5H5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-white mb-2">
              Daily Login
            </h2>
            <p className="text-white text-opacity-80">
              Login daily to earn 🪙3000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdComponent;
