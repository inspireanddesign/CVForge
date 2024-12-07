export const defaultLocale = 'fr';
export const locales = ['fr', 'en'] as const;
export type ValidLocale = typeof locales[number];

export const localeNames: Record<ValidLocale, string> = {
  fr: 'Français',
  en: 'English',
};

export function isValidLocale(locale: string): locale is ValidLocale {
  return locales.includes(locale as ValidLocale);
}