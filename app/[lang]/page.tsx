import { Suspense, useEffect, useState } from 'react';
import ClientPage from '@/components/client-page';
import { isValidLocale, locales } from '@/lib/i18n/config';
import LandingPage from './LandingPage';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Loader2 } from 'lucide-react';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function Page({ params: { lang } }: { params: { lang: string } }) {

  return (
      <LandingPage lang={lang} />
      
  );
}