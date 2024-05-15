import { ReactNode, Suspense } from 'react';
import RootLayoutWrapper from '@/components/RootLayoutWrapper';
import GoogleTagManager from '@/components/GoogleAnalytics/GoogleTagManager';
import Head from 'next/head';
import GoogleAnalyticsWithLibrary from '@/components/GoogleAnalytics/GoogleAnalyticsWithLibrary/GoogleAnalyticsWithLibrary';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

export const metaData: Metadata = {
  title: 'CODI',
  description: '장애인 1:1 멘토링 플랫폼',
  openGraph: {
    title: 'CODI',
    description: '장애인 1:1 멘토링 플랫폼',
    url: 'https://www.codisabled.com/',
  },
  metadataBase: new URL('https://www.codisabled.com/'),
};

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
