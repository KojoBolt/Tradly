import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Check } from "lucide-react";

const Subscription = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const location = useLocation();

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (location.state?.success) {
      setSuccessMessage(location.state.success);
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

  const plans = [
    {
      title: "Standard",
      price: "USD 99",
      period: "USD Per Month",
      description: "Our premium plan for uninterrupted access.",
      deliveryMethods: "Signals via: email, telegram.",
      features: ["Unlimited signals", "Telegram Notifications"],
      buttonText: "Subscribe",
      isVip: false,
       url: "https://pay.cryptomus.com/wallet/a9429c5c-5aac-429b-aae3-607ead3382d4",
    },
    {
      title: "Golden VIP",
      price: "USD 199",
      period: "USD Per Month",
      description: "Our premium plan for VIPs.",
      deliveryMethods: "Signals via: sms, email, telegram.",
      features: ["SMS Notifications", "Trading live stream access", "Connect to Valtrix AI"],
      buttonText: "Subscribe",
      isVip: true,
       url: "https://pay.cryptomus.com/wallet/a9429c5c-5aac-429b-aae3-607ead3382d4",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F0F2F5] font-roboto relative">
      {(!isMobile || isSidebarOpen) && (
        <div className="fixed md:static z-20">
          <Sidebar />
        </div>
      )}

      <main className={`flex-1 ${isMobile ? "" : "ml-64"} bg-gray-100`}>
        <Header onMenuClick={toggleSidebar} />

        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white px-6 py-3 rounded-lg shadow-lg">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-[800px] mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 flex-1 border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-[600px]"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 underline decoration-2 underline-offset-4">
                  {plan.title}
                </h2>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  {/* <div className="w-16 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
                    <div className="w-10 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-sm flex items-center justify-center">
                      <div className="w-6 h-5 bg-white rounded-sm opacity-80 flex items-center justify-center">
                        <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                      </div>
                    </div>
                  </div> */}
                  <div className="w-16 h-12 rounded">
                    <img src="https://img.freepik.com/free-vector/tiny-people-stock-traders-laptop-with-graph-chart-buy-sell-shares-stock-market-index-stockbroking-company-stock-exchange-data-concept_335657-1160.jpg?uid=R160851296&ga=GA1.1.1292176217.1739379214&semt=ais_hybrid&w=740" alt="Traydly" className="rounded" />
                  </div>
                  
                </div>
              </div>

              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {plan.price}
                </div>
                <div className="text-gray-600 font-medium">{plan.period}</div>
              </div>

              {/* Description */}
              <div className="text-center mb-6">
                <p className="text-lg font-semibold text-gray-800 mb-3">
                  {plan.description}
                </p>
                <p className="text-gray-600">{plan.deliveryMethods}</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center mb-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="text-center">
                <a href={plan.url}
                target="_blank"
                rel="noopener noreferrer"
                  className="inline-block bg-[#24302C] hover:bg-[#43b692] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 w-full sm:w-auto min-w-[140px] text-center"
                >
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Subscription;
