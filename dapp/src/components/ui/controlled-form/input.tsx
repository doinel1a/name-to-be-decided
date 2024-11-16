'use client';

import React from 'react';

import type { ComponentProps } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

import { Input as SCN_Input } from '../../ui/form/input';

type TInput<TFormSchema extends FieldValues> = ComponentProps<'input'> & {
  control: Control<TFormSchema>;
  name: Path<TFormSchema>;
  label?: string;
};

export default function Input<TFormSchema extends FieldValues>({
  control,
  name,
  label,
  className,
  disabled,
  ...otherProperties
}: TInput<TFormSchema>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          {label && <FormLabel data-testid={`${name}-label`}>{label}</FormLabel>}

          <FormControl>
            <SCN_Input
              className='placeholder:italic'
              disabled={disabled}
              {...otherProperties}
              {...field}
            />
          </FormControl>

          <FormMessage data-testid={`${name}-error-message`} className='leading-none' />
        </FormItem>
      )}
    />
  );
}
