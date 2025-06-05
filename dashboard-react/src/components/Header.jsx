import { useEffect, useState } from "react";
import { FiSettings, FiMessageSquare, FiMenu, FiUser } from "react-icons/fi";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { getAuth } from "firebase/auth";


const Header = ({ onMenuClick }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(notifs);
      setUnreadCount(notifs.filter((n) => !n.read).length);
    });

    return () => unsubscribe();
  }, [user]);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <div className="flex justify-between items-center px-6 py-4 font-roboto mt-6 bg-[#F3F4F6] relative">
      {/* Mobile Menu */}
      <div className="md:hidden fixed top-6 left-5 z-20 bg-white p-2 rounded-full">
        <FiMenu
          className="text-black font-bold text-2xl cursor-pointer"
          onClick={onMenuClick}
        />
      </div>

      {/* User & Notifications */}
      <div className="flex items-center gap-4 ml-auto relative">
        {/* <FiUser className="text-gray-700 text-xl cursor-pointer" /> */}
        <a href="/settings"><FiSettings className="text-gray-700 text-xl cursor-pointer" /></a>
        

        {/* Notification Icon with Badge */}
        <div className="relative">
          <FiMessageSquare
            className="text-[#007E33] text-xl cursor-pointer"
            onClick={toggleDropdown}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-2 text-xs bg-[#007E33] text-white rounded-full px-1">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 mt-12 w-72 bg-white shadow-lg rounded-lg z-30">
            <div className="flex items-center justify-between p-4 border-b text-sm font-semibold text-gray-700">
              <span>Notifications</span>
              <button
                onClick={() => setShowDropdown(false)}
                className="text-gray-500 hover:text-gray-800 text-base"
              >
                ✕
              </button>
            </div>
            <ul className="max-h-60 overflow-y-auto">
              {notifications.length === 0 ? (
                <li className="p-4 text-sm text-gray-500">No notifications yet.</li>
              ) : (
                notifications.map((notif) => (
                  <li
                    key={notif.id}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                      !notif.read ? "bg-green-50" : ""
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                    <p className="text-xs text-gray-600">{notif.message}</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
