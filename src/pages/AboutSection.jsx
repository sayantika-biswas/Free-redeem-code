import React from 'react';
import { Gift } from 'lucide-react'; // Optional icon
import { Helmet } from 'react-helmet';

const AboutSection = () => {
  return (
    <>
    <Helmet>
        <title>About - Free Redeem Code Daily</title>
        <meta name="description" content="Learn more about Free Redeem Code Daily, our mission, and our values." />
        <link rel="canonical" href="https://freeredeemcodedaily.com/about" />
        <meta property="og:title" content="About - Free Redeem Code Daily" />
        <meta property="og:description" content="Learn more about Free Redeem Code Daily, our mission, and our values." />
        <meta property="og:url" content="https://freeredeemcodedaily.com/about" />
        <meta property="og:type" content="website" />
      </Helmet>
    <div className="  flex justify-center items-start p-4 sm:p-8 mt-[100px]">
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 max-w-4xl w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-700 mb-4">
          About EARN REDEEM CODE
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          EARN REDEEM CODE is a leading gaming community platform dedicated to
          providing gamers with opportunities to earn rewards and redeem codes
          for their favorite games.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Our mission is to create a trusted platform where gamers can safely
          participate in tasks and activities to earn rewards. We work directly
          with gaming partners and sponsors to ensure legitimate opportunities
          for our users.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Founded in 2023, EARN REDEEM CODE has grown into a vibrant community
          of passionate gamers who share our commitment to fair play and mutual
          support.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Values</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Transparency in all our operations</li>
          <li>Fair opportunities for all users</li>
          <li>Community-focused approach</li>
          <li>Commitment to user safety and privacy</li>
        </ul>

        <button className="mt-6 inline-flex items-center bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-900 transition">
          <Gift className="w-4 h-4 mr-2" />
          Free rewards
        </button>
      </div>
    </div>
    </>
  );
};

export default AboutSection;
