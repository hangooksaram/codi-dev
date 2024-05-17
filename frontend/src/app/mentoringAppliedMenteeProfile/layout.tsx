import { Suspense } from 'react';

export default function MentoringAppliedMenteeProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
