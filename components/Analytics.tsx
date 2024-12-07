'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-SHNCKE2FM3';

export default function Analytics(): JSX.Element | null {
  const pathname = usePathname();

  useEffect(() => {
    const loadGA = (): void => {
      if (process.env.NODE_ENV === 'development') return;

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]): void {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false, // We'll track page views manually
      });
    };

    loadGA();
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;

    if (pathname && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}