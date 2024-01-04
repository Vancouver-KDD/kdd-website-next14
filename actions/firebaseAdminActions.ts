import type {App, DB} from '@/app'
import {db} from './firebaseAdmin'
import { FieldValue } from 'firebase-admin/firestore'

export async function createTicket(data: Omit<DB.Ticket, 'createdAt'>) {
  // 1. Check if data.id (TicketId) does not already exist
  if ((await db.doc(`Tickets/${data.id}`).get()).exists) {
    throw new Error('Ticket with given ID already exists')
  }

  // 2. Cancel any unpaid tickets for the same event
  const sameEventsSnap = await db
    .collection('Tickets')
    .where('eventId', '==', data.eventId)
    .where('email', '==', data.email)
    .where('status', '==', 'unpaid')
    .get()
  const batch = db.batch()
  for (const doc of sameEventsSnap.docs) {
    batch.update(doc.ref, {
      status: 'cancelled',
    })
    batch.update(db.doc(`EventsAnalytics/${data.eventId}`), {
      ticketsOnHoldCount: FieldValue.increment(-1),
    })
  }

  // 3. Create New Ticket
  batch.set(db.doc(`Tickets/${data.id}`), {
    ...data,
    createdAt: new Date(),
  })

  batch.set(
    db.doc(`EventsAnalytics/${data.eventId}`),
    data.status === 'free'
      ? {
          ticketsConfirmedCount: FieldValue.increment(1),
        }
      : {
          ticketsOnHoldCount: FieldValue.increment(1),
        },
    {merge: true}
  )

  if (data.status === 'free') {
    // 4. If it is free event, send confirmation email
    batch.create(db.collection('Email').doc(), {
      to: data.email,
      message: {
        subject: `[Vancouver KDD] Purchase Complete for ${data.eventName}`,
        text: `Congratulations, you are confirmed for the event.
      See you at ${data.eventName}!
      To view your ticket, please visit this link https://vancouverkdd.com/myTicket?ticketId=${data.id}`,
      },
    } satisfies DB.Email)
  }

  await batch.commit()
  return true
}

export async function cancelTicket(ticketId: string) {
  return db.runTransaction(async (transaction) => {
    const ticketData = (await transaction.get(db.doc(`Tickets/${ticketId}`))).data()
    if (!ticketData) {
      throw new Error('Invalid ticketId')
    }
    if (ticketData.status === 'cancelled') {
      throw new Error('Ticket already cancelled')
    }

    await transaction.update(db.doc(`Tickets/${ticketId}`), {
      status: 'cancelled',
    } satisfies Partial<DB.Ticket>)

    await transaction.update(
      db.doc(`EventsAnalytics/${ticketData.eventId}`),
      ticketData.status === 'free'
        ? {
            ticketsConfirmedCount: FieldValue.increment(-1),
          }
        : {
            ticketsOnHoldCount: FieldValue.increment(-1),
          }
    )
  })
}

export async function updateTicketAsPaid(ticketId: string) {
  return db.runTransaction(async (transaction) => {
    const ticketData = (await transaction.get(db.doc(`Tickets/${ticketId}`))).data()
    if (!ticketData) {
      throw new Error('Invalid ticketId')
    }
    if (ticketData.status !== 'unpaid') {
      throw new Error('Ticket must be unpaid. Currently ticket is ' + ticketData.status)
    }

    await transaction.update(db.doc(`Tickets/${ticketId}`), {
      status: 'paid',
    } satisfies Partial<DB.Ticket>)

    await transaction.update(db.doc(`EventsAnalytics/${ticketData.eventId}`), {
      ticketsConfirmedCount: FieldValue.increment(1),
      ticketsOnHoldCount: FieldValue.increment(-1),
    })
  })
}

