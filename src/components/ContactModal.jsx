import React from 'react';

function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Contact Us</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <p className="mb-4">Please call us at:</p>
          <div className="text-center">
            <a 
              href="tel:+16189711658" 
              className="text-2xl font-bold text-primary hover:underline"
            >
              (618) 971-1658
            </a>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-focus"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
