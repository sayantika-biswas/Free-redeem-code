import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPage = () => {
  return (
    <>
    <Helmet>
      <title>Privacy Policy | Free Redeem Code Daily</title>
      <meta
        name="description"
        content="Read our privacy policy to understand how we collect, use, and protect your information."
      />
      <meta name="keywords" content="privacy policy, data protection, user information" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://freeredeemcodedaily.com/privacy-policy" />
      <meta property="og:title" content="Privacy Policy | Free Redeem Code Daily" />
      <meta property="og:description" content="Read our privacy policy to understand how we collect, use, and protect your information." />
      <meta property="og:url" content="https://freeredeemcodedaily.com/privacy-policy" />
      <meta property="og:type" content="website" />
    </Helmet>
    <div className="flex justify-center items-start px-3 sm:px-6 lg:px-8 py-10 mt-[80px]">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Privacy Policy</h1>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">Information We Collect</h2>
        <p className="text-gray-700 mb-2">
          We collect and store the following information:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>Free Fire UID</li>
          <li>Task completion status</li>
          <li>Redemption history</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">How We Use Your Information</h2>
        <p className="text-gray-700 mb-2">Your information is used solely for:</p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>Reward distribution</li>
          <li>Verification of task completion</li>
          <li>Prevention of fraud</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">Data Security</h2>
        <p className="text-gray-700">
          We implement appropriate security measures to protect your information from unauthorized access or disclosure.
        </p>
      </div>
    </div>
    </>
  );
};

export default PrivacyPage;
