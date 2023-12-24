import Image from 'next/image'
import {getSponsors} from '@/actions/airtable'

export default async function Sponsors() {
  const sponsors = await getSponsors()
  return (
    <div className="flex-center flex-row gap-8 [&>a]:w-60">
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
