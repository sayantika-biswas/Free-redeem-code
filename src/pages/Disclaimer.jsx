import React from 'react';
import { Helmet } from "react-helmet";

const Disclaimer = () => {
  return (
    <>
    <Helmet>
        <title>Disclaimer - Free Redeem Code Daily</title>
        <meta name="description" content="Read the disclaimer for Free Redeem Code Daily regarding the use of redeem codes and site policies." />
        <link rel="canonical" href="https://freeredeemcodedaily.com/disclaimer" />
        <meta property="og:title" content="Disclaimer - Free Redeem Code Daily" />
        <meta property="og:description" content="Read the disclaimer for Free Redeem Code Daily regarding the use of redeem codes and site policies." />
        <meta property="og:url" content="https://freeredeemcodedaily.com/disclaimer" />
        <meta property="og:type" content="website" />
      </Helmet>
    <div className=" flex justify-center items-start px-3 py-10 sm:px-6 lg:px-8 mt-[90px]">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">Disclaimer</h1>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">Important Notice</h2>
        <p className="text-gray-700 mb-6">
          FREE REDEEM CODE provides this service on an "as is" basis. While we strive to ensure all rewards are
          delivered, we cannot guarantee successful delivery in all cases due to various factors beyond our control.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">No Guarantees</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>Rewards are subject to availability</li>
          <li>Task completion does not guarantee reward delivery</li>
          <li>Delivery times may vary</li>
          <li>Some users may not receive rewards due to technical limitations</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">Third-Party Services</h2>
        <p className="text-gray-700 mb-6">
          We are not responsible for any issues arising from third-party services or applications required to complete tasks.
        </p>

        <div className="bg-gray-100 text-gray-700 text-sm rounded-md px-4 py-3">
          By using our services, you acknowledge and accept these limitations and proceed at your own discretion.
        </div>
      </div>
    </div>
    </>
  );
};

export default Disclaimer;
