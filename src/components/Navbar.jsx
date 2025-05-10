import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-base-200 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 ">
          {/* Logo and brand name */}
          <Link
            to="/"
            className={`flex items-center px-3 py-2 rounded-md hover:bg-base-300 transition-colors ${
              location.pathname === "/"
                ? "text-primary"
                : "text-base-content hover:text-primary"
            }`}
          >
            <div className="flex items-center">
              <svg
                className="h-8 w-8 text-primary mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                <path d="M12 12v9"></path>
                <path d="M8 17h8"></path>
              </svg>
              <span className="text-primary font-bold text-xl">
                SteamAction
              </span>
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex justify-between w-full max-w-2xl">
            <Link
              to="/"
              className={`flex items-center px-6 py-2 rounded-md hover:bg-base-300 transition-colors flex-1 justify-center ${
                location.pathname === "/"
                  ? "text-primary"
                  : "text-base-content hover:text-primary"
              }`}
            >
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
            <Link
              to="/services"
              className={`flex items-center px-6 py-2 rounded-md hover:bg-base-300 transition-colors flex-1 justify-center ${
                location.pathname === "/services"
                  ? "text-primary"
                  : "text-base-content hover:text-primary"
              }`}
            >
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Services
            </Link>
            {/* <Link to="/bookings" className={`flex items-center px-3 py-2 rounded-md hover:bg-base-300 transition-colors ${location.pathname === '/bookings' ? 'text-primary' : 'text-base-content hover:text-primary'}`}>
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Bookings
            </Link> */}
            {/* <Link to="/customers" className={`flex items-center px-3 py-2 rounded-md hover:bg-base-300 transition-colors ${location.pathname === '/customers' ? 'text-primary' : 'text-base-content hover:text-primary'}`}>
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Customers
            </Link> */}
            {/* <Link to="/reviews" className={`flex items-center px-3 py-2 rounded-md hover:bg-base-300 transition-colors ${location.pathname === '/reviews' ? 'text-primary' : 'text-base-content hover:text-primary'}`}>
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Reviews
            </Link> */}
            <Link
              to="/service-areas"
              className={`flex items-center px-6 py-2 rounded-md hover:bg-base-300 transition-colors flex-1 justify-center ${
                location.pathname === "/service-areas"
                  ? "text-primary"
                  : "text-base-content hover:text-primary"
              }`}
            >
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Service Areas
            </Link>
            <Link
              to="/calculator"
              className={`flex items-center px-6 py-2 rounded-md hover:bg-base-300 transition-colors flex-1 justify-center ${
                location.pathname === "/calculator"
                  ? "text-primary"
                  : "text-base-content hover:text-primary"
              }`}
            >
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Calculator
            </Link>
            <Link
              to="/faq"
              className={`flex items-center px-6 py-2 rounded-md hover:bg-base-300 transition-colors flex-1 justify-center ${
                location.pathname === "/faq"
                  ? "text-primary"
                  : "text-base-content hover:text-primary"
              }`}
            >
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              FAQ
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-base-content hover:text-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 sm:px-3 bg-base-200 flex flex-col gap-2">
            <Link
              to="/"
              className={`flex items-center px-6 py-3 rounded-md hover:bg-base-300 transition-colors justify-center ${
                location.pathname === "/"
                  ? "text-primary"
                  : "text-base-content hover:text-primary"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
            <Link
              to="/services"
              className={`flex items-center px-6 py-3 rounded-md hover:bg-base-300 transition-colors justify-center ${
                location.pathname === "/services"
                  ? "text-primary"
                  : "text-base-content hover:text-primary"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Services
            </Link>
            {/* <Link to="/bookings" className={`flex items-center px-3 py-2 rounded-md hover:bg-base-300 transition-colors ${location.pathname === '/bookings' ? 'text-primary' : 'text-base-content hover:text-primary'}`} onClick={() => setIsMenuOpen(false)}>
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Bookings
            </Link> */}
            {/* <Link to="/customers" className={`flex items-center px-3 py-2 rounded-md hover:bg-base-300 transition-colors ${location.pathname === '/customers' ? 'text-primary' : 'text-base-content hover:text-primary'}`} onClick={() => setIsMenuOpen(false)}>
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Customers
            </Link> */}
            {/* <Link to="/reviews" className={`flex items-center px-3 py-2 rounded-md hover:bg-base-300 transition-colors ${location.pathname === '/reviews' ? 'text-primary' : 'text-base-content hover:text-primary'}`} onClick={() => setIsMenuOpen(false)}>
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Reviews
            </Link> */}
            <Link
              to="/service-areas"
              className={`flex items-center px-6 py-3 rounded-md hover:bg-base-300 transition-colors justify-center ${
                location.pathname === "/service-areas"
                  ? "text-primary"
                  : "text-base-content hover:text-primary"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Service Areas
            </Link>
            <Link
              to="/calculator"
              className={`flex items-center px-6 py-3 rounded-md hover:bg-base-300 transition-colors justify-center ${
                location.pathname === "/calculator"
                  ? "text-primary"
                  : "text-base-content hover:text-primary"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Calculator
            </Link>
            <Link
              to="/faq"
              className={`flex items-center px-6 py-3 rounded-md hover:bg-base-300 transition-colors justify-center ${
                location.pathname === "/faq"
                  ? "text-primary"
                  : "text-base-content hover:text-primary"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              FAQ
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
