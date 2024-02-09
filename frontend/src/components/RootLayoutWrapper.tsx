'use client';

import '../app/globals.css';
import '../components/Skeleton/skeleton.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';
import { store } from '@/store/store';
import AccessibilityLayout from '@/components/Layout/AccessibilityLayout';
import theme from '@/ui/theme';
import AppBar from '@/components/NavBar/AppBar/AppBar';
import Floating from '@/components/Accessibility/Floating';
import MobileAppBar from './NavBar/AppBar/MobileAppBar';
import Modal from '@/ui/molecules/Modal';

const queryClient = new QueryClient();

function RootLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AccessibilityLayout>
            <AppBar />
            <MobileAppBar />
            {children}
            <Floating />
            <Modal />
          </AccessibilityLayout>
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default RootLayoutWrapper;
