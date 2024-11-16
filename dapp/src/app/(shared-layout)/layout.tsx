import React from 'react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid min-h-[100dvh] grid-rows-[auto_1fr_auto]'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
