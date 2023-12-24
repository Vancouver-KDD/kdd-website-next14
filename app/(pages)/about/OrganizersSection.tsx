import React from 'react'
import Image from 'next/image'
import {getOrganizers} from '@/actions/airtable'
import {SocialMediaIcon} from './SocialMediaIcon'

export async function OrganizersSection() {
  const organizers = await getOrganizers()
  return (
    <section>
      <h2 className="text-lg font-bold">Organizers</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {organizers.map(
          ({
            id,
            name,
            title,
            profile,
            description,
            socialMediaType,
            socialMediaLink,
            socialMediaType2,
            socialMediaLink2,
          }) => {
            return (
              <div key={id}>
                <div className="relative w-full aspect-square  rounded">
                  <Image fill className="object-cover" src={profile?.url} alt="img" />
                </div>
                <div className="w-full p-2">
                  <div className="text-xl font-bold">{name}</div>
                  <div className="font-bold">{title}</div>
                  {!!description && <div>{description}</div>}
                  <div className="flex gap-4 p-2">
                    {socialMediaType && socialMediaLink && (
                      <SocialMediaIcon socialMediaType={socialMediaType} href={socialMediaLink} />
                    )}
                    {socialMediaType2 && socialMediaLink2 && (
                      <SocialMediaIcon socialMediaType={socialMediaType2} href={socialMediaLink2} />
                    )}
                  </div>
                </div>
              </div>
            )
          }
        )}
      </div>
    </section>
  )
}
