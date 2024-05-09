'use client';

import { useEffect } from 'react';
import { initializeGA } from './googlaAnalytics';

type WindowWithGA = Window & {
  GA_INITIALIZED: boolean;
};

declare const window: WindowWithGA;

export default function useGoogleAnalyticsWithLibrary() {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initializeGA();
      window.GA_INITIALIZED = true;
    }
  }, []);
}
