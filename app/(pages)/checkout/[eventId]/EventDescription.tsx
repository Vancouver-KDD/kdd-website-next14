import React from 'react'
import {DateTime} from 'luxon'
import Image from 'next/image'
import {DB} from '@/app'

const EventDescription: React.FC<{ event: DB.Event }> = ({event}) => {
  const eventTime = event && DateTime.fromISO(event.date)
  const eventTimeTo = event && DateTime.fromISO(event.date).plus({seconds: event.duration})

  return (
    <div className="w-full flex flex-col p-4 pt-6">
      <Image
        src={event?.poster?.url}
        alt="event-poster"
        width={500}
        height={256}
        className="w-full h-64 rounded mb-2"
      />
      <div className="grid grid-cols-[100px_1fr] gap-2 mt-2 text-left">
        <h3 className="font-semibold text-lg text-royalBlue-700 tracking-tighter">Date</h3>
        <div className="pt-0.5 text-gray-600">
          {eventTime && eventTime.toLocaleString(DateTime.DATE_FULL)}
        </div>
        <h3 className="font-semibold text-lg text-royalBlue-700 tracking-tighter">Time</h3>
        <div className="pt-0.5 text-gray-600">
          {eventTime && eventTime.toLocaleString(DateTime.TIME_SIMPLE)}
          {eventTimeTo && ' - ' + eventTimeTo.toLocaleString(DateTime.TIME_SIMPLE)}
        </div>
        <h3 className="font-semibold text-lg text-royalBlue-700">Location</h3>
        <div className="pt-0.5 text-gray-600">{event && event.location}</div>
        <h3 className="font-semibold text-lg text-royalBlue-700">Summary</h3>
        <button className="pt-0.5 text-left text-sm cursor-pointer text-gray-600 hover:text-royalBlue-800">
          {event && event.description.substring(0, 315)} [...]
        </button>
      </div>
    </div>
  )
}

export default EventDescription
