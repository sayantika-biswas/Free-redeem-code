import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const SpecialRewards = () => {
  const navigate = useNavigate();

  const handleClick = () => {
  navigate('/promo-code');
};

  return (
    <>
    <Helmet>
      <title>Special Rewards | Free Redeem Code Daily</title>
      <meta
        name="description"
        content="Discover exclusive rewards and offers."
      />
      <meta name="keywords" content="special rewards, promo codes, exclusive offers" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://freeredeemcodedaily.com/special-rewards" />
      <meta property="og:title" content="Special Rewards | Free Redeem Code Daily" />
      <meta property="og:description" content="Discover exclusive rewards and offers." />
      <meta property="og:url" content="https://freeredeemcodedaily.com/special-rewards" />
      <meta property="og:type" content="website" />
    </Helmet>
    <div className="text-center p-6 w-full max-w-3xl items-center justify-center mx-auto mt-[100px]">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Special Rewards</h2>
      {/* <div className="h-32 bg-gray-100 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-sm text-gray-500">
        Ad Space
      </div> */}

      <div className="my-8 flex justify-center">
        <button onClick={handleClick} className="bg-white shadow-lg rounded-xl p-6 text-center ">
          <img src="https://img.freepik.com/premium-vector/promo-code-template-promo-code-discount-vector-flat-illustration-geometric-ribbon-coupon-code-isolated-white-background_175838-1077.jpg" alt="Promo Code" className="h-24 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-pink-700">Promo Code</h3>
          <p className="text-md text-gray-600">Redeem special promo codes for exclusive rewards</p>
        </button>
      </div>
      {/* <div className="h-32 bg-gray-100 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-sm text-gray-500">
        Ad Space
      </div> */}
    </div>
    </>
  );
};

export default SpecialRewards;
