import React from 'react';

export interface NavbarProps {
  children?: React.ReactNode;
}

export function Navbar({ children }: NavbarProps) {
  return <nav data-component="navbar">{children}</nav>;
}
