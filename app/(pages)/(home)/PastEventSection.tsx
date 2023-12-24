import {getLatestEvents} from '@/actions/airtable'
import {Section, EventCard} from '@/components'
import {DateTime} from 'luxon'

export default async function PastEventSection() {
  const latestEvent = (await getLatestEvents({limit: 1})).at(0)
  const title =
    latestEvent && DateTime.fromISO(latestEvent.date).diffNow().toMillis() < 0
      ? 'Past Event'
      : 'Upcoming Event'
  return <Section title={title}>{latestEvent && <EventCard event={latestEvent} />}</Section>
}
