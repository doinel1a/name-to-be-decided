import React from 'react';

import ClaimSlug from '@/components/claim-slug';

export default function Home() {
  return (
    <main className='flex h-full w-full flex-col items-center justify-center'>
      <h1 className='text-3xl font-semibold'>Hello, ETHGlobal - Bangkok!</h1>
      <ClaimSlug />
    </main>
  );
}