export async function handleKofiWebhook(data: Omit<App.KoFiWebhookData, 'verification_token'>) {
  const {email, amount, kofi_transaction_id, url} = data

  await db.runTransaction(async (transaction) => {
    // 1. Ensure kofiTransaction is not already handled
    const kofiTransactionSnap = await transaction.get(
      db.doc(`KoFiTransactions/${kofi_transaction_id}`)
    )
    if (kofiTransactionSnap.exists) {
      return
    }

    // 2. Fetch all unpaid tickets with same email
    const ticketsSnap = await transaction.get(
      db.collection('Tickets').where('email', '==', email).where('status', '==', 'unpaid')
    )

    const ticketSnap = ticketsSnap.docs[0]
    const ticketData = (ticketSnap?.data() as DB.Ticket) ?? {}

    // 3. If ticketPrice is same as KoFi Donation amount, save KofiTransaction and update ticket status to paid, send email to user.
    if (ticketData.price === amount) {
      await transaction.set(db.doc(`KoFiTransactions/${kofi_transaction_id}`), {
        ...data,
        ticketId: ticketSnap.id,
      })

      await transaction.update(ticketSnap.ref, {
        status: 'paid',
        koFiTransactionId: kofi_transaction_id,
      })

      await transaction.create(db.collection('Email').doc(), {
        to: email,
        message: {
          subject: `[Vancouver KDD] Purchase Complete for ${ticketData.eventName}`,
          text: `Congratulations, we received payment ${data.amount}.
  See you at ${ticketData.eventName}!
  To view your ticket, please visit this link https://vancouverkdd.com/myTicket?ticketId=${ticketData.id}`,
        },
      } satisfies DB.Email)
    } else {
      // 4. If ticketPrice does not match, just save KoFiTransaction only, send warning email to admin
      await transaction.set(db.doc(`KoFiTransactions/${kofi_transaction_id}`), {
        ...data,
        ticketId: null,
      })

      await transaction.create(db.collection('Email').doc(), {
        to: 'admin@vancouverkdd.com',
        message: {
          subject: '[Vancouver KDD] Warning KoFi Donation without Unpaid Ticket',
          text: `KoFi Transaction ${url} was received but could not find any ticket that is unpaid under email ${email}!`,
        },
      } satisfies DB.Email)
    }
  })

  return true
}

export async function refundTicket(ticketId: string) {
  if (!ticketId) {
    throw new Error('missing ticketId')
  }

  return db.runTransaction(async (transaction) => {
    const ticketData = (await transaction.get(db.doc(`Tickets/${ticketId}`))).data() as DB.Ticket
    if (!ticketData) {
      throw new Error('Cannot find Ticket with id ' + ticketId)
    }
    if (ticketData.status === 'cancelled') {
      throw new Error('Ticket already cancelled')
    }

    await transaction.update(db.doc(`Tickets/${ticketId}`), {
      status: 'cancelled',
    } satisfies Partial<DB.Ticket>)

    await transaction.update(
      db.doc(`EventsAnalytics/${ticketData.eventId}`),
      ticketData.status === 'free'
        ? {
            ticketsConfirmedCount: FieldValue.increment(-1),
          }
        : {
            ticketsOnHoldCount: FieldValue.increment(-1),
          }
    )

    if (ticketData.status === 'paid') {
      await transaction.create(db.collection('Email').doc(), {
        to: 'admin@vancouverkdd.com',
        message: {
          subject: `[Action Required] - Ticket Cancelled: ${ticketData.email} ${ticketData.eventName}`,
          text: `Ticket cancelled for ${ticketData.email}.
        Please refund ${ticketData.price} back`,
        },
      } satisfies DB.Email)
    } else {
      await transaction.create(db.collection('Email').doc(), {
        to: 'admin@vancouverkdd.com',
        message: {
          subject: `Ticket Cancelled: ${ticketData.email} ${ticketData.eventName}`,
          text: `Ticket cancelled for ${ticketData.email}.`,
        },
      } satisfies DB.Email)
    }
  })
}

type EmailParams = {
  to: string
  subject?: string
  templateId?: string
  templateData?: unknown
  html?: string
  text?: string
}

export async function sendEmail(params: EmailParams) {
  const {to, subject} = params

  const email = {
    to,
    ...(subject
      ? {
          message: {
            subject,
            ...(params.html ? {html: params.html} : {}),
            ...(params.text ? {text: params.text} : {}),
          },
        }
      : {}),
    ...(params.templateId
      ? {
          template: {
            name: params.templateId,
            data: params.templateData,
          },
        }
      : {}),
  } satisfies DB.Email

  return db.collection('Email').add(email)
}