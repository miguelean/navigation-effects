'use client'

import classnames from 'classnames'
import { useNavigationContext } from '~components/providers/NavigationProvider'
import { CSSProperties, useEffect, useReducer, useRef, useState } from 'react'
import { SliderItem } from '~components/atoms/SliderItem'
import { useOffset } from '~helpers/index'
import { useRouter } from 'next/navigation'
import { Photo } from '~types/Photo'

type SliderProps = {
  page: number
}

export const Slider = ({ page }: SliderProps) => {
  const ref = useRef<HTMLUListElement>(null)
  const { push } = useRouter()
  const { navigate, setNavigate, delay } = useNavigationContext()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [loadedImages, setLoadedImages] = useReducer(
    (state: Record<string, boolean>, img: { [key: string]: boolean }) => {
      return {
        ...state,
        ...img,
      }
    },
    {}
  )
  const [style, setStyle] = useState<CSSProperties>({ opacity: 100 })
  const [activeImg, setActiveImg] = useState<number | undefined>(undefined)
  const { x } = useOffset(ref.current)
  const { y } = useOffset()

  const fetchAlbum = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/pexels/fetchAlbum?page=${page}&perPage=8`,
      {
        method: 'GET',
      }
    )
    if (res.ok) {
      setPhotos(await res.json())
    }
  }

  useEffect(() => {
    setIsMobile(window.innerWidth < 376)
  }, [])

  useEffect(() => {
    isMobile &&
      ref.current?.scrollTo({
        left:
          ref.current?.scrollLeft +
          (document.getElementById(`${activeImg}`)?.getBoundingClientRect()
            .left ?? 0),
        behavior: 'smooth',
      })
  }, [activeImg, isMobile])

  useEffect(() => {
    if (Object.keys(loadedImages).length > 7) {
      setTimeout(() => {
        setNavigate(false)
      }, delay)
    }
  }, [loadedImages])

  useEffect(() => {
    setStyle({
      opacity: 1 - (y ?? 1) / window.innerHeight,
    })
    if (y && y !== 0) {
      if (y / window.innerHeight > 0.85) {
        setTimeout(() => {
          !navigate && push(`${page}`)
        }, 1000)
        setNavigate(true)
      }
    }
  }, [y])

  useEffect(() => {
    fetchAlbum()
  }, [])
  return (
    <ul
      ref={ref}
      style={style}
      className={classnames(
        'w-full px-4 sm:px-8 pb-8 flex overflow-scroll hiddenScrollBar'
      )}
    >
      {photos.map((photo: Photo, idx) => {
        const urlParams = new URLSearchParams(photo.src?.portrait)
        const w = +(urlParams.get('w') as string)
        const h = +(urlParams.get('h') as string)
        const zoomedWidth =
          ((ref.current?.getBoundingClientRect().height ?? 1) * w) / h
        return (
          <SliderItem
            id={photo.id}
            key={idx}
            idx={idx}
            src={photo.src?.portrait}
            alt={photo.alt}
            photographer={photo.photographer}
            zoomedWidth={zoomedWidth}
            containerWidth={ref.current?.getBoundingClientRect().width ?? 1}
            containerScroll={x ?? 1}
            isMobile={isMobile}
            setLoadedImages={setLoadedImages}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
          />
        )
      })}
    </ul>
  )
}
