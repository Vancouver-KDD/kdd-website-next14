import React from 'react'
import type {Metadata} from 'next'
import AdminDrawer from './AdminDrawer'

export const metadata: Metadata = {
  title: 'Admin 관리자',
}

export default function AdminPage() {
  return ( 
    <div className="max-w-4xl md:max-w-5xl flex flex-col justify-center items-center gap-8 m-auto p-4 pt-56">
      <section className="flex flex-col items-center p-5 h-full relative">
        <div className="w-full h-full">
          {/* {events ? (
            <AdminDrawer events={events} ticketValue={null} />
          ) : (
            <p className="text-royalBlue-800">No event selected</p>
          )} */}
            <AdminDrawer />
        </div>
      </section>
    </div>
)}
