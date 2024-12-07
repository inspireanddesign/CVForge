import { locales } from "@/lib/i18n/config";
import RedirectPage from "./RedirectPage";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function Home({ params: { lang } }: { params: { lang: string } }) {
  return (
    <RedirectPage lang={lang ? 'fr' : 'en'} />
  );
}
