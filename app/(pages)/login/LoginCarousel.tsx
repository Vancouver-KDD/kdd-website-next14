'use client'
import Image from 'next/image';
import { Carousel } from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import { getPhotos } from '@/actions/airtable';

function Photos() {
    const [recentPhotos, setRecentPhotos] = useState<{ url: string }[]>([]);
  
    useEffect(() => {
      async function fetchPhotos() {
        const fetchedPhotos = await getPhotos({ limit: 3 });
        setRecentPhotos(fetchedPhotos[0].photos);
      }
  
      fetchPhotos();
    }, []);

    return (
        <Carousel autoplay autoplayDelay={2500} loop className="rounded-xl" placeholder={<div>Loading...</div>}>
            {recentPhotos.map((photo, index) => (
                <Image key={index} fill src={photo.url} alt={`photo-${index}`} className="w-96" />
            ))}
        </Carousel>
    )
}

export default function LoginCarousel() {
  return (
      <Photos />
  );
}