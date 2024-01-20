import {DB} from '@/app'
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
  Query,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import {db} from './firebase'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

export async function createUser(data: Omit<DB.User, 'createdAt'>) {
  try {
    const auth = getAuth()

    // Create new user using Firebase authentication
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)

    const uid = userCredential.user.uid

    const userRef = doc(db, 'Users', uid)

    // Check if user with given ID already exists
    if ((await getDoc(userRef)).exists()) {
      throw new Error('User with given ID already exists')
    }

    // Set user data in Firestore(remove password & add id)
    const {password, ...dataWithoutPassword} = data

    await setDoc(userRef, {
      ...dataWithoutPassword,
      id: uid,
      createdAt: new Date(),
    })

    return true
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export async function fetchTickets(): Promise<DB.Ticket[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'Tickets'))
    const tickets: DB.Ticket[] = querySnapshot.docs.map((doc) => doc.data() as DB.Ticket)
    return tickets
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function fetchTicket(ticketId: string): Promise<DB.Ticket | null> {
  try {
    const docSnapshot = await getDoc(doc(db, 'Tickets', ticketId))
    if (docSnapshot.exists()) {
      const ticket = docSnapshot.data() as DB.Ticket
      return ticket
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

import type {DocumentData, DocumentReference} from 'firebase/firestore'
import {derived, writable, type Readable, readable} from 'svelte/store'

const BROWSER = typeof window !== 'undefined'

function handleQuerySnapshot<T extends DocumentData>(
  q: Query,
  set: (value: Map<string, T>) => void
) {
  return BROWSER
    ? onSnapshot(
        q,
        (snap) => {
          const data = new Map<string, T>()
          for (const doc of snap.docs) {
            data.set(doc.id, {...(doc.data() as T), id: doc.id})
          }
          set(data)
        },
        (error) => {
          console.error(error.message)
          set(new Map<string, T>())
        }
      )
    : () => {}
}
// function getStoreFromQuery<T extends DocumentData>(q: Query) {
//   return readable<Map<string, T> | undefined>(undefined, (set) => handleQuerySnapshot<T>(q, set))
// }

function deriveStoreFromQuery<V, T extends DocumentData>(
  stores: Parameters<typeof derived>[0],
  getQuery: (value: V) => Query | null
) {
  return derived(stores, ($stores, set) => {
    const q = getQuery($stores)
    q ? handleQuerySnapshot<T>(q, set) : q
  }) as Readable<Map<string, T>>
}

function handleDocSnapshot<T extends DocumentData>(
  ref: DocumentReference,
  set: (value: T | null) => void
) {
  return BROWSER
    ? onSnapshot(
        ref,
        (snap) => set((snap.data() ?? null) as T | null),
        (error) => {
          console.error(error.message)
          set(null)
        }
      )
    : () => {}
}
function getStoreFromDocRef<T extends DocumentData>(ref: DocumentReference) {
  return readable<T | undefined | null>(undefined, (set) => handleDocSnapshot<T>(ref, set))
}

export const selectedEventId = writable<string>()
export const ticketValue = deriveStoreFromQuery<string, DB.Ticket>(
  selectedEventId,
  ($selectedEventId) =>
    $selectedEventId
      ? query(
          collection(db, 'Tickets'),
          where('eventId', '==', $selectedEventId),
          orderBy('createdAt', 'desc')
        )
      : null
)
export const selectedTicket = {
  // State
  value: ticketValue,
  // Actions
}
export const cancelledTickets = derived(ticketValue, ($ticketValue) =>
  [...$ticketValue.values()].filter((ticket) => ticket.status === 'cancelled')
)
export const activeTickets = derived(ticketValue, ($ticketValue) =>
  [...$ticketValue.values()].filter((ticket) => ticket.status !== 'cancelled')
)

export function createEventAnalyticsStore(eventId: string) {
  return getStoreFromDocRef<DB.EventAnalytics>(doc(db, `EventsAnalytics/${eventId}`))
}

export async function getEventAnalytics(eventId: string): Promise<DB.EventAnalytics> {
  const snapshot = await getDoc(doc(db, `EventsAnalytics/${eventId}`))
  return snapshot.data() as DB.EventAnalytics
}
