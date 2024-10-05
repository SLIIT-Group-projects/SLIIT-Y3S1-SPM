import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // State for profile dropdown
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    setProfileOpen(false); // Close the profile dropdown
    navigate("/login"); // Redirect to login page
  };

  const handleHistoryClick = () => {
    navigate("/HistoryPlantCount"); // Navigate to the history page
  };

  return (
    <nav className="bg-[#16423C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-[#E9EFEC] font-bold text-2xl">
              FarmTec
            </a>
          </div>
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

          <div className="hidden sm:flex space-x-4 items-center">
            <a
              href="#home"
              className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
            >
              Home
            </a>
            <a
              href="/PlantCount"
              className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
            >
              Plant Count
            </a>
            {/* Add History Button */}
            {token && ( // Only show this button if the user is logged in
              <button
                onClick={handleHistoryClick}
                className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
              >
                History
              </button>
            )}

            {/* Conditionally render based on token */}
            {token ? (
              <>
                {/* Profile icon */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="relative z-10 w-10 h-10 bg-[#C4DAD2] text-white rounded-full focus:outline-none"
                  >
                    {/* Profile Image or Default Avatar */}
                    <img
                      className="w-10 h-10 rounded-full"
                      src="/path-to-default-avatar.png"
                      alt="Profile"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <a
                  href="/signup"
                  className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
                >
                  SignUp
                </a>
                <a
                  href="/login"
                  className="text-[#C4DAD2] hover:text-white font-medium px-3 py-2 text-lg"
                >
                  LogIn
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          <a
            href="#home"
            className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
          <a
            href="#tools"
            className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Tools
          </a>

          {token ? (
            <>
              <button
                onClick={handleHistoryClick}
                className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                History
              </button>
              <button
                onClick={handleLogout}
                className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <a
                href="/signup"
                className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                SignUp
              </a>
              <a
                href="/login"
                className="text-[#C4DAD2] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                LogIn
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
