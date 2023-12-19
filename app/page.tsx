import MainHero from '@/components/hero/MainHero'
import HeaderNav from '@/components/nav/HeaderNav'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-red-400">
      <MainHero />
    </main>
  )
}
