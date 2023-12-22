import Airtable from 'airtable'
Airtable.configure({apiKey: process.env.NEXT_PUBLIC_AIRTABLE_TOKEN})
import type {Attachment} from 'airtable'

const DEV = process.env.NODE_ENV === 'development'

export const getLatestBlogs = async ({limit}: {limit: number}) => {
  if (!process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
    throw new Error('Missing env variable NEXT_PUBLIC_AIRTABLE_KDD_BASE')
  const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
  const records = await base('Blogs')
    .select({
      pageSize: limit,
      sort: [{field: 'date', direction: 'desc'}],
      filterByFormula: '{published} = 1',
    })
    .firstPage()
  return records.map((record) => {
    const {
      id,
      fields: {author, date, description, title, published},
    } = record
    return {
      id,
      author,
      date,
      description,
      published,
      title,
    }
  }) as DB.Blog[]
}

export const getEvent = async (eventId: string) => {
  if (!process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
    throw new Error('Missing env variable NEXT_PUBLIC_AIRTABLE_KDD_BASE')
  const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
  const record = await base('Events').find(eventId)
  const {
    id,
    fields: {
      date,
      duration,
      title,
      description,
      joinLink,
      location,
      poster: attachments,
      PhotosIds,
      price,
      quantity,
    },
  } = record
  return {
    id,
    date,
    duration,
    title,
    description,
    joinLink,
    location,
    poster: (attachments as Attachment[])?.[0],
    PhotosIds,
    price: (price as number).toFixed(2),
    quantity,
  } as DB.Event
}

export const getLatestEvents = async ({limit}: {limit: number}) => {
  if (!process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
    throw new Error('Missing env variable NEXT_PUBLIC_AIRTABLE_KDD_BASE')
  const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
  const records = await base('Events')
    .select({
      pageSize: limit,
      filterByFormula: `{dev} = ${DEV ? '1' : '0'}`,
      sort: [{field: 'date', direction: 'desc'}],
    })
    .firstPage()
  return records.map((record) => {
    const {
      id,
      fields: {
        date,
        duration,
        title,
        description,
        joinLink,
        location,
        poster: attachments,
        PhotosIds,
        price,
        quantity,
      },
    } = record
    return {
      id,
      date,
      duration,
      title,
      description,
      joinLink,
      location,
      poster: (attachments as Attachment[])?.[0],
      PhotosIds,
      price,
      quantity,
    }
  }) as DB.Event[]
}

export const getStats = async () => {
  if (!process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
    throw new Error('Missing env variable NEXT_PUBLIC_AIRTABLE_KDD_BASE')
  const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
  const records = await base('Stats').select({maxRecords: 1}).firstPage()
  return {
    eventsCount: records[0]?.fields?.eventsCount as number,
    members: records.at(0)?.fields?.members as number,
  } as DB.Stats
}

export const getSponsors = async () => {
  if (!process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
    throw new Error('Missing env variable NEXT_PUBLIC_AIRTABLE_KDD_BASE')
  const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
  const records = await base('Sponsors').select().firstPage()
  return records.map((record) => {
    const name = record.fields.name as string
    const logo = (record.fields.logo as Attachment[])?.[0]
    const link = record.fields.link as string
    return {name, logo, link}
  }) as DB.Sponsor[]
}

export const getPhotos = async ({limit}: {limit: number}) => {
  if (!process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
    throw new Error('Missing env variable NEXT_PUBLIC_AIRTABLE_KDD_BASE')
  const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
  const records = await base('Photos')
    .select({pageSize: limit, sort: [{field: 'date', direction: 'desc'}]})
    .firstPage()
  return records.map((record) => {
    const id = record.id
    const title = record.fields.title as string
    const description = record.fields.description as string
    const photos = record.fields.photos as Attachment[]
    const EventsId = (record.fields.EventsId as string[])?.[0]
    return {id, title, description, photos, EventsId}
  }) as DB.Photo[]
}

export const getOrganizers = async () => {
  if (!process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
    throw new Error('Missing env variable NEXT_PUBLIC_AIRTABLE_KDD_BASE')
  const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
  const records = await base('Organizers')
    .select({filterByFormula: '{published} = 1', sort: [{field: 'title', direction: 'asc'}]})
    .firstPage()
  return records.map((record) => {
    const name = record.fields.name as string
    const title = record.fields.title as string
    const profile = (record.fields.profile as Attachment[])?.[0]
    const description = record.fields.description as string
    const socialMediaType = record.fields.socialMediaType as string
    const socialMediaLink = record.fields.socialMediaLink as string
    const socialMediaType2 = record.fields.socialMediaType2 as string
    const socialMediaLink2 = record.fields.socialMediaLink2 as string

    return {
      id: record.id,
      name,
      title,
      profile,
      description,
      socialMediaType,
      socialMediaLink,
      socialMediaType2,
      socialMediaLink2,
    }
  }) as DB.Organizer[]
}

export const getContributors = async () => {
  if (!process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
    throw new Error('Missing env variable NEXT_PUBLIC_AIRTABLE_KDD_BASE')
  const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_KDD_BASE)
  const records = await base('Contributors').select().firstPage()
  const developers: DB.Contributor[] = []
  const supporters: DB.Contributor[] = []
  records.forEach((record) => {
    const name = record.fields.name as string
    const link = record.fields.link as string
    const type = record.fields.type as string
    if (type === 'developer') {
      developers.push({name, link})
    } else if (type === 'supporter') {
      supporters.push({name, link})
    }
  })
  return {developers, supporters}
}
