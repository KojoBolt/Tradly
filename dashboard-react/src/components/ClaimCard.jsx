import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClaimPopup from './ClaimPopup';

const ClaimCard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [expirationDate, setExpirationDate] = useState(null);

  // Set or get expiration date
  useEffect(() => {
    let storedExpiration = localStorage.getItem('claimExpiration');
    let expiration;

    if (storedExpiration) {
      expiration = new Date(storedExpiration);
    } else {
      expiration = new Date();
      expiration.setDate(expiration.getDate() + 16); // Set to 16 days from now
      localStorage.setItem('claimExpiration', expiration.toISOString());
    }

    setExpirationDate(expiration);
  }, []);

  // Countdown logic
  useEffect(() => {
    if (!expirationDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const distance = expirationDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft('Expired');
        localStorage.removeItem('claimExpiration');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationDate]);

  return (
    <div className={`rounded-2xl shadow-lg p-6 bg-white font-roboto sm:w-[50%] md:w-[50%] lg:w-[50%] h-[200px] ${
      showPopup ? '' : 'hover:scale-[1.02] transition duration-300 ease-in-out'
    }`}>
      <div className="flex items-center mb-2">
        <span className="bg-black bg-opacity-10 shadow-2xl w-[45px] h-[45px] text-white p-2 rounded mr-2 font-bold">
          <p className='flex justify-center items-center text-2xl'>1</p>
        </span>
        <h3 className="text-lg font-semibold flex justify-around cursor-pointer">Claim Now</h3>
        <div className='ml-auto'>
          <button
            className="text-blue-600 flex justify-around gap-8"
            onClick={() => setShowPopup(true)}
          >
            Claim Now
          </button>
        </div>
      </div>

      <p className="text-green-600 mb-2">7 points expiring in {timeLeft}</p>

      <Link className="text-white mb-2 bg-black bg-opacity-10 p-3 flex justify-center items-center rounded-2xl">
        Balance 1 Point
      </Link>

      {showPopup && <ClaimPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ClaimCard;
