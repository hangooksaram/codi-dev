import { ReactNode, Suspense } from 'react';
import RootLayoutWrapper from '@/components/RootLayoutWrapper';
import GoogleTagManager from '@/components/GoogleAnalytics/GoogleTagManager';
import GoogleAnalyticsWithLibrary from '@/components/GoogleAnalytics/GoogleAnalyticsWithLibrary/GoogleAnalyticsWithLibrary';
import { Metadata } from 'next';

const metaData: Metadata = {
  title: '코디 - CODI : 장애인 1:1 멘토링 플랫폼',
  description:
    '같은 장애를 가진 멘토 에게 1:1 멘토링을 신청하여, 정보를 공유해보세요.',
  openGraph: {
    title: '코디 - CODI',
    description: '장애인 1:1 멘토링 플랫폼',
    url: 'https://www.codisabled.com/',
  },
};

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  return metaData;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <GoogleAnalyticsWithLibrary />
      <GoogleTagManager />
      <RootLayoutWrapper>{children}</RootLayoutWrapper>
    </html>
  );
}
