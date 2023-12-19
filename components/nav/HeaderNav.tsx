import Link from 'next/link';
import Image from 'next/image';
import kddLogoWhite from '@/assets/logo/logo_kr_white_horizontal.svg'
import kddLogoColor from '@/assets/logo/logo_kr_color_horizontal.png'

const HeaderNav = () => {
  return (
    <div className="z-30 m-auto max-w-4xl flex items-center flex-col-reverse sm:flex-row justify-between p-4 pt-10">
      <Link href="/">
        <div className="w-36">
          <Image src={kddLogoColor} alt="kdd_logo" width={144} height={36} />
        </div>
      </Link>
      <div className="flex gap-6 font-bold text-black">
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
      </div>
    </div>
  );
};

export default HeaderNav;
