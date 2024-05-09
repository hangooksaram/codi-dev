import { ReactNode, Suspense } from 'react';
import RootLayoutWrapper from '@/components/RootLayoutWrapper';
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <Suspense>
        <GoogleAnalytics />
      </Suspense>
      <RootLayoutWrapper>{children}</RootLayoutWrapper>
    </html>
  );
}
