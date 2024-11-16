'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Minus, Plus, Save, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/form/input';
import { Label } from '@/components/ui/form/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface Subscription {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface ThemeColors {
  background: string;
  primary: string;
  secondary: string;
  text: string;
}

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
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: Date.now().toString(), name: 'Base', price: 9.99, description: 'Piano base' }
  ]);
  const [colors, setColors] = useState<ThemeColors>({
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

  const updateSubscription = (id: string, field: keyof Subscription, value: string | number) => {
    setSubscriptions(
      subscriptions.map((sub) => (sub.id === id ? { ...sub, [field]: value } : sub))
    );
  };

  const Preview = () => (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        height: '100vh',
        padding: '2rem',
        overflow: 'auto'
      }}
      className='rounded-lg shadow-lg'
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
                Sottoscrivi
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className='flex h-screen'>
      <div className='h-screen w-1/3 min-w-[400px] overflow-y-auto border-r p-4'>
        <Card className='border-0 shadow-none'>
          <CardHeader>
            <CardTitle>Customize your landing Landing Page</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue='general' className='w-full'>
              <TabsList className='w-full'>
                <TabsTrigger value='general'>General</TabsTrigger>
                <TabsTrigger value='colors'>Colors</TabsTrigger>
                <TabsTrigger value='subscriptions'>Subscriptions</TabsTrigger>
              </TabsList>

              <TabsContent value='general' className='space-y-4'>
                <div>
                  <Label>Logo</Label>
                  <div className='mt-2'>
                    <Input type='file' accept='image/*' onChange={handleLogoUpload} />
                  </div>
                </div>

                <div>
                  <Label>Nome</Label>
                  <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className='mt-2'
                  />
                </div>

                <div>
                  <Label>Descrizione</Label>
                  <Textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className='mt-2'
                  />
                </div>
              </TabsContent>

              <TabsContent value='colors' className='space-y-4'>
                <div>
                  <Label>Colore Sfondo</Label>
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
                  <Label>Colore Primario</Label>
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
                  <Label>Colore Secondario</Label>
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
                  <Label>Colore Testo</Label>
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
                            <Label>Nome</Label>
                            <Input
                              value={sub.name}
                              onChange={(event) =>
                                updateSubscription(sub.id, 'name', event.target.value)
                              }
                              className='mt-2'
                            />
                          </div>
                          <div>
                            <Label>Prezzo</Label>
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
                            <Label>Descrizione</Label>
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
                  <Plus className='mr-2 h-4 w-4' /> Aggiungi Subscription
                </Button>
              </TabsContent>
            </Tabs>

            <Separator className='my-4' />

            <Button className='w-full'>
              <Save className='mr-2 h-4 w-4' /> Salva Modifiche
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className='flex-1 bg-gray-100'>
        <Preview />
      </div>
    </div>
  );
};

export default LandingPageCustomizer;
