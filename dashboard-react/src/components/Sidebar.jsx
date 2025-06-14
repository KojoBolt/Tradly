import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaChartBar,
  FaSignal,
  FaGraduationCap,
  FaTv,
  FaCreditCard,
  FaVideo,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight
} from 'react-icons/fa';
import { RiStockLine } from "react-icons/ri";
import { MdFlashAuto } from "react-icons/md";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import Logo from '../assets/images/1.png';
import '../index.css'; 

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [isPartnerBrokersOpen, setIsPartnerBrokersOpen] = useState(false);
  

  const navItems = [
    { name: 'Dashboards', path: '/', icon: <FaChartBar className="w-5 h-5" /> },
    { name: 'Signals', path: '/signals', icon: <FaSignal className="w-5 h-5" /> },
    { name: 'Academy', path: '/academy', icon: <FaGraduationCap className="w-5 h-5" /> },
    { name: 'TraydTV', path: '/traydtv', icon: <FaTv className="w-5 h-5" /> },
    { name: 'Subscription', path: '/subscription', icon: <FaCreditCard className="w-5 h-5" /> },
    { name: 'Connect to Valtrix AI', path: '/valtrix', icon: <MdFlashAuto className="w-5 h-5" /> },
    { name: 'Support', url: 'http://t.me/Traydsupport', isExternal: true, icon: <FaHeadset className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <FaCog className="w-5 h-5" /> },
  ];

  const partnerBrokers = [
    { name: 'IQ option', url: 'https://affiliate.iqbroker.com/redir/?aff=754695&aff_model=revenue&afftrack=', isExternal: true },
    { name: 'Pocket Option', url: '#', isExternal: true },
    { name: 'Quotex', url: '#', isExternal: true },
  ];

  const navGroup1 = navItems.slice(0, 5); // Dashboards to Subscription
  const navGroup2 = navItems.slice(5);    // Valtrix to Settings

  const handleLogout = () => {
    auth.signOut().then(() => {
      window.location.href = '/login';
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  const togglePartnerBrokers = () => {
    setIsPartnerBrokersOpen(!isPartnerBrokersOpen);
  };

  return (
    <aside className="w-64 bg-[#000] text-white h-screen p-3 flex flex-col font-roboto fixed z-50 ">
      <div className="flex flex-col flex-grow min-h-0">
        <div className="text-xl font-bold mb-8 mt-[-20px] border-b-1 border-solid border-b-white p-1">
          <a href="https://traydly.com/"><img src={Logo} alt="Logo" className='w-[90px] h-[90px] m-auto' /></a>
        </div>

        <div className="mb-8 flex items-center border-y-1 border-solid border-y-gray-50 pt-3 pb-3 font-roboto">
          <img
            src={user?.photoURL || 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'}
            alt="User profile"
            className="w-8 h-8 rounded-full mr-3"
          />
          <span className="font-light text-gray-300">
            {user?.displayName || 'Guest'}
          </span>
        </div>

        <nav className="space-y-3 flex-grow overflow-y-auto scrollbar-thin" role="navigation" aria-label="Main navigation">
          {/* First group of nav items */}
          {navGroup1.map((item) => {
            if (item.isExternal) {
              return (
                <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </a>
              );
            } else {
              return (
                <NavLink key={item.name} to={item.path} className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded ${isActive ? 'bg-[#24302C] shadow-2xs' : 'hover:bg-gray-700'}`
                }>
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              );
            }
          })}

          {/* Partner Brokers Dropdown */}
          <div>
            <button
              onClick={togglePartnerBrokers}
              className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-700 text-left"
            >
              <div className="flex items-center">
                <RiStockLine className="w-5 h-5" />
                <span className="ml-3">Partner Brokers</span>
              </div>
              {isPartnerBrokersOpen ? <FaChevronDown className="w-3 h-3" /> : <FaChevronRight className="w-3 h-3" />}
            </button>

            {isPartnerBrokersOpen && (
              <div className="ml-8 mt-2 space-y-1">
                {partnerBrokers.map((broker) => (
                  <a key={broker.name} href={broker.url} target="_blank" rel="noopener noreferrer"
                    className="block px-3 py-2 rounded text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                    {broker.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Second group of nav items */}
          {navGroup2.map((item) => {
            if (item.isExternal) {
              return (
                <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </a>
              );
            } else {
              return (
                <NavLink key={item.name} to={item.path} className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded ${isActive ? 'bg-[#24302C] shadow-2xs' : 'hover:bg-gray-700'}`
                }>
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              );
            }
          })}
        </nav>
      </div>

      {/* Logout Button - pinned at the bottom */}
      <button
        className=" mt-3 sm:mt-4 md:mt-4 lg:mt-4 px-3 py-2 hover:bg-gray-700 rounded cursor-pointer text-left flex items-center bg-pink-800"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="w-5 h-5" />
        <span className="ml-3">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
