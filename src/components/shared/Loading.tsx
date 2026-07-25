import React from 'react';

export interface LoadingProps {
  message?: string;
}

export function Loading({ message }: LoadingProps) {
  return <div data-component="loading">{message}</div>;
}
