import type {Attachment} from 'airtable'
import Image from 'next/image'
import {getPhotos} from '../actions/airtable'

// let dialog: HTMLDialogElement
// let selectedPhotoAttachment: null | Attachment = null
// $: selectedPhotoAttachment ? dialog?.showModal() : dialog?.close()

export default async function Photos() {
  const photos = await getPhotos({limit: 20})
  return photos.map(({title, description, photos, id}) => {
    return (
      photos &&
      photos.length > 0 &&
      photos.map((photo) => {
        return (
          <button
            key={photo.id}
            // onClick={() => (selectedPhotoAttachment = photo)}
            className="flex-col items-center w-96 min-w-96 gap-2">
            <div className="bg-slate-200 h-72 w-full overflow-clip rounded">
              <div className="relative w-full h-full ">
                <Image
                  className="object-cover hover:scale-125 transition-transform"
                  fill
                  src={photo.url}
                  alt="{description ?? ''} {photo.filename}"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-lg font-bold">{title}</div>
            <div>{description ?? ''}</div>
          </button>
        )
      })
    )
  })
}

{
  /* <dialog
  bind:this={dialog}
  on:click={() => dialog.close()}
  on:close={() => (selectedPhotoAttachment = null)}
  class="bg-transparent backdrop-blur-sm max-w-full max-h-full min-w-full min-h-full">
  <div class="w-full h-screen p-0 md:p-20 flex-center">
    <img
      class="bg-slate-200 max-w-full max-h-full object-contain rounded"
      src={selectedPhotoAttachment?.url}
      alt={selectedPhotoAttachment?.filename} />
  </div>
</dialog> */
}
