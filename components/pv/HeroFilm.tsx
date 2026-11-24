'use client'
import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

const TALL = '(max-aspect-ratio: 4/5)'
const FILM = { wide: '/videos/montage-wide.mp4', tall: '/videos/montage-tall.mp4', posterWide: '/videos/montage-wide.jpg', posterTall: '/videos/montage-tall.jpg' }

/**
 * The opening film. Its first frame is in the page from the start; the film is fetched after the
 * page has loaded, in the shape that fits the screen, and stops when scrolled away. It never
 * starts for visitors who ask for reduced motion or data saving, and can always be paused.
 */
export default function HeroFilm() {
  const video = useRef<HTMLVideoElement>(null)
  const held = useRef(false)
  const [on, setOn] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const v = video.current
    if (!v) return
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || saveData) return
    setAllowed(true)
    v.muted = true
    v.defaultMuted = true
    const mq = window.matchMedia(TALL)
    const pick = () => {
      const src = mq.matches ? FILM.tall : FILM.wide
      if (v.getAttribute('src') !== src) { v.src = src; v.load() }
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!v.getAttribute('src')) pick()
        if (!held.current) v.play().catch(() => {})
      } else v.pause()
    }, { rootMargin: '200px 0px' })
    io.observe(v)
    const onPlaying = () => { setOn(true); setPlaying(true) }
    const onPause = () => setPlaying(false)
    const onShape = () => { if (v.getAttribute('src')) { pick(); if (!held.current) v.play().catch(() => {}) } }
    v.addEventListener('playing', onPlaying)
    v.addEventListener('pause', onPause)
    mq.addEventListener('change', onShape)
    return () => { io.disconnect(); v.removeEventListener('playing', onPlaying); v.removeEventListener('pause', onPause); mq.removeEventListener('change', onShape) }
  }, [])

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) { held.current = false; v.play().catch(() => {}) } else { held.current = true; v.pause() }
  }

  return (
    <>
      <div className="pv-stage-film">
        <picture>
          <source media={TALL} srcSet={FILM.posterTall} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={FILM.posterWide} alt="" width={1920} height={1080} decoding="async" fetchPriority="high" />
        </picture>
        <video ref={video} muted loop playsInline preload="none" tabIndex={-1} data-on={on} />
      </div>
      {allowed && (
        <button type="button" onClick={toggle} className="pv-film-toggle" aria-label={playing ? 'Pause the film' : 'Play the film'}>
          {playing ? <Pause size={15} fill="currentColor" strokeWidth={0} /> : <Play size={15} fill="currentColor" strokeWidth={0} />}
        </button>
      )}
    </>
  )
}
