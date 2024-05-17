import { Suspense } from 'react';

export default function MentoringApplyFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
