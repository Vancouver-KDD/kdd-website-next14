import React from 'react'
import Image from 'next/image'
import MyTicketImage from './my-ticket.png'
// import { fetchTicket } from '@/actions/airtable'

type Props = {}

const MyTickets: React.FC<Props> = (props) => {
  const isLoading = false
  // const reservedTicket = fetchTicket(ticketId)
  const reservedTicket = null
  const event = null

  return (
    <section className="flex-center flex-col">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-4">
        <div className="w-full flex-center flex-col">
          <Image className="w-[85%] h-[80%]" src={MyTicketImage} alt="my-ticket" />
          <div className="pl-2">
            <p className="text-gray-500 text-sm text-center">
              If you wish to cancel your ticket, please click the 'Cancel' button, and the KDD team
              will review your request. You will receive a confirmation email shortly. If you have
              any questions or need assistance, please contact us at{' '}
              <a className="text-royalBlue-600" href="mailto:marketing@vancouverkdd.com">
                marketing@vancouverkdd.com
              </a>
            </p>
          </div>
        </div>
        <div className="w-full px-5 pt-2">
          <div className="p-4">
            <h1 className="text-xl font-semibold text-royalBlue-700">My KDD Ticket</h1>
          </div>
          <div className="flex flex-col justify-center h-96 p-4 pb-6 rounded shadow-lg">
            {isLoading ? (
              <p>Loading...</p>
            ) : reservedTicket && reservedTicket.status !== 'cancelled' ? (
              <form method="POST" className="flex flex-col gap-1">
                <div className="mb-2">
                  <img className="w-full h-52" src={event?.poster?.url} alt="event-poster" />
                </div>
                <div className="flex gap-1 text-sm">
                  <h1 className="w-12 text-gray-700">Event:</h1>
                  <h2 className="font-semibold text-gray-700">{reservedTicket?.eventName}</h2>
                </div>
              </form>
            ) : (
              <>
                <p className='mb-2 font-semibold text-[#AD369E]'>No reserved tickets</p>
                <p className='text-xs'>예약된 티켓이 없습니다.</p>
                <p className='text-xs'>현재 진행중인 <a href='/events' className='text-royalBlue-700 font-bold'>이벤트</a>를 보시겠어요?</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyTickets
