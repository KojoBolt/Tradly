import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Card from "./Card";
import RecentSignals from "./RecentSignals";
import ClaimCard from "./ClaimCard";
import wifi from "../assets/images/wifi.png";
import telegram from "../assets/images/tele.png";
import Trends from "../assets/images/trends.png";

const Dashboard = () => {
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
    <div className="flex min-h-screen bg-[#F0F2F5] font-roboto relative">
      {(!isMobile || isSidebarOpen) && (
        <div className="fixed md:static z-20">
          <Sidebar />
        </div>
      )}
      <main className={`flex-1 ${isMobile ? "" : "ml-64"} bg-gray-100`}>
        <Header onMenuClick={toggleSidebar} />

        {/*  Top-right success message */}
        {successMessage && (
          <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg text-sm sm:text-base max-w-[90%] sm:max-w-none">
            {successMessage}
          </div>
        )}

        <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          <div>
            <ClaimCard />
          </div>

          <div className="flex flex-col sm:flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-11 mt-[80px] sm:mt-[100px] md:mt-[120px]">
            <Card
              title="View or Redeem sponsored signals"
              content="Using broker points providers"
              imageSrc={Trends}
              footer="Claim Now"
              bgColor="bg-[#24302C]"
              textColor="text-white"
              className="max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] text-[15px] p-0 sm:p-2 md:p-3 lg:p-4"
            />
            <Card
              title="View our signal providers"
              content=""
              imageSrc={wifi}
              footer="Claim Now"
              bgColor="bg-[#278A6B]"
              textColor="text-white"
            />
            <Card
              title="Join our Telegram channel"
              content=""
              imageSrc={telegram}
              footer="Join Now"
              bgColor="bg-[#3CB7E5]"
              textColor="text-white"
              link="https://t.me/+QGyMf_nkYABhZWU0"
            />
          </div>

          <div className="mt-4 sm:mt-6 max-h-[600px] sm:max-h-[700px] md:max-h-[800px]">
            <RecentSignals />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;