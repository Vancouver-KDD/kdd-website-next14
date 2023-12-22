import MainHero from '@/components/hero/MainHero'
import Image from 'next/image'
import heroBgImage from './hero-bg-2023-07.jpg'
import ellipsis from './ellipse.92fef65f.svg'
import {getLatestEvents, getStats, getSponsors, getPhotos} from '@/app/actions/airtable'

export default async function Home() {
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
import classNames from 'classnames'

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
          <Image
            className="w-full"
            src={sponsor.logo?.url}
            width="500"
            height="134"
            alt={sponsor.name}
          />
        </a>
      ))}
    </div>
  )
}
