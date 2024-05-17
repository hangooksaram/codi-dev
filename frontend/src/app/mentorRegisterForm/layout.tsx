import { Suspense } from 'react';

export default function MentorRegisterFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
