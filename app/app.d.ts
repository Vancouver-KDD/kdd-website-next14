// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Error {}
  // interface Locals {}
  // interface PageData {}
  // interface Platform {}
  interface KoFiWebhookData {
    verification_token: string // ex. 'a3d45423-d339-4053-ba7b-4d83b5633d77'
    message_id: string // ex. '8e466784-d7d2-4a8c-a654-1cc10b5f739b'
    timestamp: string // ex. '2023-10-05T22:21:56Z'
    type: 'Donation' | 'Shop Order' | 'Subscription'
    is_public: boolean
    from_name: string
    message: string
    amount: string // ex. "3.00"
    url: string
    email: string
    currency: 'USD' | 'CAD'
    is_subscription_payment: boolean
    is_first_subscription_payment: boolean
    kofi_transaction_id: string // ex. '00000000-1111-2222-3333-444444444444'
  }
}

declare namespace DB {
  interface Sponsor {
    name: string
    logo: Attachment
    link: string
  }

  interface Photo {
    id: string
    title: string
    description: string
    photos: Attachment[]
    EventsId: string
  }

  interface Stats {
    eventsCount: number
    members: number
  }

  interface Blog {
    id: string
    author: {id: string; email: string; name: string} | void
    date: string
    description: string | void
    published: boolean
    title: string | void
  }

  interface Event {
    id: string
    date: string
    duration: number
    title: string
    description: string
    joinLink: string
    location: string
    poster: Attachment
    price: string
    PhotosIds: string[]
    price: number
    quantity: number
  }

  interface EventAnalytics {
    id: string
    ticketsConfirmedCount: number
    ticketsOnHoldCount: number
  }

  interface Organizer {
    id: string
    name: string
    title: string
    profile: Attachment
    description: string
    socialMediaType: string
    socialMediaLink: string
    socialMediaType2: string
    socialMediaLink2: string
    published: boolean
    isDraft: boolean // deprecated
  }

  interface Contributor {
    name: string
    link: string
  }

  interface Ticket {
    eventId: string
    eventName: string
    status?: 'free' | 'unpaid' | 'paid' | 'cancelled'
    price: string // '3.00'
    currency?: 'CAD'
    createdAt: Timestamp
    id: string
    firstTime: string
    name: string
    email: string
    occupation: string
    work: string
    location: string
    message: string
  }

  interface Email {
    to: string | string[]
    message?: {
      subject: string
      text?: string
      html?: string
    }
    template?: {
      name: string
      data: unknown
    }
  }

  interface User {
    uid: string
    isAdmin: boolean
    email: string
  }
}
