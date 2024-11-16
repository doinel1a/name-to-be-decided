'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { claimHandle } from '@/contracts/allFunctions';
import { conectoContract } from './thirdweb/conectoClient';
import { viemAdapter } from "thirdweb/adapters/viem";

 
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
import { sendTransaction } from 'thirdweb';
import { useActiveAccount } from 'thirdweb/react';

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

  async function onSubmit(handle: string) {
    console.log(handle);
    try {

      const account = useActiveAccount();

      if (!account) {
        throw new Error('No account found');
      }

      // const account = viemAdapter.walletClient.fromViem({
      //   walletClient: a.connector?.getAccounts(),
      // });

      const transaction = claimHandle({ contract: conectoContract, handle: handle });

      const { transactionHash } = await sendTransaction({
        account,
        transaction,
       });

      console.log("Transaction succeeded at: " + transaction);
    }
    catch (e) {
      console.error(e);
    }
  }

  return (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>Claim your handle to start</CardTitle>
        <CardDescription>Monetize your group chats.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form form={form} onValidForm={async () => await onSubmit(form.getValues("handle"))}>
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
