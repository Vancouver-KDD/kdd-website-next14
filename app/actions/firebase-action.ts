import {collection, doc, getDoc, getDocs} from 'firebase/firestore'
import {db} from './firebase'

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
