import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Signals = () => {
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
    <div className="flex min-h-screen bg-gray-100 font-roboto relative">
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
            <div className="flex space-x-4 mb-4 w-full">
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
            </div>
            <div className="bg-white p-6 rounded-lg shadow mt-6 w-full h-[600px] ">
              <h2 className="text-lg font-semibold mb-4">Signal History</h2>
              <div className="text-center text-gray-600 flex flex-col items-center justify-center mt-[200px]">
                <svg className="w-20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="m 8 1.992188 c -2.617188 0 -5.238281 0.933593 -7.195312 2.808593 l -0.496094 0.480469 c -0.3984378 0.378906 -0.410156 1.011719 -0.03125 1.410156 c 0.382812 0.398438 1.015625 0.410156 1.414062 0.03125 l 0.5 -0.476562 c 0.582032 -0.558594 1.25 -1.011719 1.96875 -1.359375 c 0.332032 -1.148438 1.171875 -2.109375 2.308594 -2.582031 c 0.5625 -0.230469 1.152344 -0.328126 1.734375 -0.296876 c 0.96875 0.050782 1.910156 0.449219 2.625 1.164063 c 0.488281 0.488281 0.824219 1.078125 1.011719 1.714844 c 0.71875 0.347656 1.386718 0.800781 1.96875 1.359375 l 0.5 0.476562 c 0.398437 0.378906 1.03125 0.367188 1.414062 -0.03125 c 0.378906 -0.398437 0.367188 -1.03125 -0.03125 -1.410156 l -0.496094 -0.480469 c -1.957031 -1.875 -4.578124 -2.808593 -7.195312 -2.808593 z m -3.292969 5.007812 c -0.34375 0.230469 -0.660156 0.503906 -0.945312 0.8125 l -0.5 0.550781 c -0.375 0.40625 -0.347657 1.042969 0.0625 1.414063 c 0.410156 0.371094 1.042969 0.339844 1.414062 -0.070313 l 0.5 -0.546875 c 0.214844 -0.234375 0.472657 -0.429687 0.761719 -0.589844 v -0.570312 c 0 -0.386719 0.222656 -0.691406 0.417969 -1 z m 7.054688 0.355469 c -0.019531 0.058593 -0.042969 0.117187 -0.066407 0.175781 c -0.246093 0.59375 -0.648437 1.0625 -1.128906 1.4375 c 0.066406 0.0625 0.132813 0.125 0.195313 0.195312 l 0.5 0.542969 c 0.371093 0.410157 1.003906 0.441407 1.414062 0.070313 c 0.40625 -0.371094 0.4375 -1.007813 0.0625 -1.414063 l -0.5 -0.546875 c -0.152343 -0.167968 -0.308593 -0.320312 -0.476562 -0.460937 z m 0 0"
                      fill="#2e3434"
                      fillOpacity="0.34902"
                    />
                    <path
                      d="m 8.152344 3.007812 c -0.4375 -0.023437 -0.882813 0.046876 -1.300782 0.222657 c -1.117187 0.460937 -1.851562 1.558593 -1.851562 2.769531 h 2 c 0 -0.40625 0.242188 -0.769531 0.617188 -0.925781 c 0.375 -0.152344 0.800781 -0.070313 1.089843 0.21875 c 0.289063 0.289062 0.371094 0.714843 0.21875 1.089843 c -0.15625 0.375 -0.519531 0.617188 -0.925781 0.617188 c -0.550781 0 -1 0.449219 -1 1 v 2 h 2 v -1.179688 c 0.785156 -0.28125 1.441406 -0.875 1.769531 -1.671874 c 0.464844 -1.117188 0.207031 -2.414063 -0.648437 -3.269532 c -0.535156 -0.535156 -1.242188 -0.835937 -1.96875 -0.871094 z m -0.152344 7.992188 c -0.550781 0 -1 0.449219 -1 1 s 0.449219 1 1 1 s 1 -0.449219 1 -1 s -0.449219 -1 -1 -1 z m 0 0"
                      fill="#2e3436"
                    />
                  </g>
                </svg>
                <p className="font-semibold">No Signals</p>
                <p>There are no signals available at the moment</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signals;