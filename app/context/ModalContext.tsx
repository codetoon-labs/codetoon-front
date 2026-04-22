'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isContactModalOpen: boolean;
  openContactModal: (meta?: any) => void;
  closeContactModal: () => void;
  modalMetadata: any;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalMetadata, setModalMetadata] = useState<any>(null);

  const openContactModal = (meta?: any) => {
    setModalMetadata(meta);
    setIsContactModalOpen(true);
  };
  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setModalMetadata(null);
  };

  return (
    <ModalContext.Provider value={{ isContactModalOpen, openContactModal, closeContactModal, modalMetadata }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
