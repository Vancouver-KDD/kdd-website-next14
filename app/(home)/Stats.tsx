import Image from 'next/image'
import {getStats} from '@/app/actions/airtable'
import largeStatImg from './stat-large.png'
import smallStatImg from './stat-small.jpeg'

export default async function Stats() {
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
