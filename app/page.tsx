import MainHero from '@/components/hero/MainHero'
import HeaderNav from '@/components/nav/HeaderNav'
import Image from 'next/image'
import heroBgImage from '@/assets/images/hero-bg-2023-07.jpg'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Image
          src={heroBgImage}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className='absolute z-100'
      />
      <div className="my-20">
        <MainHero />
      </div>
    </main>
  )
}
