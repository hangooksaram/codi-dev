"use client";
import React from "react";
import "./globals.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/store/store";
import AccessibilityLayout from "@/component/Layout/AccessibilityLayout";
import { ThemeProvider } from "@emotion/react";
import theme from "@/ui/theme";
import AppBar from "@/component/NavBar/AppBar";
import Floating from "@/component/Accessibility/Floating";
/**create new client */
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning={true}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <AccessibilityLayout>
                <AppBar />
                {children}
                <Floating />
              </AccessibilityLayout>
            </QueryClientProvider>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
