import { ReactNode, Suspense } from 'react';
import RootLayoutWrapper from '@/components/RootLayoutWrapper';
import GoogleTagManager from '@/components/GoogleAnalytics/GoogleTagManager';
import GoogleAnalyticsWithLibrary from '@/components/GoogleAnalytics/GoogleAnalyticsWithLibrary/GoogleAnalyticsWithLibrary';
import { Metadata } from 'next';

const metaData: Metadata = {
  title: 'CODI',
  description: '장애인 1:1 멘토링 플랫폼',
  openGraph: {
    title: 'CODI',
    description: '장애인 1:1 멘토링 플랫폼',
    url: 'https://www.codisabled.com/',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return metaData;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <GoogleAnalyticsWithLibrary />
      <Suspense>
        <GoogleTagManager />
      </Suspense>

      <RootLayoutWrapper>{children}</RootLayoutWrapper>
    </html>
  );
}
