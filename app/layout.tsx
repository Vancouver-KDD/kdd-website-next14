import type {Metadata} from 'next'
import HeaderNav from '@/components/nav/HeaderNav'
import './globals.css'
import {SpeedInsights} from '@vercel/speed-insights/next'
import {CSPostHogProvider} from './providers'
import * as stylex from '@stylexjs/stylex'

export const metadata: Metadata = {
  title: 'Vancouver KDD | 밴쿠버 KDD | 한인 개발자 디자이너 모임',
  description:
    '저희는 밴쿠버 한인 개발자 디자이너로 이루어져 있으며 네트워킹 및 한인 사회에 기여를 추구하는 모임 입니다.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html {...stylex.props(styles.html, styles.reset)} lang="kr">
      <CSPostHogProvider>
        <body {...stylex.props(styles.reset)}>
          <div className="absolute inset-x-0">
            <HeaderNav />
          </div>
          {children}
          <SpeedInsights />
        </body>
      </CSPostHogProvider>
    </html>
  )
}

const styles = stylex.create({
  html: {
    colorScheme: 'light dark',
  },
  reset: {
    minHeight: '100%',
    margin: 0,
    padding: 0,
  },
})
