import React, {Suspense} from 'react'
import type {Metadata} from 'next'
import PhotoAlbum from 'react-photo-album'
import {Section} from '@/components'
import {NextJsImage} from './NextJsImage'
import {getPhotos} from '@/actions/airtable'

export const metadata: Metadata = {
  title: 'Photos 사진',
}
export default function PhotosPage() {
  return (
    <Section title="Photos" className="pt-44">
      <Suspense fallback="loading...">
        <Photos />
      </Suspense>
    </Section>
  )
}

async function Photos() {
  const photos = await getPhotos({limit: 100})
  const albumPhotos: {src: string; width: number; height: number}[] = []
  for (const photo of photos) {
    for (const _photo of photo.photos) {
      if (_photo.thumbnails?.large) {
        albumPhotos.push({
          src: _photo.thumbnails.large.url,
          width: _photo.thumbnails.large.width,
          height: _photo.thumbnails.large.height,
        })
      } else if (_photo.thumbnails?.small) {
        albumPhotos.push({
          src: _photo.thumbnails.small.url,
          width: _photo.thumbnails.small.width,
          height: _photo.thumbnails.small.height,
        })
      }
    }
  }
  return (
    <PhotoAlbum
      layout="rows"
      photos={albumPhotos}
      renderPhoto={NextJsImage}
      defaultContainerWidth={1200}
      sizes={{size: 'calc(100vw - 240px)'}}
    />
  )
}
