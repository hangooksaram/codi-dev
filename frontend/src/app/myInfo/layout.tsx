import React, { Suspense } from 'react';
import MyInfoLoading from './loading';
import SinglePageLayout from '@/components/Layout/SinglePageLayout';

export default function MyInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SinglePageLayout>
      <Suspense fallback={<MyInfoLoading />}>{children}</Suspense>
    </SinglePageLayout>
  );
}
