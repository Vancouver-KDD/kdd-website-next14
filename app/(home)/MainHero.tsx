import React from 'react'
import Image from 'next/image'
import Button from '../../components/Button'
import naverCafe from '@/assets/icons/navercafe.png'
import {FaSlack, FaLinkedinIn} from 'react-icons/fa'
import heroBgImage from './hero-bg-2023-07.jpg'
import ellipsis from './ellipse.92fef65f.svg'

export default function MainHero() {
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

      <div className="relative flex-center flex-col gap-10 text-center text-white px-4 z-100">
        <div className="flex flex-col gap-8 mt-20 md:mt-0">
          <h1 className="text-4xl md:text-6xl font-bold text-shadow-lg hidden sm:block">
            Vancouver KDD
          </h1>
          <h2 className="text-lg md:text-xl font-medium">
            저희는 밴쿠버 한인 개발자 디자이너로 이루어져 있으며 네트워킹 및 한인 사회에 기여를
            추구하는 모임 입니다.
          </h2>
        </div>
        <div className="flex justify-center gap-4 flex-col sm:flex-row">
          <Button
            className="flex items-center gap-2"
            href="https://cafe.naver.com/vancouverkdd"
            size="md"
            target="_blank">
            <Image src={naverCafe} alt="naver-cafe" height="24" width="24" />
            <p>NAVER CAFE</p>
          </Button>
          <Button
            className="flex items-center gap-2"
            href="https://join.slack.com/t/vancouverkdd/shared_invite/zt-1xyhcghtg-OIgE_8OO_SmBMpyOPuH5Ew"
            size="md"
            target="_blank">
            <FaSlack />
            <p>JOIN SLACK</p>
          </Button>
          <Button
            className="flex items-center gap-2"
            href="https://www.linkedin.com/company/vancouver-kdd"
            size="md"
            target="_blank">
            <FaLinkedinIn className="h-5" />
            <p>LINKEDIN</p>
          </Button>
        </div>
      </div>
    </main>
  )
}
