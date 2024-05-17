import { Suspense } from 'react';

export default function ProfileFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
