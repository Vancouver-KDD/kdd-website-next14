import React, {Suspense} from 'react'
import {Section} from '@/components'
import type {Metadata} from 'next'
import PaymentLayout from './PaymentLayout'

export const metadata: Metadata = {
  title: '페이먼트 페이지',
}

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl md:max-w-6xl flex flex-col justify-center items-center gap-8 m-auto p-4 pt-48 md:pt-32">
      <Section title="Checkout" className="relative text-center">
        <Suspense fallback={<div>Loading...</div>}>
          <PaymentLayout />
        </Suspense>
      </Section>
    </div>
  )
}
