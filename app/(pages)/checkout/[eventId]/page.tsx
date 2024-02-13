import React, { Suspense } from 'react'
import { Section } from '@/components'
import type { Metadata } from 'next'
import CheckoutLayout from './CheckoutLayout'

export const metadata: Metadata = {
  title: '체크아웃',
}

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl md:max-w-6xl flex flex-col justify-center items-center gap-8 m-auto p-4 pt-48 md:pt-32">
        <Section title="Checkout" className="relative text-center">
            <Suspense fallback={<div>Loading...</div>}>
              <CheckoutLayout />
            </Suspense>
        </Section>
    </div>
  )
}