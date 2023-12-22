import React from 'react'

export function SocialMediaIcon({href, socialMediaType}: {href: string; socialMediaType: string}) {
  return (
    <a href={href} target="_blank">
      {socialMediaType === 'github' ? (
        <svg
          width="62"
          height="60"
          viewBox="0 0 62 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30.9977 8.16985e-07C15.9077 -0.00193749 3.04418 10.9418 0.628156 25.8372C-1.78786 40.7325 6.95704 55.1812 21.274 59.949C22.816 60.2266 23.368 59.2798 23.368 58.4657C23.368 57.7348 23.3433 55.798 23.3341 53.2229C14.7761 55.0733 12.9689 49.0966 12.9689 49.0966C12.4055 47.2368 11.1943 45.6405 9.55498 44.5971C6.77942 42.6881 9.76777 42.7313 9.76777 42.7313C11.7436 43.0022 13.4826 44.1729 14.477 45.9016C15.3187 47.432 16.7368 48.5629 18.4161 49.043C20.0955 49.5231 21.897 49.3125 23.4205 48.4582C23.5636 46.8977 24.2579 45.4393 25.3788 44.3442C18.5509 43.5701 11.3714 40.9303 11.3714 29.1403C11.3335 26.0909 12.4659 23.1429 14.5356 20.9031C13.5991 18.2487 13.7094 15.3373 14.844 12.7614C14.844 12.7614 17.4252 11.9318 23.3002 15.9101C28.3389 14.5285 33.6566 14.5285 38.6953 15.9101C44.5733 11.9287 47.1515 12.7614 47.1515 12.7614C48.2913 15.3361 48.4017 18.2495 47.4599 20.9031C49.5371 23.1427 50.6686 26.0984 50.6179 29.1526C50.6179 40.9735 43.4322 43.5701 36.5797 44.3319C38.0579 45.8432 38.816 47.9165 38.6614 50.0249C38.6614 54.1389 38.6244 57.4572 38.6244 58.4657C38.6244 59.2891 39.1733 60.2451 40.743 59.9429C55.054 55.1669 63.7896 40.7174 61.3686 25.826C58.9476 10.9346 46.0846 -0.00345148 30.9977 8.16985e-07Z"
            fill="#2E3A59"
          />
        </svg>
      ) : socialMediaType === 'linkedin' ? (
        <svg
          width="61"
          height="60"
          viewBox="0 0 61 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="30.229" cy="30" rx="29.9995" ry="30" fill="#405DA9" />
          <path
            d="M31.8869 48.5675H23.9923V24.2432H31.8869V28.2973C33.5697 26.0985 36.1216 24.7876 38.844 24.7236C43.7398 24.7515 47.6903 28.8433 47.6761 33.8716V48.5675H39.7815V34.8851C39.4657 32.6202 37.5745 30.9397 35.3467 30.9446C34.3722 30.9762 33.4525 31.4144 32.7996 32.158C32.1467 32.9016 31.8171 33.8864 31.8869 34.8851V48.5675ZM20.045 48.5675H12.1504V24.2432H20.045V48.5675ZM16.0977 20.1892C13.9177 20.1892 12.1504 18.3741 12.1504 16.1351C12.1504 13.8961 13.9177 12.0811 16.0977 12.0811C18.2777 12.0811 20.045 13.8961 20.045 16.1351C20.045 17.2103 19.6291 18.2415 18.8888 19.0018C18.1486 19.762 17.1446 20.1892 16.0977 20.1892Z"
            fill="white"
          />
        </svg>
      ) : socialMediaType === 'dribble' ? (
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30C59.9818 46.561 46.561 59.9818 30 60ZM15.36 49.635L15.345 49.665C22.1942 54.796 31.2279 55.9714 39.162 52.764C38.0248 46.6479 36.339 40.6466 34.125 34.833C29.0398 36.606 24.3906 39.4419 20.487 43.152C18.5632 44.9735 16.8977 47.0498 15.537 49.323L15.516 49.356V49.326L15.462 49.431L15.426 49.491L15.405 49.53L15.354 49.638L15.36 49.635ZM44.337 33.135C42.86 33.1371 41.3847 33.2373 39.921 33.435C41.8326 38.7766 43.3369 44.2552 44.421 49.824C49.5193 46.1489 52.9845 40.6314 54.081 34.443C50.9071 33.5673 47.6295 33.1243 44.337 33.126V33.135ZM5.451 29.865V30.033C5.45647 35.8128 7.50157 41.4052 11.226 45.825C16.0508 38.3715 23.1878 32.7068 31.542 29.7L31.899 29.598C31.368 28.425 30.87 27.378 30.372 26.4C22.3678 28.6443 14.0997 29.8096 5.787 29.865H5.451ZM43.398 28.047C47.1205 28.0607 50.8346 28.4 54.498 29.061C54.3071 23.9862 52.5321 19.0986 49.422 15.084C45.7927 19.1428 41.2754 22.309 36.222 24.336L36.309 24.3L36.216 24.339C36.753 25.458 37.224 26.505 37.617 27.438C37.71 27.66 37.788 27.852 37.86 28.038L37.983 28.338C39.781 28.1385 41.5889 28.0413 43.398 28.047ZM19.131 8.031C12.6069 11.2511 7.84855 17.2007 6.141 24.273C13.1321 24.165 20.0897 23.2816 26.886 21.639H26.925H26.97L27 21.6L27.162 21.561H27.18L27.3 21.537H27.327H27.348L27.411 21.519L27.531 21.489L27.6 21.459L27.666 21.441H27.696H27.726C23.727 14.4 19.587 8.661 19.128 8.031H19.131ZM30 5.51692C28.3578 5.51286 26.719 5.6686 25.107 5.982C28.2498 10.3368 31.1338 14.8726 33.744 19.566C38.4184 17.9012 42.5873 15.0647 45.852 11.328C41.42 7.57979 35.8044 5.52124 30 5.51692Z"
            fill="#ED2757"
          />
        </svg>
      ) : socialMediaType === 'other' ? (
        <svg
          width="61"
          height="60"
          viewBox="0 0 61 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect x="0.769531" width="60" height="60" rx="30" fill="#F5F5F5" />
          <path
            d="M43.2695 17.5H33.2695V22.5H43.2695C47.3945 22.5 50.7695 25.875 50.7695 30C50.7695 34.125 47.3945 37.5 43.2695 37.5H33.2695V42.5H43.2695C50.1695 42.5 55.7695 36.9 55.7695 30C55.7695 23.1 50.1695 17.5 43.2695 17.5ZM28.2695 37.5H18.2695C14.1445 37.5 10.7695 34.125 10.7695 30C10.7695 25.875 14.1445 22.5 18.2695 22.5H28.2695V17.5H18.2695C11.3695 17.5 5.76953 23.1 5.76953 30C5.76953 36.9 11.3695 42.5 18.2695 42.5H28.2695V37.5ZM20.7695 27.5H40.7695V32.5H20.7695V27.5Z"
            fill="#F52763"
          />
        </svg>
      ) : null}
    </a>
  )
}
