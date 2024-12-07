'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const RedirectPage = ({ lang }: { lang: string }) => {
    const router = useRouter()

    router.push(`/${lang}`)
  return (
    <div>
      
    </div>
  )
}

export default RedirectPage
