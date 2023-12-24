import React, {Suspense} from 'react'
import type {Metadata} from 'next'
import {EventCard, Section} from '@/components'
import comingSoonPoster from './coming-soon.jpg'
import Image from 'next/image'
import {getLatestEvents} from '@/actions/airtable'
import {DB} from '@/app'
import {DateTime} from 'luxon'

export const metadata: Metadata = {
  title: 'Events 이벤트',
}
export default function EventsPage() {
  return (
    <div className="flex-col pt-44">
      <Section title="Upcoming Event">
        <Suspense fallback="loading...">
          <UpcomingEvents />
        </Suspense>
      </Section>

      <Section title="Past Events">
        <div className="flex-col gap-20">
          <Suspense fallback="loading...">
            <PastEvents />
          </Suspense>
        </div>
      </Section>
    </div>
  )
}

async function UpcomingEvents() {
  const events = await getLatestEvents({limit: 100})
  const upcomingEvents: DB.Event[] = []

  for (const event of events) {
    if (DateTime.fromISO(event.date).diffNow().toMillis() < 0) {
    } else {
      upcomingEvents.push(event)
    }
  }

  return upcomingEvents?.length > 0 ? (
    upcomingEvents.map((event) => (
      <div className="mb-2" key={event.id}>
        <EventCard event={event} />
      </div>
    ))
  ) : (
    <div className="max-h-72 rounded-md overflow-hidden grid max-md:grid-cols-1 md:grid-cols-2">
      <div className="h-full overflow-hidden">
        <Image
          className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
          src={comingSoonPoster}
          alt="event poster"
        />
      </div>
      <div className="h-full bg-gray-100 p-6 gap-3 flex-center flex-col">
        <h3 className="text-2xl font-bold line-clamp-1">No Upcoming Event</h3>
        <h4 className="text-lg font-medium line-clamp-1">Check Back Soon!</h4>
      </div>
    </div>
  )
}

async function PastEvents() {
  const events = await getLatestEvents({limit: 100})
  const pastEvents: DB.Event[] = []

  for (const event of events) {
    if (DateTime.fromISO(event.date).diffNow().toMillis() < 0) {
      pastEvents.push(event)
    }
  }

  return pastEvents.map((event) => <EventCard key={event.id} event={event} />)
}
