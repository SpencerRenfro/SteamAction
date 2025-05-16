import React, { createContext, useState, useContext } from 'react';
import ContactModal from '../components/ContactModal';

// Create the context
const ModalContext = createContext();

// Custom hook to use the modal context
export function useModal() {
  return useContext(ModalContext);
}

// Provider component
export function ModalProvider({ children }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Function to open the contact modal
  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  // Function to close the contact modal
  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  // Value to be provided by the context
  const value = {
    openContactModal,
    closeContactModal
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={closeContactModal} 
      />
    </ModalContext.Provider>
  );
}
