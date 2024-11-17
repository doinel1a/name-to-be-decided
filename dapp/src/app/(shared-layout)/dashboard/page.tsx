'use client';

import React, { useEffect, useState } from 'react';

import type { TColorPalette } from '@/lib/types/color-palette';
import type { TSubscription } from '@/lib/types/subscription';

import { Button } from '@nextui-org/button';
import { Minus, Plus, Save, X } from 'lucide-react';

import LandingPageViewer from '@/components/landing-page-viewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/form/input';
import { Label } from '@/components/ui/form/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

import { useActiveAccount } from 'thirdweb/react';
import { getWebsitePreferencesByHandle, getHandle, getSubscriptionContract } from '@/contracts/allFunctions';
import { conectoClient, conectoContract } from '@/components/thirdweb/conectoClient';
import { WebsitePreference } from '@/app/[handle]/page';
import { getContract, NFT } from 'thirdweb';
import { getNFTs } from 'thirdweb/extensions/erc1155';
import { baseSepolia } from 'thirdweb/chains';
import { useRouter } from 'next/navigation';

export default function LandingPageCustomizer() {
  const [logo, setLogo] = useState<string>('/api/placeholder/100/100');
  const [name, setName] = useState<string>('');
  const [handle, setHandle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [subscriptionContractAddress, setSubscriptionContractAddress] = useState<string>('');
  const [subscriptionContract, setSubscriptionContract] = useState<any>(null);
  const activeAccount = useActiveAccount();
  const router = useRouter();

  function setInfoByPreferences(preferences: WebsitePreference) {
    setLogo(preferences.logo);
    setName(preferences.name);
    setDescription(preferences.description);
  }

  useEffect(() => {
    const getDashboardInfo = async () => {
      console.log("activeAccount:", activeAccount?.address);
      const handle = await getHandle({
        contract: conectoContract,
        creatorAddress: activeAccount?.address as string
      });

      setHandle(handle);

      const pref = await getWebsitePreferencesByHandle({
        contract: conectoContract,
        handle: handle
      });
      setInfoByPreferences(pref);

      setSubscriptionContractAddress(await getSubscriptionContract({
        contract: conectoContract,
        creatorAddress: activeAccount?.address as string,
      }));

      const tempSubscriptionContract = getContract({
        client: conectoClient,
        chain: baseSepolia,
        address: subscriptionContractAddress,
        // // optional ABI
        // abi: [...],
      });
      setSubscriptionContract(tempSubscriptionContract);

      const nfts = await getNFTs({
        contract: tempSubscriptionContract
      });
      console.log(nfts?.length);

      nfts?.forEach((nft: NFT) => {
        console.log(nft);
        //TODO add subscriptions

      });
    }
    if (activeAccount) {
      getDashboardInfo();
    }
  }, [activeAccount]);

  const [subscriptions, setSubscriptions] = useState<TSubscription[]>([
    { id: Date.now().toString(), name: 'Base', price: 9.99, description: 'Base plan' }
  ]);

  const [colors, setColors] = useState<TColorPalette>({
    background: '#ffffff',
    primary: '#007bff',
    secondary: '#6c757d',
    text: '#000000'
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSubscription = () => {
    setSubscriptions([
      ...subscriptions,
      {
        id: Date.now().toString(),
        name: 'New description',
        price: 0,
        description: 'Description'
      }
    ]);

  };

  const removeSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  const updateSubscription = (id: string, field: keyof TSubscription, value: string | number) => {
    setSubscriptions(
      subscriptions.map((sub) => (sub.id === id ? { ...sub, [field]: value } : sub))
    );
  };

  const handleSubmit = async () => {
    const formattedSubscriptions = subscriptions.map(sub => ({
      name: sub.name,
      price: sub.price,
      description: sub.description
    }));

    const payload = {
      address: activeAccount?.address,
      slugName: handle,
      subscriptions: formattedSubscriptions
    };

    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log('Subscriptions saved successfully');
        router.push('/' + handle);
      } else {
        console.error('Failed to save subscriptions');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex h-screen'>
      <div className='h-screen w-1/3 min-w-[400px] overflow-y-auto p-4'>
        <Card className='border-0 shadow-none'>
          <CardHeader>
            <CardTitle>Customize your Landing Page</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue='general' className='w-full'>
              <TabsList className='w-full'>
                <TabsTrigger value='general' className='w-1/3'>
                  General
                </TabsTrigger>
                <TabsTrigger value='colors' className='w-1/3'>
                  Colors
                </TabsTrigger>
                <TabsTrigger value='subscriptions' className='w-1/3'>
                  Subscriptions
                </TabsTrigger>
              </TabsList>

              <TabsContent value='general' className='space-y-4'>
                <div>
                  <Label>Logo</Label>
                  <div className='mt-2'>
                    <Input type='file' accept='image/*' onChange={handleLogoUpload} />
                  </div>
                </div>

                <div>
                  <Label>Name</Label>
                  <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className='mt-2'
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className='mt-2'
                  />
                </div>
              </TabsContent>

              <TabsContent value='colors' className='space-y-4'>
                <div>
                  <Label>Background color</Label>
                  <div className='mt-2 flex items-center gap-2'>
                    <Input
                      type='color'
                      value={colors.background}
                      onChange={(event) => setColors({ ...colors, background: event.target.value })}
                      className='h-10 w-16'
                    />
                    <Input
                      value={colors.background}
                      onChange={(event) => setColors({ ...colors, background: event.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Primary color</Label>
                  <div className='mt-2 flex items-center gap-2'>
                    <Input
                      type='color'
                      value={colors.primary}
                      onChange={(event) => setColors({ ...colors, primary: event.target.value })}
                      className='h-10 w-16'
                    />
                    <Input
                      value={colors.primary}
                      onChange={(event) => setColors({ ...colors, primary: event.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Secondary color</Label>
                  <div className='mt-2 flex items-center gap-2'>
                    <Input
                      type='color'
                      value={colors.secondary}
                      onChange={(event) => setColors({ ...colors, secondary: event.target.value })}
                      className='h-10 w-16'
                    />
                    <Input
                      value={colors.secondary}
                      onChange={(event) => setColors({ ...colors, secondary: event.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Text color</Label>
                  <div className='mt-2 flex items-center gap-2'>
                    <Input
                      type='color'
                      value={colors.text}
                      onChange={(event) => setColors({ ...colors, text: event.target.value })}
                      className='h-10 w-16'
                    />
                    <Input
                      value={colors.text}
                      onChange={(event) => setColors({ ...colors, text: event.target.value })}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='subscriptions' className='space-y-4'>
                {subscriptions.map((sub) => (
                  <Card key={sub.id}>
                    <CardContent className='relative pt-6'>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1 space-y-4'>
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={sub.name}
                              onChange={(event) =>
                                updateSubscription(sub.id, 'name', event.target.value)
                              }
                              className='mt-2'
                            />
                          </div>
                          <div>
                            <Label>Price</Label>
                            <Input
                              type='number'
                              value={sub.price}
                              onChange={(event) =>
                                updateSubscription(sub.id, 'price', parseFloat(event.target.value))
                              }
                              className='mt-2'
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={sub.description}
                              onChange={(event) =>
                                updateSubscription(sub.id, 'description', event.target.value)
                              }
                              className='mt-2'
                            />
                          </div>
                        </div>

                        <Button
                          size='sm'
                          color='danger'
                          variant='light'
                          className='absolute right-2.5 top-2.5'
                          onClick={() => removeSubscription(sub.id)}
                          isIconOnly
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button onClick={addSubscription} className='w-full'>
                  <Plus className='mr-2 h-4 w-4' /> Add subscription
                </Button>
              </TabsContent>
            </Tabs>

            <Separator className='my-4' />

            <Button color='primary' className='w-full' onClick={handleSubmit}>
              <Save className='mr-2 h-4 w-4' /> Submit
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className='flex-1'>
        <LandingPageViewer
          logo={logo}
          name={name}
          description={description}
          colors={colors}
          subscriptions={subscriptions}
        />
      </div>
    </div>
  );
}
