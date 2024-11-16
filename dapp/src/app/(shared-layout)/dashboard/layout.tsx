import React, { PropsWithChildren } from 'react';

type TDashboardLayout = PropsWithChildren;

export default function DashboardLayout({ children }: TDashboardLayout) {
  return <main>{children}</main>;
}
