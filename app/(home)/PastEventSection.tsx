import {getLatestEvents} from '@/app/actions/airtable'
import {Section} from '@/components'
import EventCard from './EventCard'
import {DateTime} from 'luxon'

export default async function PastEventSection() {
  const latestEvent = (await getLatestEvents({limit: 1})).at(0)
  const isPastEvent = latestEvent
    ? DateTime.fromISO(latestEvent.date).diffNow().toMillis() < 0
    : true
  return (
    <Section title={isPastEvent ? 'Past Event' : 'Upcoming Event'}>
      {latestEvent && <EventCard event={latestEvent} />}
    </Section>
  )
}
