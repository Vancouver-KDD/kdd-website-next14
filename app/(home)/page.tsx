import MainHero from '@/components/hero/MainHero'
import Image from 'next/image'
import heroBgImage from './hero-bg-2023-07.jpg'
import ellipsis from './ellipse.92fef65f.svg'

export default function Home() {
  return (
    <main className="h-screen min-h-[650px] flex items-center justify-center">
      <div className="absolute inset-0 isolate min-h-[650px]">
        <Image
          src={heroBgImage}
          alt="Hero Background"
          fill
          className="object-cover object-center bg-center"
        />
        <Image src={ellipsis} alt="ellipsis" className="absolute inset-x-0 bottom-0 w-full" />
      </div>
      <MainHero />
    </main>
  )
}
