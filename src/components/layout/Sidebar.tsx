import React from 'react';

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return <aside data-component="sidebar">{children}</aside>;
}
