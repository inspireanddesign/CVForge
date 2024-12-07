import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import ClientLayout from '@/components/client-layout';
import { locales } from '@/lib/i18n/config';
import '../globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        {children}
      </div>
      </body>
    </html>
  );
}