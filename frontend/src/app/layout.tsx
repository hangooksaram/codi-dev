"use client";
import React from "react";
import "./globals.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/store/store";
import WebAccessibilityLayout from "@/component/WebAccessibility/WebAccessibilityLayout";
import { ThemeProvider } from "@emotion/react";
import theme from "@/ui/theme";
import AppBar from "@/component/NavBar/AppBar";
/**create new client */
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <WebAccessibilityLayout>
              <AppBar />
              {children}
            </WebAccessibilityLayout>
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </html>
  );
}
