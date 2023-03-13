'use client'

import classnames from 'classnames'
import { useEffect, useReducer, useState } from 'react'
import { useNavigationContext } from '~components/providers/NavigationProvider'
import { Photo, PhotoTypes } from '~types/Photo'
import Image from 'next/image'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { handleRandomDuration } from '../../../helpers/styles'

type GalleryProps = {
  id: string
}

export const Gallery = ({ id }: GalleryProps) => {
  const { navigate, setNavigate } = useNavigationContext()
  const [photo, setPhoto] = useState<Photo | undefined>(undefined)
  const [loadedImages, setLoadedImages] = useReducer(
    (state: Record<PhotoTypes, boolean>, img: { [key: string]: boolean }) => {
      return {
        ...state,
        ...img,
      }
    },
    {
      original: false,
      large2x: false,
      large: false,
      medium: false,
      small: false,
      tiny: false,
      portrait: false,
      landscape: false,
    }
  )

  const fetchPhoto = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/pexels/fetchPhoto?id=${id}`,
      {
        method: 'GET',
      }
    )
    if (res.ok) {
      const response = await res.json()
      setPhoto(response)
    }
  }

  useEffect(() => {
    fetchPhoto()
  }, [])

  useEffect(() => {
    photo &&
      setTimeout(() => {
        setNavigate(false)
      }, 500)
  }, [photo])

  const variant: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  }

  return (
    <div className='w-full h-full px-4 pb-8 sm:px-9 sm:pb-16'>
      <AnimatePresence>
        {!navigate && (
          <motion.div
            variants={variant}
            exit='exit'
            className='w-full min-h-[100vh] grid grid-cols-12 grid-rows-10 gap-4'
          >
            <div
              className={classnames(
                'relative w-full h-full col-start-1 col-end-9 row-span-6 items-center cursor-pointer ease-in-out',
                {
                  [handleRandomDuration()]: loadedImages?.landscape,
                  'opacity-100': loadedImages?.landscape,
                  'opacity-0 duration-500': !loadedImages?.landscape,
                }
              )}
            >
              <Image
                className='rounded-lg'
                fill
                sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 100vw,
                        100vw'
                priority
                onLoad={() => setLoadedImages({ landscape: true })}
                quality={100}
                style={{ objectFit: 'cover' }}
                src={photo?.src.landscape ?? ''}
                alt={photo?.alt ?? ''}
              />
            </div>
            <div
              className={classnames(
                'relative w-full h-full col-start-9 col-end-13 row-span-full items-center cursor-pointer ease-in-out',
                {
                  [handleRandomDuration()]: loadedImages?.portrait,
                  'opacity-100': loadedImages?.portrait,
                  'opacity-0 duration-500': !loadedImages?.portrait,
                }
              )}
            >
              <Image
                className='rounded-lg'
                fill
                sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 100vw,
                        100vw'
                priority
                onLoad={() => setLoadedImages({ portrait: true })}
                quality={100}
                style={{ objectFit: 'cover' }}
                src={photo?.src.portrait ?? ''}
                alt={photo?.alt ?? ''}
              />
            </div>

            <div
              className={classnames(
                'relative w-full h-full col-start-1 col-end-2 row-span-2 flex items-center p-4 cursor-pointer ease-in-out',
                {
                  [handleRandomDuration()]: loadedImages.small,
                  'opacity-100': loadedImages.small,
                  'opacity-0 duration-500': !loadedImages.small,
                }
              )}
            >
              <Image
                className='rounded-lg'
                fill
                sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 100vw,
                        100vw'
                priority
                onLoad={() => setLoadedImages({ small: true })}
                quality={100}
                style={{ objectFit: 'cover' }}
                src={photo?.src.small ?? ''}
                alt={photo?.alt ?? ''}
              />
            </div>

            <div
              className={classnames(
                'relative w-full h-full col-start-1 col-end-2 row-start-9 row-span-2 flex items-center p-4 cursor-pointer ease-in-out',
                {
                  [handleRandomDuration()]: loadedImages.tiny,
                  'opacity-100': loadedImages.tiny,
                  'opacity-0 duration-500': !loadedImages.tiny,
                }
              )}
            >
              <Image
                className='rounded-lg'
                fill
                sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 100vw,
                        100vw'
                priority
                onLoad={() => setLoadedImages({ tiny: true })}
                quality={100}
                style={{ objectFit: 'cover' }}
                src={photo?.src.tiny ?? ''}
                alt={photo?.alt ?? ''}
              />
            </div>

            <div
              className={classnames(
                'relative w-full h-full col-start-2 col-end-5 row-span-4 flex items-center p-4 cursor-pointer ease-in-out',
                {
                  [handleRandomDuration()]: loadedImages.large,
                  'opacity-100': loadedImages.large,
                  'opacity-0 duration-500': !loadedImages.large,
                }
              )}
            >
              <Image
                className='rounded-lg'
                fill
                sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 100vw,
                        100vw'
                priority
                onLoad={() => setLoadedImages({ large: true })}
                quality={100}
                style={{ objectFit: 'cover' }}
                src={photo?.src.large ?? ''}
                alt={photo?.alt ?? ''}
              />
            </div>
            <div
              className={classnames(
                'relative w-full h-full col-start-5 col-end-9 row-span-4 flex items-center p-4 cursor-pointer ease-in-out',
                {
                  [handleRandomDuration()]: loadedImages.large2x,
                  'opacity-100': loadedImages.large2x,
                  'opacity-0 duration-500': !loadedImages.large2x,
                }
              )}
            >
              <Image
                className='rounded-lg'
                fill
                sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 100vw,
                        100vw'
                priority
                onLoad={() => setLoadedImages({ large2x: true })}
                quality={100}
                style={{ objectFit: 'cover' }}
                src={photo?.src.large2x ?? ''}
                alt={photo?.alt ?? ''}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
