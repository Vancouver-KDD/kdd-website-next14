import type {Metadata} from 'next'
import HeaderNav from '@/components/nav/HeaderNav'
import './globals.css'
import {SpeedInsights} from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Vancouver KDD | 밴쿠버 KDD | 한인 개발자 디자이너 모임',
  description:
    '저희는 밴쿠버 한인 개발자 디자이너로 이루어져 있으며 네트워킹 및 한인 사회에 기여를 추구하는 모임 입니다.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="kr">
      <body>
        <HeaderNav />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
