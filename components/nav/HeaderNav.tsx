'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import kddLogoWhite from '@/assets/logo/logo_kr_white_horizontal.svg'
import kddLogoColor from '@/assets/logo/logo_kr_color_horizontal.png'
import classNames from "classnames"

const HeaderNav = () => {
  const pageUrl = usePathname();
  const isHome = pageUrl === '/';

  return (
    <div className="relative z-50 m-auto max-w-4xl md:max-w-5xl flex items-center flex-col-reverse sm:flex-row justify-between p-4 pt-10">
      <Link href="/">
        <div className="w-36">
          {isHome 
            ? <Image src={kddLogoWhite} alt="kdd_logo" width={144} height={36} />
            : <Image src={kddLogoColor} alt="kdd_logo" width={144} height={36} />
          }
        </div>
      </Link>
      <div className={classNames(
        "flex gap-6 font-bold text-lg",
        isHome ? "text-white" : "text-black"
      )}>
        <Link href="/aboutUs">
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
      </div>
    </div>
  );
};

export default HeaderNav;
