'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const RedirectPage = ({ lang }: { lang: string }) => {
    const router = useRouter()

    useEffect(() => {
      router.push(`/${lang}`)
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default RedirectPage
