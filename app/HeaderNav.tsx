'use client'
import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'
import { firebaseAuth } from '@/actions/firebase'
import kddLogoWhite from './logo_kr_white_horizontal.svg'
import kddLogoColor from './logo_kr_color_horizontal.png'
import clsx from 'clsx'

export default function HeaderNav() {
  const pageUrl = usePathname()
  const isHome = pageUrl === '/'

  const currentUser = firebaseAuth.currentUser;
  console.log('user', currentUser)

  return (
    <div className="relative z-50 m-auto max-w-4xl flex items-center flex-col-reverse gap-8 sm:flex-row justify-between p-4 pt-10">
      <Link href="/">
        <div className="w-36">
          <Image
            src={isHome ? kddLogoWhite : kddLogoColor}
            alt="kdd_logo"
            width={144}
            height={36}
          />
        </div>
      </Link>
      <div
        className={clsx(
          'flex gap-6 font-bold text-md sm:text-lg',
          isHome ? 'text-white' : 'text-black'
        )}>
        <Link href="/about">
          <div>About Us</div>
        </Link>
        <Link href="/blogs">
          <div>Blogs</div>
        </Link>
        <Link href="/events">
          <div>Events</div>
        </Link>
        <Link href="/photos">
          <div>Photos</div>
        </Link>
        {currentUser &&
          <Link href="/myPage">
            <div>My Page</div>
          </Link>
        }
        {currentUser 
          ?
          <Link href="/">
            <div>Logout</div>
          </Link>
          :
          <Link href="/login">
            <div>Login</div>
          </Link>
        }
      </div>
    </div>
  )
}
