import React from 'react'
import Templates from './templatePage'
import { locales } from '@/lib/i18n/config';

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
  }

const page = ({ params: { lang } }: { params: { lang: string } }) => {
  return (
    <Templates />
  )
}

export default page
