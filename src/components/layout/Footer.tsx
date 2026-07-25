import React from 'react';

export interface FooterProps {
  children?: React.ReactNode;
}

export function Footer({ children }: FooterProps) {
  return <footer data-component="footer">{children}</footer>;
}
