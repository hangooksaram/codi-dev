import { ReactNode, Suspense } from 'react';
import RootLayoutWrapper from '@/components/RootLayoutWrapper';
import GoogleTagManager from '@/components/GoogleAnalytics/GoogleTagManager';
import Head from 'next/head';
import GoogleAnalyticsWithLibrary from '@/components/GoogleAnalytics/GoogleAnalyticsWithLibrary/GoogleAnalyticsWithLibrary';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

interface CustomMetadata extends Metadata {
  title: string | undefined;
  openGraph: OpenGraph;
}

const metadata: CustomMetadata = {
  title: 'CODI',
  description: '장애인 1:1 멘토링 플랫폼',
  openGraph: {
    title: 'CODI',
    description: '장애인 1:1 멘토링 플랫폼',
    url: 'https://www.codisabled.com/',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <Head>
        <title>{metadata.title!}</title>
        <meta name="description" content={metadata.description!} />
        <meta property="og:title" content={metadata.title!} />
        <meta property="og:description" content={metadata.description!} />
        <meta property="og:url" content={metadata.openGraph.url! as string} />
      </Head>

      <GoogleAnalyticsWithLibrary />
      <Suspense>
        <GoogleTagManager />
      </Suspense>

      <RootLayoutWrapper>{children}</RootLayoutWrapper>
    </html>
  );
}
