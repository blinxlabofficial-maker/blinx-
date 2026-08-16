'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface ContactModalContextType {
  isOpen: boolean;
  selectedService: string | null;
  openContactModal: (service?: string) => void;
  closeContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType>({
  isOpen: false,
  selectedService: null,
  openContactModal: () => {},
  closeContactModal: () => {},
});

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const openContactModal = useCallback((service?: string) => {
    setSelectedService(service || null);
    setIsOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsOpen(false);
    setSelectedService(null);
  }, []);

  // Global event listener for any [data-open-contact-modal] click
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-open-contact-modal]');
      if (target) {
        e.preventDefault();
        const service = target.getAttribute('data-service') || undefined;
        openContactModal(service);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [openContactModal]);

  return (
    <ContactModalContext.Provider
      value={{
        isOpen,
        selectedService,
        openContactModal,
        closeContactModal,
      }}
    >
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  return useContext(ContactModalContext);
}
