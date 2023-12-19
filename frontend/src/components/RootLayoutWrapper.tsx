"use client";

import "../app/globals.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/store/store";
import AccessibilityLayout from "@/components/Layout/AccessibilityLayout";
import { ThemeProvider } from "@emotion/react";
import theme from "@/ui/theme";
import AppBar from "@/components/NavBar/AppBar/AppBar";
import Floating from "@/components/Accessibility/Floating";
import { ReactNode } from "react";
/**create new client */
const queryClient = new QueryClient();

const RootLayoutWrapper = ({ children }: { children: ReactNode }) => (
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
);

export default RootLayoutWrapper;
