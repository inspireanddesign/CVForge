import Link from 'next/link';
import { LanguageSwitcher } from './language-switcher';

interface NavigationProps {
  locale: string;
  dictionary: {
    common: {
      navigation: {
        home: string;
        about: string;
        contact: string;
      };
    };
  };
}

export function Navigation({ locale, dictionary }: NavigationProps) {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex space-x-8">
            <Link
              href={`/${locale}`}
              className="text-foreground hover:text-primary transition-colors"
            >
              {dictionary.common.navigation.home}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-foreground hover:text-primary transition-colors"
            >
              {dictionary.common.navigation.about}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-foreground hover:text-primary transition-colors"
            >
              {dictionary.common.navigation.contact}
            </Link>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}