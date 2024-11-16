import React from 'react';

import LandingPageViewer from '@/components/landing-page-viewer';

type THandlePage = {
  params: {
    handle: string | null | undefined;
  };
};

export default function HandlePage({ params }: THandlePage) {
  return (
    <LandingPageViewer
      logo={'test'}
      name={'Test Test'}
      description={'Test test test test test test test test'}
      colors={{
        background: '#ffffff',
        primary: '#007bff',
        secondary: '#6c757d',
        text: '#000000'
      }}
      subscriptions={[]}
    />
  );
}
