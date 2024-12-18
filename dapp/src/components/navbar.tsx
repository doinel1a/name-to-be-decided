import React from 'react';

import { Skeleton } from '@nextui-org/skeleton';
import dynamic from 'next/dynamic';

import { ConnectButton, useActiveAccount, useActiveWallet } from "thirdweb/react";
import { conectoClient } from './thirdweb/conectoClient';
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { baseSepolia } from 'thirdweb/chains';

const ThemeToggle = dynamic(() => import('./ui/theme-toggle'), {
  loading: () => <Skeleton className='h-10 w-10 rounded-medium' />,
  ssr: false
});
// const Wallet = dynamic(() => import('./wallet'), {
//   loading: () => <Skeleton className='h-10 w-32 rounded-medium' />,
//   ssr: false
// });

export default function Navbar() {
  return (
    <header className='flex h-16 w-full items-center justify-between border-b border-border px-5'>
      <span className='text-lg font-black'>Template</span>

      <div className='flex items-center gap-x-5'>
        <ThemeToggle />
        <ConnectButton client={conectoClient} chain={baseSepolia} />;
        {/* <Wallet className='w-32' /> */}
      </div>
    </header>
  );
}
