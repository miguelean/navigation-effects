'use client'

import classnames from 'classnames'
import { useNavigationContext } from '~components/providers/NavigationProvider'
import { CSSProperties, useEffect, useReducer, useRef, useState } from 'react'
import { SliderItem } from '~components/molecules/SliderItem'
import { useOffset } from '~helpers/index'
import { useRouter } from 'next/navigation'
import { Photo } from '~types/Photo'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import classNames from 'classnames'

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
      `${process.env.NEXT_PUBLIC_HOST}/api/pexels/fetchAlbum?page=${page}&perPage=20`,
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
    if (Object.keys(loadedImages).length > 17) {
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
        document.body.setAttribute('style', 'overflow-y: hidden')
        setTimeout(() => {
          !navigate && push(`${page}`)
          document.body.setAttribute('style', '')
        }, 1000)
        setNavigate(true)
      }
    }
  }, [y])

  useEffect(() => {
    fetchAlbum()
  }, [])

  const scrollHandler = (evt: WheelEvent) => {
    if (ref.current && window) {
      const sliderCurrentScroll =
        ref.current.scrollWidth -
        ref.current.offsetWidth -
        ref.current.scrollLeft
      const isFullyScrolled =
        sliderCurrentScroll < 5 && sliderCurrentScroll > -5
      const deltaXY = evt.deltaX + evt.deltaY
      if (
        !isFullyScrolled ||
        (isFullyScrolled && window.scrollY === 0 && evt.deltaY < 0)
      ) {
        evt.stopPropagation()
        evt.preventDefault()

        ref.current.scrollLeft += deltaXY / 4
      }
    }
  }

  useEffect(() => {
    const main = document.querySelector('main')
    main?.addEventListener('wheel', scrollHandler)
  }, [])

  const variant: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  }

  return (
    <ul
      ref={ref}
      style={style}
      className={classnames(
        'w-full h-[90vh] pl-4 sm:pl-8 flex overflow-x-scroll overflow-y-hidden hiddenScrollBar'
      )}
    >
      {!isMobile && (
        <li
          className={classNames(
            'min-w-[35vw] min-h-full flex flex-col justify-center items-center text-white duration-[1000ms] ease-in-out',
            {
              'opacity-0':
                navigate ||
                (ref.current &&
                  ref.current.scrollLeft / window.innerWidth > 0.14 &&
                  ref.current.offsetWidth !== 0),
            }
          )}
        >
          <AnimatePresence>
            {!navigate && (
              <motion.div
                variants={variant}
                initial='initial'
                animate='animate'
                transition={{
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
                className='fixed flex flex-col justify-center items-center'
              >
                <h1>Title placeholder</h1>
                <h2>Subtitle</h2>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      )}
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
            photographerUrl={photo.photographer_url}
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
      {!isMobile && (
        <li
          className={classNames(
            'sticky right-0 min-w-[35vw] min-h-full flex flex-col justify-center items-center text-white duration-[1000ms] ease-in-out',
            {
              'opacity-0':
                navigate ||
                !(
                  ref.current &&
                  ref.current.scrollWidth -
                    ref.current.offsetWidth -
                    ref.current.scrollLeft <
                    window.innerWidth / 6
                ),
            }
          )}
        >
          <AnimatePresence>
            {!navigate && (
              <motion.div
                variants={variant}
                initial='initial'
                animate='animate'
                transition={{
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
                className='flex flex-col justify-center items-center z-40'
              >
                <h1>Title placeholder</h1>
                <h2>Subtitle</h2>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      )}
    </ul>
  )
}
