'use client';

import React, { useState } from 'react';

import type { TColorPalette } from '@/lib/types/color-palette';
import type { TSubscription } from '@/lib/types/subscription';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Minus, Plus, Save, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import LandingPageViewer from '@/components/landing-page-viewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/form/input';
import { Label } from '@/components/ui/form/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

type TFormSchema = z.infer<typeof formSchema>;
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  description: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  })
});

const LandingPageCustomizer = () => {
  const [logo, setLogo] = useState<string>('/api/placeholder/100/100');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [subscriptions, setSubscriptions] = useState<TSubscription[]>([
    { id: Date.now().toString(), name: 'Base', price: 9.99, description: 'Piano base' }
  ]);
  const [colors, setColors] = useState<TColorPalette>({
    background: '#ffffff',
    primary: '#007bff',
    secondary: '#6c757d',
    text: '#000000'
  });

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: ''
    }
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
        name: 'Nuova Subscription',
        price: 0,
        description: 'Descrizione'
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

  return (
    <div className='flex h-screen'>
      <div className='h-screen w-1/3 min-w-[400px] overflow-y-auto p-4'>
        <Card className='border-0 shadow-none'>
          <CardHeader>
            <CardTitle>Customize your landing Landing Page</CardTitle>
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
                    <CardContent className='pt-6'>
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
                          color='danger'
                          className='ml-4'
                          onClick={() => removeSubscription(sub.id)}
                          isIconOnly
                        >
                          <Minus className='h-4 w-4' />
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

            <Button className='w-full'>
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
};

export default LandingPageCustomizer;
