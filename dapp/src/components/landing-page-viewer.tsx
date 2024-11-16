import React from 'react';

import type { TColorPalette } from '@/lib/types/color-palette';
import type { TSubscription } from '@/lib/types/subscription';

import { Button } from '@nextui-org/button';

type TLandingPageViewer = {
  logo: string;
  name: string;
  description: string;
  colors: TColorPalette;
  subscriptions: TSubscription[];
};

export default function LandingPageViewer({
  logo,
  name,
  description,
  colors,
  subscriptions
}: TLandingPageViewer) {
  return (
    <div className='h-full w-full rounded-md bg-background p-0.5'>
      <div
        className='min-h-full overflow-y-auto rounded-lg p-5 shadow-lg'
        style={{
          backgroundColor: colors.background,
          color: colors.text
        }}
      >
        <div className='flex flex-col items-center space-y-6'>
          <img src={logo} alt='Logo' className='h-24 w-24 rounded-full' />
          <h1 style={{ color: colors.primary }} className='text-3xl font-bold'>
            {name}
          </h1>
          <p className='max-w-md text-center'>{description}</p>

          <div className='mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                style={{ borderColor: colors.secondary }}
                className='rounded-lg border p-4'
              >
                <h3 style={{ color: colors.primary }} className='text-xl font-semibold'>
                  {sub.name}
                </h3>
                <p className='my-2 text-2xl font-bold'>€{sub.price}</p>
                <p className='text-sm'>{sub.description}</p>

                <Button style={{ backgroundColor: colors.primary }} className='mt-4 w-full'>
                  Subscribe
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
