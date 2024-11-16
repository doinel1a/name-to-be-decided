import React from 'react';

export default function HandleLayout({ children }: { children: React.ReactNode }) {
  return <div className='grid min-h-[100dvh] grid-rows-[1fr]'>{children}</div>;
}
