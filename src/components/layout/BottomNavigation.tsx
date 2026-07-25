import React from 'react';

export interface BottomNavigationProps {
  children?: React.ReactNode;
}

export function BottomNavigation({ children }: BottomNavigationProps) {
  return <nav data-component="bottom-navigation">{children}</nav>;
}
