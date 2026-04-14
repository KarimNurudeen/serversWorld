'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react'

interface Props {
  images: string[]
  title: string
}

export default function ProjectGallery({ images, title }: Props) {
  const [main, setMain]             = useState(0)   // which image shows in the main slot
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIdx, setLightboxIdx]   = useState(0)

  const prevLightbox = useCallback(
    () => setLightboxIdx((c) => (c - 1 + images.length) % images.length),
    [images.length]
  )
  const nextLightbox = useCallback(
    () => setLightboxIdx((c) => (c + 1) % images.length),
    [images.length]
  )

  useEffect(() => {
    if (!lightboxOpen) return
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      setLightboxOpen(false)
      if (e.key === 'ArrowLeft')   prevLightbox()
      if (e.key === 'ArrowRight')  nextLightbox()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lightboxOpen, prevLightbox, nextLightbox])

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxOpen])

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx)
    setLightboxOpen(true)
  }

  return (
    <div className="flex flex-col h-full">
      {/* ── Main image — grows to fill column height ── */}
      <div
        className="relative flex-1 min-h-[240px] overflow-hidden cursor-zoom-in group"
        onClick={() => openLightbox(main)}
      >
        <Image
          src={images[main]}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          priority
        />
        {/* Expand hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-end p-4">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/20 px-3 py-1.5">
            <Expand size={13} className="text-white/80" />
            <span className="font-primary font-bold text-[10px] uppercase tracking-widest text-white/80">
              {images.length > 1 ? `${main + 1} / ${images.length}` : 'Expand'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Thumbnail row ── */}
      {images.length > 1 && (
        <div className="flex gap-2 p-3 border-t border-divider">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setMain(i)}
              aria-label={`Show image ${i + 1}`}
              className={`shrink-0 transition-all duration-200 ${
                i === main
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-background opacity-100'
                  : 'opacity-40 hover:opacity-70'
              }`}
            >
              {/* Explicit-dimension wrapper required for Next.js Image fill */}
              <div className="relative w-20 h-14 overflow-hidden border border-divider">
                <Image
                  src={img}
                  alt={`${title} — image ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) setLightboxOpen(false) }}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/60 to-transparent z-10">
            <p className="font-primary font-bold text-label-sm uppercase tracking-widest text-white/50">
              {title}
            </p>
            <div className="flex items-center gap-6">
              <span className="font-primary text-label-sm text-white/40">
                {lightboxIdx + 1} / {images.length}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={prevLightbox}
              className="absolute left-4 z-10 flex items-center justify-center h-12 w-12 border border-white/20 bg-black/40 hover:bg-white/10 hover:border-white/50 text-white/60 hover:text-white transition-all"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Image */}
          <div className="relative max-w-5xl w-full mx-20">
            <div className="relative aspect-video">
              <Image
                src={images[lightboxIdx]}
                alt={`${title} — ${lightboxIdx + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={nextLightbox}
              className="absolute right-4 z-10 flex items-center justify-center h-12 w-12 border border-white/20 bg-black/40 hover:bg-white/10 hover:border-white/50 text-white/60 hover:text-white transition-all"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  className={`h-1 transition-all duration-200 ${
                    i === lightboxIdx ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
