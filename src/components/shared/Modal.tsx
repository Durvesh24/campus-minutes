import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;
  return <div data-component="modal">{children}</div>;
}
