'use client';

import { useEffect } from 'react';
import AuthContainer from '@/components/Container/AuthContainer';

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthContainer>{children}</AuthContainer>;
}
