'use client'
import {useEffect} from 'react'
import createKofiWidgetOverlay from './createKofiWidgetOverlay'

export default function KofiWidgetOverlay() {
  useEffect(() => {
    const kofiWidgetOverlay = createKofiWidgetOverlay()
    kofiWidgetOverlay.draw('vancouverkdd', {
      type: 'floating-chat',
      'floating-chat.donateButton.text': 'Support KDD',
      'floating-chat.donateButton.background-color': '#784BC3',
      'floating-chat.donateButton.text-color': '#fff',
    })
  }, [])
  return null
}
