'use client'
import React, {useState, useEffect} from 'react'
import {getEvent} from '@/actions/airtable'
import EventDescription from '../checkout/[eventId]/EventDescription'
import { DB } from '@/app'
import { user } from '@/stores'
import { useAtomValue } from 'jotai'
import PaymentForm from './PaymentForm'

const PaymentLayout = () => {
  const [checkoutEvent, setCheckoutEvent] = useState<DB.Event>()

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEvent('recdlOjCQZgRFyqDL')
      setCheckoutEvent(event)
    }

    fetchEvent()
  }, [])

  const userVal = useAtomValue(user)
  const currentUser = userVal;

  return (
    <div className="flex-col md:flex-row justify-between gap-5">
      <div style={{flex: 1}}>
        {checkoutEvent && <EventDescription event={checkoutEvent} />}
      </div>
      <div style={{flex: 1}}>
        {checkoutEvent && <PaymentForm />}
      </div>
    </div>
  )
}

export default PaymentLayout
