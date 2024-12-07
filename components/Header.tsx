'use client'
import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ComingSoonModal from './ComingSoonModal';
import LanguageSelector from './LanguageSelector';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LanguageSwitcher } from './language-switcher';

interface NavigationProps {
  lang: string;
  dictionary: any
}

export default function Header({ lang, dictionary }: NavigationProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { t } = useTranslation();

  const isActive = (path: string) => {
    return pathname === path ? "text-purple-600" : "text-gray-600 hover:text-purple-600";
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-purple-50/80 backdrop-blur-md z-40 pt-4">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center">
            <span className="text-2xl font-federo bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              CVforge
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <LanguageSwitcher />
            {/* <LanguageSelector /> */}
            
            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <button 
            onClick={() => setShowComingSoon(true)}
            className={`hidden md:flex items-center gap-2 ${isActive("/templates")} ml-auto text-sm font-medium group`}
          >
            <Sparkles className="w-4 h-4 text-purple-400 group-hover:text-purple-600 transition-colors" />
            {dictionary.header.startWithTemplates}
          </button>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-purple-50/80 backdrop-blur-md shadow-lg md:hidden">
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowComingSoon(true);
                }}
                className={`flex items-center gap-2 px-4 py-3 ${isActive("/templates")} text-sm font-medium w-full text-left`}
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                {t('header.startWithTemplates')}
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
      />
    </>
  );
}