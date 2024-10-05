import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const AppNavbar = () => {
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // State for profile dropdown
  const [historyOpen, setHistoryOpen] = useState(false); // State for history dropdown
  const navigate = useNavigate();
  const historyRef = useRef();
  const profileRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    setProfileOpen(false); // Close the profile dropdown
    navigate("/login"); // Redirect to login page
  };

  const handleHistoryClick = () => {
    navigate("/HistoryPlantCount"); // Navigate to the main history page
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        setHistoryOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#16423C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-[#E9EFEC] font-bold text-2xl">
              FarmTech
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#C4DAD2] hover:text-white hover:bg-[#6A9C89] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white sm:hidden"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-4 items-center">
            <Link
              to="/"
              className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
            >
              Home
            </Link>
            <Link
              to="/rent"
              className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
            >
              Tool Renting
            </Link>
            <Link
              to="/order"
              className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
            >
              Fertilzer
            </Link>
            <Link
              to="/yeildCard/"
              className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
            >
              Crop
            </Link>

            {/* History Dropdown */}
            {token && (
              <div className="relative" ref={historyRef}>
                <button
                  onClick={() => setHistoryOpen(!historyOpen)}
                  className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg inline-flex items-center"
                >
                  Land Optimization
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.584l3.71-3.354a.75.75 0 111.04 1.08l-4.25 3.85a.75.75 0 01-1.04 0L5.25 8.29a.75.75 0 01-.02-1.08z"
                    clipRule="evenodd"
                  />
                </button>

                {/* Dropdown Menu */}
                {historyOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="history-menu"
                    >
                      <Link
                        to="/PlantCount"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setHistoryOpen(false)}
                      >
                        Plant Count
                      </Link>
                      <Link
                        to="/HistoryPlantCount"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setHistoryOpen(false)}
                      >
                        Plant Count History
                      </Link>
                      {/* Add more history options here */}
                      <Link
                        to="/AllShops"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setHistoryOpen(false)}
                      >
                        All shops
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile Dropdown */}
            {token ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="relative z-10 w-10 h-10 bg-[#C4DAD2] text-white rounded-full focus:outline-none"
                >
                  {/* Profile Image or Default Avatar */}
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/path-to-default-avatar.png" // Replace with actual path or use a dynamic avatar
                  />
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <Link
                        to="/admin/addDimentions" // Add a link to the user's profile if available
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
                >
                  SignUp
                </Link>
                <Link
                  to="/login"
                  className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
                >
                  LogIn
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/PlantCount"
            className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Plant Count
          </Link>
          <Link
            to="/PlantCount"
            className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Plant Count
          </Link>

          {/* History Dropdown in Mobile */}
          {token && (
            <div className="relative" ref={historyRef}>
              <button
                onClick={() => setHistoryOpen(!historyOpen)}
                className="w-full text-left text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
              >
                History
                <svg
                  className="h-5 w-5 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.584l3.71-3.354a.75.75 0 111.04 1.08l-4.25 3.85a.75.75 0 01-1.04 0L5.25 8.29a.75.75 0 01-.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {historyOpen && (
                <div className="mt-1 space-y-1">
                  <Link
                    to="/HistoryPlantCount"
                    className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setHistoryOpen(false)}
                  >
                    Plant Count History
                  </Link>
                  <Link
                    to="/HistoryYieldCards"
                    className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setHistoryOpen(false)}
                  >
                    Yield Card History
                  </Link>
                  {/* Add more history options here */}
                  <Link
                    to="/HistoryOther"
                    className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setHistoryOpen(false)}
                  >
                    Other History
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Conditionally render based on token */}
          {token ? (
            <>
              <button
                onClick={handleLogout}
                className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                SignUp
              </Link>
              <Link
                to="/login"
                className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                LogIn
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
