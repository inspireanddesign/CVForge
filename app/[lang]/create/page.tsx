import React from 'react'
import CreateCV from './create-cv'
import { locales } from '@/lib/i18n/config';

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
  }
const page = ({ params: { lang } }: { params: { lang: string } }) => {
  return (
    <CreateCV lang={lang} />
  )
}

export default page
