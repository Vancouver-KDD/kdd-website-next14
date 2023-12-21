import MainHero from '@/components/hero/MainHero'
import Image from 'next/image'
import heroBgImage from './hero-bg-2023-07.jpg'
import ellipsis from './ellipse.92fef65f.svg'

export default function Home() {
  return (
    <main className="h-screen min-h-[500px] flex items-center justify-center">
      <div className="absolute inset-0 isolate">
        <Image
          src={heroBgImage}
          alt="Hero Background"
          fill
          className="object-cover object-center bg-center"
        />
        <Image src={ellipsis} alt="ellipsis" className="absolute inset-x-0 bottom-0 w-full" />
      </div>
      <div className="bg-pink-500 outline-2 outline-blue-500 outline-dashed">
        <MainHero />
      </div>
    </main>
  )
}
