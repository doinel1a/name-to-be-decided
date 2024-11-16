import React from 'react';

import type { PropsWithChildren } from 'react';

import NextUiProvider from './next-ui';
import ThemeProvider from './theme';
import { ThirdwebProvider } from 'thirdweb/react';
// import Web3Provider from './web3';

type TRootProvider = PropsWithChildren;

export default function RootProvider({ children }: TRootProvider) {
  return (
    <NextUiProvider>
      <ThemeProvider>
      <ThirdwebProvider>
        {children}
      </ThirdwebProvider>
        {/* <Web3Provider>{children}</Web3Provider> */}
      </ThemeProvider>
    </NextUiProvider>
  );
}
