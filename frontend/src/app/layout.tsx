import { ReactNode, Suspense } from 'react';
import RootLayoutWrapper from '@/components/RootLayoutWrapper';
import GoogleTagManager from '@/components/GoogleAnalytics/GoogleTagManager';
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics';
import Head from 'next/head';
import GoogleAnalyticsWithLibrary from '@/components/GoogleAnalytics/GoogleAnalyticsWithLibrary/useGoogleAnalyticsWithLibrary';
import useGoogleAnalyticsWithLibrary from '@/components/GoogleAnalytics/GoogleAnalyticsWithLibrary/useGoogleAnalyticsWithLibrary';

export default function RootLayout({ children }: { children: ReactNode }) {
  useGoogleAnalyticsWithLibrary();
  return (
    <>
      <html lang="ko">
        <Suspense>
          <GoogleTagManager />
        </Suspense>
        {/* <Head>
          <GoogleAnalytics
            GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID as string}
          />
        </Head> */}
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </html>
    </>
  );
}
