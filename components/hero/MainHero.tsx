import React from 'react'
import Image from 'next/image';
import CustomButton from '../button/CustomButton';
import naverCafe from '@/assets/icons/navercafe.png';
import { FaSlack, FaLinkedinIn } from "react-icons/fa";

type Props = {}

const MainHero = (props: Props) => {

  return (
      <div className="relative flex flex-col items-center gap-10 text-center text-white px-4 z-100">
        <div className='flex flex-col gap-8'>
            <h1 className="text-4xl md:text-6xl font-bold text-shadow-lg text-transparent sm:text-inherit">
            Vancouver KDD
            </h1>
            <h2 className="text-lg md:text-xl font-semibold">
            저희는 밴쿠버 한인 개발자 디자이너로 이루어져 있으며 네트워킹 및 한인 사회에 기여를 추구하는
            모임 입니다.
            </h2>
        </div>
        <div className="flex justify-center gap-4">
            <CustomButton
                className="flex items-center gap-2"
                href="https://cafe.naver.com/vancouverkdd"
                size='md'
                target="_blank"
            >
                <Image src={naverCafe} alt="naver-cafe" height="24" width="24" />
                NAVER CAFE
            </CustomButton>
            <CustomButton
                className="flex items-center gap-2"
                href="https://join.slack.com/t/vancouverkdd/shared_invite/zt-1xyhcghtg-OIgE_8OO_SmBMpyOPuH5Ew"
                size='md'
                target="_blank"
            >
                <FaSlack />
                JOIN SLACK
            </CustomButton>
            <CustomButton
                className="flex items-center gap-2"
                href="https://www.linkedin.com/company/vancouver-kdd"
                size='md'
                target="_blank"
            >
                <FaLinkedinIn className="h-5" />
                LINKEDIN
            </CustomButton>
        </div>
    </div>
  )
}

export default MainHero