import React from 'react';

const PromoCard = () => {
  return (
    <div className="w-full max-w-md text-white">
      <div className="flex justify-end mb-4">
        <a href="#" className="text-white hover:underline">Support</a>
      </div>
      <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Reach financial goals faster</h3>
        <p className="text-gray-200 mb-4">
          Use your Venus card around the world with no hidden fees. Hold, transfer and spend money.
        </p>
        <button className="bg-green-800 text-white p-2 rounded hover:bg-green-900">
          Learn more
        </button>
      </div>
      <div className="mt-6 bg-white bg-opacity-10 p-4 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <p className="text-gray-200">Earnings</p>
          <p className="text-2xl font-bold">$350.40</p>
        </div>
        <div className="bg-green-700 text-white p-2 rounded-full">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Introducing new features</h3>
        <p className="text-gray-200">
          Analyzing previous trends ensures that businesses always make the right decision. And as the scale of the decision and it’s impact magnifies...
        </p>
      </div>
    </div>
  );
};

export default PromoCard;