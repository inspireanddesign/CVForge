'use client';

import { useEffect, useState } from 'react';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { isValidLocale } from '@/lib/i18n/config';
import { Loader2 } from 'lucide-react';

export default function ClientPage({ lang, children }: { lang: string, children: React.ReactNode }) {
  const [dictionary, setDictionary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDictionary() {
      if (!isValidLocale(lang)) return;
      const dict = await getDictionary(lang);
      setDictionary(dict);
      setLoading(false);
    }

    loadDictionary();
  }, [lang]);

  if (!isValidLocale(lang)) return null;
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const Component = children as any;

  return (
      <Component dictionary={dictionary} lang={lang} />
  )

  // return (
  //   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
  //     <h1 className="text-4xl font-bold mb-4">{dictionary?.home.title}</h1>
  //     <p className="text-lg text-muted-foreground text-center max-w-2xl">
  //       {dictionary?.home.description}
  //     </p>
  //   </div>
  // );
}