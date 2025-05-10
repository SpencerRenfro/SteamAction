import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-base-300 py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center text-sm text-gray-500">
          <span>&copy; {currentYear} SteamAction. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
