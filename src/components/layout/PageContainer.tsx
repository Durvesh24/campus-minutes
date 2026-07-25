import React from 'react';

export interface PageContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div data-component="page-container" className={className}>
      {children}
    </div>
  );
}
