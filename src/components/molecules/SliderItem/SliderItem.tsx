'use client'
import classnames from 'classnames'
import Image from 'next/image'
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useNavigationContext } from '~components/providers/NavigationProvider'
import { Link } from '~components/atoms/Link'
import { useRouter } from 'next/navigation'
import { handleSliderAnimation } from '~helpers/*'

type SliderItemProps = {
  idx: number
  id: number
  src: string
  zoomedWidth?: number
  alt: string
  photographer: string
  photographerUrl: string
  isMobile: boolean
  containerWidth: number
  containerScroll: number
  setLoadedImages: Dispatch<{ [key: string]: boolean }>
  activeImg?: number
  setActiveImg: (value: SetStateAction<number | undefined>) => void
}

export const SliderItem = ({
  idx,
  id,
  src,
  zoomedWidth,
  alt,
  photographer,
  photographerUrl,
  isMobile,
  containerWidth,
  containerScroll,
  setLoadedImages,
  activeImg,
  setActiveImg,
}: SliderItemProps) => {
  const ref = useRef<HTMLLIElement>(null)
  const { push } = useRouter()
  const { navigate, setNavigate, setDelay } = useNavigationContext()

  const [style, setStyle] = useState<CSSProperties>({
    objectPosition: `100%`,
    objectFit: 'cover',
  })
  const [iteractions, setIteractions] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const [showExtraInfo, setShowExtraInfo] = useState(false)

  const handleStyle = () => {
    if (ref.current?.offsetLeft && ref.current?.offsetLeft > 0) {
      const pos = Math.min(
        Math.max(
          ((ref.current?.getBoundingClientRect().left +
            ref.current?.getBoundingClientRect().width) /
            containerWidth) *
            100,
          0
        ),
        100
      )
      setStyle({
        objectPosition: `${pos}%`,
        objectFit: 'cover',
      })
    }
  }

  const handleLinkClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setDelay(1000)
    setNavigate(!navigate)
    setTimeout(() => {
      setDelay(500)
      push(`/detail/${id}`)
    }, 1000)
  }

  const handleOnImageClick = () => {
    setActiveImg(activeImg !== idx ? idx : undefined)
  }

  const handleOnImageLoad = () => {
    setLoadedImages({ [idx]: true })
  }

  useEffect(() => {
    iteractions > 15 && handleStyle()
  }, [containerScroll, iteractions])

  useEffect(() => {
    setIsFocused(activeImg === idx)
  }, [activeImg])

  useEffect(() => {
    if (isFocused) {
      isMobile &&
        ref.current?.setAttribute(
          'style',
          `min-width: 100vw; 
        border-left: 10px solid;
        border-right: 10px solid;
        transition-duration:600ms;
        `
        )
      !isMobile &&
        ref.current?.setAttribute(
          'style',
          `min-width: ${zoomedWidth}px; 
        border-left: 10px solid;
        border-right: 10px solid;
        transition-duration:600ms;
        `
        )
    }

    !isFocused &&
      ref.current?.setAttribute('style', 'transition-duration:600ms')
    !isFocused &&
      setTimeout(() => {
        ref.current?.setAttribute('style', '')
      }, 500)
    isFocused &&
      setTimeout(() => {
        setShowExtraInfo(true)
      }, 500)
    !isFocused && setShowExtraInfo(false)
  }, [isFocused])

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      handleStyle()
      i++
      if (i > 300) {
        setIteractions(i)
        clearInterval(interval)
      }
    }, 10)
  }, [])

  useEffect(() => {
    if (!isFocused && ((activeImg ?? 0) < idx || (activeImg ?? 0) > idx)) {
      let i = 0
      const interval = setInterval(() => {
        handleStyle()
        i++
        if (i > 100) {
          clearInterval(interval)
        }
      }, 10)
    }
  }, [activeImg, isFocused])

  return (
    <li
      id={`${idx}`}
      ref={ref}
      key={alt}
      onClick={handleOnImageClick}
      className={classnames(
        'relative min-w-[30vw] sm:min-w-[8vw] h-[84vh] flex items-center ease-in-out cursor-pointer border-black z-50',
        {
          /* '-translate-y-1/2 opacity-0': navigate && idx % 2 === 0,
          'translate-y-1/2 opacity-0': navigate && idx % 2 === 0, */
          'translate-y-[40vw] opacity-0': navigate && !isFocused,
          'translate-y-0 opacity-100': !navigate && !isFocused,
          '-translate-y-[10vw] opacity-0': navigate && isFocused,
          '-translate-y-0 opacity-100': !navigate && isFocused,
        },
        handleSliderAnimation(idx, activeImg, navigate, 'vertical')
      )}
    >
      <Image
        fill
        sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              25vw'
        onLoad={handleOnImageLoad}
        priority
        quality={100}
        style={style}
        src={src}
        alt={alt}
      />

      <a
        onClick={(e) => e.stopPropagation()}
        target='_blank'
        href={photographerUrl}
        className={classnames(
          'w-full text-center absolute -bottom-7 text-white opacity-0 duration-500',
          {
            'opacity-100 ': showExtraInfo,
          }
        )}
      >
        <p className='text-base'>{photographer}</p>
      </a>
      <Link
        href={`/detail/${idx}`}
        onClick={handleLinkClick}
        className={classnames(
          'text-center underline absolute -bottom-7 right-2 text-white opacity-0 duration-500 z-50',
          {
            'opacity-100 ': showExtraInfo,
          }
        )}
      >
        View more
      </Link>
    </li>
  )
}
