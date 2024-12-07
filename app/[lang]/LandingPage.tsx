'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../../components/Hero';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { isValidLocale } from '@/lib/i18n/config';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';

const LandingPage = ({ lang }: { lang: string }) => {
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

  return (
    <>
        <Header lang={lang} dictionary={dictionary} />
        <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
        <Hero lang={lang} dictionary={dictionary} />
        </motion.main>
    </>
  )
}

export default LandingPage
