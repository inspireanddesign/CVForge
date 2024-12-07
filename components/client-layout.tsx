'use client';

import { useEffect, useState } from 'react';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Navigation } from '@/components/navigation';
import { defaultLocale, isValidLocale } from '@/lib/i18n/config';
import { useRouter } from 'next/navigation';
import Hero from './Hero';
import Header from './Header';

export default function ClientLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const router = useRouter();
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    if (!isValidLocale(lang)) {
      router.push(`/${defaultLocale}`);
      return;
    }

    async function loadDictionary() {
      const dict = await getDictionary(lang as ("fr" | "en"));
      setDictionary(dict);
    }

    loadDictionary();
  }, [lang, router]);

  if (!dictionary) return null;

  return (
    <>
      <Header lang={lang} dictionary={dictionary} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </>
  );
}