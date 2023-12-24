import MainHero from './MainHero'
import Script from 'next/script'
import {Section} from '@/components'
import {Suspense} from 'react'
import Stats from './Stats'
import Sponsors from './Sponsors'
import PastEventSection from './PastEventSection'
import Photos from './Photos'

export default function Home() {
  return (
    <>
      <MainHero />
      <Suspense fallback="loading...">
        <Section>
          <Stats />
        </Section>
        <Section title="Sponsors" className="bg-gray-100">
          <Sponsors />
        </Section>

        <PastEventSection />

        <Section title={'Photos'}>
          <div className="flex w-full overflow-x-auto gap-4 text-center">
            <Photos />
          </div>
        </Section>
      </Suspense>

      <Section title="Subscribe to KDD">
        <div className="flex justify-center items-center h-72 md:h-auto">
          <Script type="text/javascript" src="https://campaigns.zoho.com/js/zc.iframe.js"></Script>
          <iframe
            title="KDD Subscription Form"
            frameBorder="0"
            id="iframewin"
            width="100%"
            height="100%"
            src="https://zcsub-cmpzourl.maillist-manage.com/ua/Optin?od=11287ecc59340d&zx=130eee8c7&tD=1fc927abddb173c1&sD=1fc927abddb177ad"
          />
        </div>
      </Section>

      <Section title="Contact Us" className="text-center">
        <div className="flex flex-center text-center flex-col gap-4">
          <a className="text-xl font-bold" href="mailto:marketing@vancouverkdd.com">
            marketing@vancouverkdd.com
          </a>
          <a className="text-xl font-bold" href="mailto:partner@vancouverkdd.com">
            partner@vancouverkdd.com
          </a>
          <a className="text-xl font-bold" href="mailto:subgroup@vancouverkdd.com">
            subgroup@vancouverkdd.com
          </a>
        </div>
      </Section>
    </>
  )
}
