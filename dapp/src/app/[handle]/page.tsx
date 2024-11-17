"use client"
import React, { use, useEffect, useState } from 'react';

import LandingPageViewer from '@/components/landing-page-viewer';
import { getWebsitePreferencesByHandle } from '@/contracts/allFunctions';
import { conectoContract } from '@/components/thirdweb/conectoClient';

type THandlePage = {
  params: {
    handle: string | null | undefined;
  };
};

export type WebsitePreference = {
  name: string;
  description: string;
  logo: string;
  textColor: number;
  secondaryColor: number;
  primaryColor: number;
  bgColor: number;
}

export default function HandlePage({ params }: THandlePage) {

  const [websitePreference, setWebsitePreference] = useState<WebsitePreference | null>(null);

  useEffect(() => {
    const fetchHandleInfo = async () => {
      console.log("Searching for handle:" + params.handle);
      const result: WebsitePreference = await getWebsitePreferencesByHandle({
        contract: conectoContract,
        handle: params.handle as string,
      });
      console.log(result);
      setWebsitePreference(result);
    }
    if(params.handle && !websitePreference){
      fetchHandleInfo();
    }
  }, [params.handle]);

  return (
    websitePreference ? <LandingPageViewer
      logo={websitePreference.logo}
      name={websitePreference.name}
      description={websitePreference.description}
      colors={{
        background: websitePreference.bgColor.toString(16),
        primary: websitePreference.primaryColor.toString(16),
        secondary: websitePreference.secondaryColor.toString(16),
        text: websitePreference.textColor.toString(16)
      }}
      subscriptions={[]} />
      : <div className="">Loading...</div>
  );
}
