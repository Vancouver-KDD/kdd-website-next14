'use server'
import { createTicket } from '@/actions/firebaseAdminActions'
import { DB } from '@/app'
import { db } from '@/actions/firebaseAdmin';
import { redirect } from 'next/navigation'

export async function createTicketAction(ticketData: DB.Ticket) {
    const id = db.collection('Tickets').doc().id;
    const ticketWithId = { ...ticketData, id };
    console.log('ticketWithIdData', ticketWithId);
    await createTicket(ticketWithId);
    redirect('/myPage?page=myTickets')
}