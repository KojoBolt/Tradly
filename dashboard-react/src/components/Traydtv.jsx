import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import academyimage from '../assets/images/academy.jpg'

const Traydtv = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Show success message if it exists in navigation state
    if (location.state?.success) {
      setSuccessMessage(location.state.success);

      // Clear the message after 10 seconds
      const timeout = setTimeout(() => {
        setSuccessMessage(null);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [location.state]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-roboto relative ">
      {(!isMobile || isSidebarOpen) && (
        <div className="fixed md:static z-20">
          <Sidebar />
        </div>
      )}
      <main className={`flex-1 ${!isMobile ? "ml-64" : ""} bg-gray-100`}>
        <Header onMenuClick={toggleSidebar} />

        {/* Top-right success message */}
        {successMessage && (
          <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white px-6 py-3 rounded-lg shadow-lg">
            {successMessage}
          </div>
        )}

        <div className={`space-y-6 ${isMobile ? 'p-2' : 'p-6 ml-64 sm:ml-0 md:ml-0 lg:ml-0'}`}>
          <div className="flex flex-col items-center justify-center bg-[#F3F4F6] p-4 w-full">
            {/* <div className="flex space-x-4 mb-4 w-full">
              <input
                type="text"
                placeholder="Search something..."
                className="p-2 rounded-lg border border-gray-300 w-full max-w-xs"
              />
              <input
                type="date"
                className="p-2 rounded-lg border border-gray-300 sm:w-[300px] md:w-[300px] lg:w-[300px]"
                placeholder="Enter a date"
              />
            </div> */}
            <div className="bg-white p-6 rounded-lg shadow mt-6 w-full h-[600px] max-w-full">
              <h2 className="text-lg font-semibold mb-4">TraydTv</h2>
              <div className="text-center text-gray-600 flex flex-col items-center justify-center mt-[100px]">
                <img src={academyimage} alt="" className='w-[300px]' />
                <p className="font-semibold">Upgrade your plan</p>
                <p>Your plan isn’t sufficient enough for Live stream feature.</p>
                <a href="https://t.me/Traydsupport" className='m-2 px-3 py-3 rounded-2xl bg-[#8B865C] text-white'>Upgrade now</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Traydtv;