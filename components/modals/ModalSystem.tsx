"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type ModalType =
  | "product"
  | "instagram"
  | "custom"
  | "repair"
  | "appointment"
  | "contact"
  | "quickAsk"
  | "concierge"
  | "reserve"
  | "saved"
  | "compare"
  | "proposal"
  | null;

interface ModalContextValue {
  activeModal: ModalType;
  modalData: Record<string, unknown> | null;
  openModal: (type: ModalType, data?: Record<string, unknown>) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue>({
  activeModal: null,
  modalData: null,
  openModal: () => {},
  closeModal: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<Record<string, unknown> | null>(null);

  const openModal = useCallback((type: ModalType, data?: Record<string, unknown>) => {
    setActiveModal(type);
    setModalData(data || null);
    document.documentElement.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalData(null);
    document.documentElement.style.overflow = "";
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
