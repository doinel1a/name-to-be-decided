'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Form from '@/components/ui/controlled-form';
import Input from '@/components/ui/controlled-form/input';

export default function ClaimSlug() {
  type TFormSchema = z.infer<typeof formSchema>;
  const formSchema = z.object({
    handle: z.string().min(2, {
      message: 'Handle must be at least 2 characters.'
    })
  });

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      handle: ''
    }
  });

  function onSubmit(values: TFormSchema) {
    console.log(values);
  }

  return (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>Claim your handle to start</CardTitle>
        <CardDescription>Monetize your group chats.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form form={form} onValidForm={onSubmit}>
          <div className='flex items-center gap-x-2.5'>
            <p className='text-muted-foreground'>conecto.d1a.app/</p>
            <Input control={form.control} name='handle' placeholder='eth-global-bangkok' />
          </div>
        </Form>
      </CardContent>

      <CardFooter className='flex flex-col justify-between'>
        <Button color='primary' className='w-full'>
          Claim
        </Button>

        <div className='mt-5 flex items-center'>
          <p className='text-sm text-muted-foreground'>Already claimed your handle?</p>
          <Button size='sm' variant='light'>
            Connect wallet
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
