import React from 'react';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

interface NavigationProps {
  lang: string;
  dictionary: any
}

export default function Hero({ lang, dictionary }: NavigationProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-normal font-federo text-gray-900 tracking-tight">
            {dictionary.hero.title.split(' in ')[0]}{' '}
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              {dictionary.hero.title.split(' in ')[1]}
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 px-4 font-inter">
            {dictionary.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href={`/${lang}/create`}
                className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] flex items-center justify-center space-x-2 font-inter overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 100%)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                
                <motion.div
                  initial={{ y: 0 }}
                  whileHover={{ y: -2 }}
                  className="relative z-10 flex items-center space-x-2"
                >
                  <Wand2 className="h-5 w-5" />
                  <span>{dictionary.hero.createButton}</span>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}