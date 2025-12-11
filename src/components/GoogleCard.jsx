import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const redeemOptions = [
  {
    amount: 30,
    image:
      "https://freelogopng.com/images/all_img/1664285914google-play-logo-png.png",
  },
  {
    amount: 50,
    image:
      "https://freelogopng.com/images/all_img/1664285914google-play-logo-png.png",
  },
  {
    amount: 100,
    image:
      "https://freelogopng.com/images/all_img/1664285914google-play-logo-png.png",
  },
  {
    amount: 200,
    image:
      "https://freelogopng.com/images/all_img/1664285914google-play-logo-png.png",
  },
  {
    amount: 500,
    image:
      "https://freelogopng.com/images/all_img/1664285914google-play-logo-png.png",
  },
];

const GoogleCard = () => {
  return (
    <>
      <Helmet>
        <title>Get Google Play Gift Card | Free Redeem Code Daily</title>
        <meta name="description" content="Choose from a variety of Google Play Gift Cards to redeem exciting rewards. Select your preferred amount and start earning rewards today." />
        <meta name="keywords" content="Google Play, Gift Card, rewards" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeredeemcodedaily.com/google-play-codes" />
        <meta property="og:title" content="Get Google Play Gift Card | Free Redeem Code Daily" />
        <meta property="og:description" content="Choose from a variety of Google Play Gift Cards to redeem exciting rewards." />
        <meta property="og:url" content="https://freeredeemcodedaily.com/google-play-codes" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 mt-[70px]">
        <div className="relative z-10">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
              Select Your Google Play Gift Card
            </h2>
            <p className="text-gray-300 mt-2 text-base font-medium">
              Choose from the available card amounts below
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {redeemOptions.map((item, index) => (
              <React.Fragment key={index}>
                <Link
                  to={"/task"}
                  className="relative w-full rounded-3xl px-10 py-12 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-gray-900/60 via-purple-900/40 to-blue-900/40 shadow-xl border border-purple-400/30 transition-all duration-300 ease-in-out hover:scale-[1.05] hover:shadow-2xl hover:border-cyan-400 hover:bg-gradient-to-br hover:from-cyan-900/40 hover:via-purple-900/40 hover:to-blue-900/40 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt="Google Play"
                    className="w-24 h-24 object-contain drop-shadow-lg rounded-2xl mb-2"
                  />
                  <div className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                    🪙{item.amount}
                  </div>
                  <p className="text-gray-200 text-base font-semibold">
                    Google Play Gift Card
                  </p>
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleCard;
