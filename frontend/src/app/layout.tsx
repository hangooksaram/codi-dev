import { ReactNode } from 'react';
import RootLayoutWrapper from '@/components/RootLayoutWrapper';
import 'react-loading-skeleton/dist/skeleton.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning={true}>
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
