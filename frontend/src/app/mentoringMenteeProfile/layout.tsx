import { Suspense } from 'react';

export default function MentoringMenteeProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
