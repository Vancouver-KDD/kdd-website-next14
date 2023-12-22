import Image from 'next/image'
import {getLatestEvents, getStats, getSponsors, getPhotos} from '@/app/actions/airtable'
import classNames from 'classnames'

import heroBgImage from './hero-bg-2023-07.jpg'
import ellipsis from './ellipse.92fef65f.svg'
import MainHero from './MainHero'
import EventCard from './EventCard'
import Photos from './Photos'
export default async function Home() {
  const latestEvent = (await getLatestEvents({limit: 1})).at(0)
  const isPastEvent = latestEvent
    ? DateTime.fromISO(latestEvent.date).diffNow().toMillis() < 0
    : true
  const photos = await getPhotos({limit: 20})

  return (
    <>
      <main className="h-screen min-h-[650px] flex items-center justify-center">
        <div className="absolute inset-0 isolate min-h-[650px]">
          <Image
            src={heroBgImage}
            alt="Hero Background"
            fill
            className="object-cover object-center bg-center"
          />
          <Image src={ellipsis} alt="ellipsis" className="absolute inset-x-0 bottom-0 w-full" />
        </div>
        <MainHero />
      </main>
      <Section>
        <Stats />
      </Section>
      <Section title="Sponsors" className="bg-gray-100 p-6">
        <Sponsors />
      </Section>

      <Section title={isPastEvent ? 'Past Event' : 'Upcoming Event'}>
        {latestEvent && <EventCard event={latestEvent} />}
      </Section>

      <Section title={'Photos'}>
        <div className="flex w-full overflow-x-auto gap-4 text-center">
          <Photos dbPhotos={photos} />
        </div>
      </Section>

      <Section title="Subscribe to KDD">
        <div className="flex justify-center items-center h-72 md:h-auto">
          <Script type="text/javascript" src="https://campaigns.zoho.com/js/zc.iframe.js"></Script>
          <iframe
            title="KDD Subscription Form"
            frameBorder="0"
            id="iframewin"
            width="100%"
            height="100%"
            src="https://zcsub-cmpzourl.maillist-manage.com/ua/Optin?od=11287ecc59340d&zx=130eee8c7&tD=1fc927abddb173c1&sD=1fc927abddb177ad"
          />
        </div>
      </Section>
      <Section title="Contact Us" className="text-center">
        <div className="flex flex-center text-center flex-col gap-4">
          <a className="text-2xl font-bold" href="mailto:marketing@vancouverkdd.com">
            marketing@vancouverkdd.com
          </a>
          <a className="text-2xl font-bold" href="mailto:partner@vancouverkdd.com">
            partner@vancouverkdd.com
          </a>
          <a className="text-2xl font-bold" href="mailto:subgroup@vancouverkdd.com">
            subgroup@vancouverkdd.com
          </a>
        </div>
      </Section>
    </>
  )
}

type SectionProps = {
  title?: string
  className?: string
  children: React.ReactNode
}
function Section({title, className, children, ...restProps}: SectionProps) {
  return (
    <section className={classNames('flex-center', className)} {...restProps}>
      <div className="w-[calc(100vw-2rem)] max-w-4xl">
        {title && (
          <div className="flex-col flex-center gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center">{title}</h2>
            <div className="w-36 h-0.5 bg-red-500" />
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

import largeStatImg from './stat-large.png'
import smallStatImg from './stat-small.jpeg'
import {DateTime} from 'luxon'
import Script from 'next/script'

async function Stats() {
  const stats = await getStats()
  return (
    <div className="flex-center flex-row gap-4">
      <Image className="max-sm:w-32 md:hidden" src={smallStatImg} alt="trophy" />
      <Image className="max-w-sm max-md:hidden" src={largeStatImg} alt="lit up lightbulb" />
      <div className="flex-col gap-6 text-center text-xl sm:text-3xl font-extrabold md:gap-12 md:text-5xl">
        <h2>Since July 2017</h2>
        <h2>{stats?.eventsCount ?? 50} Meetups</h2>
        <h2>{stats?.members ?? 1500} Members</h2>
      </div>
    </div>
  )
}

async function Sponsors() {
  const sponsors = await getSponsors()
  return (
    <div className="flex-center sm:flex-row gap-8 [&>a]:w-60">
      {sponsors.map((sponsor) => (
        <a key={sponsor.name} href={sponsor.link} target="_blank">
          <div className="relative w-full min-h-20">
            <Image src={sponsor.logo?.url} fill alt={sponsor.name} className="object-contain" />
          </div>
        </a>
      ))}
    </div>
  )
}
