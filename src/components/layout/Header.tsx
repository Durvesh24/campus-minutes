import React from 'react';

export interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return <header data-component="header">{children}</header>;
}
