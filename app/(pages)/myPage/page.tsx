import {Section} from '@/components'
import type {Metadata} from 'next'
import {firebaseAuth} from '@/actions/firebase'
import MyPageDrawer from './MyPageDrawer'

export const metadata: Metadata = {
  title: '마이 페이지',
}
export default function BlogsPage() {
  const currentUser = firebaseAuth.currentUser

  console.log('user', currentUser)

  return (
    <div className="max-w-4xl md:max-w-6xl flex flex-col justify-center items-center gap-8 m-auto p-4 pt-48 md:pt-32">
      <Section title="My Page" className="relative text-center">
        <div>{currentUser?.uid}</div>
    
      <MyPageDrawer />
      </Section>
    </div>
  )
}
