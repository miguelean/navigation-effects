'use client'

import classnames from 'classnames'
import { useEffect, useState } from 'react'
import { useNavigationContext } from '~components/providers/NavigationProvider'
import { Photo } from '~types/Photo'
import Image from 'next/image'
import { AnimatePresence, motion, Variants } from 'framer-motion'

type GalleryProps = {
  id: string
}

export const Gallery_old = ({ id }: GalleryProps) => {
  const { navigate, setNavigate } = useNavigationContext()
  const [photo, setPhoto] = useState<Photo | undefined>(undefined)

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
          <div className='w-full min-h-[100vh] grid grid-cols-12 grid-rows-10 gap-4'>
            <motion.div
              className={classnames(
                'relative w-full h-full col-start-1 col-end-9 row-span-6 items-center cursor-pointer'
              )}
              variants={variant}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{
                duration: (Math.floor(Math.random() * 25) + 10) / 10,
                ease: 'easeInOut',
              }}
            >
              <Image
                className='rounded-lg'
                fill
                sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 100vw,
                        100vw'
                priority
                quality={100}
                style={{ objectFit: 'cover' }}
                src={photo?.src.landscape ?? ''}
                alt={photo?.alt ?? ''}
              />
            </motion.div>
            <motion.div
              className={classnames(
                'relative w-full h-full col-start-9 col-end-13 row-span-full items-center cursor-pointer'
              )}
              variants={variant}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{
                duration: (Math.floor(Math.random() * 25) + 10) / 10,
                ease: 'easeInOut',
              }}
            >
              <Image
                className='rounded-lg'
                fill
                sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 100vw,
                        100vw'
                priority
                quality={100}
                style={{ objectFit: 'cover' }}
                src={photo?.src.portrait ?? ''}
                alt={photo?.alt ?? ''}
              />
            </motion.div>

            <motion.div
              className={classnames(
                'relative w-full h-full col-start-1 col-end-2 row-span-2 flex items-center p-4 cursor-pointer'
              )}
              variants={variant}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{
                duration: (Math.floor(Math.random() * 25) + 10) / 10,
                ease: 'easeInOut',
              }}
            >
              <Image
                className='rounded-lg'
                fill
                sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 100vw,
                        100vw'
                priority
                quality={100}
                style={{ objectFit: 'cover' }}
                src={photo?.src.small ?? ''}
                alt={photo?.alt ?? ''}
              />
            </motion.div>

            <motion.div
              className={classnames(
                'relative w-full h-full col-start-1 col-end-2 row-start-9 row-span-2 flex items-center p-4 cursor-pointer'
              )}
              variants={variant}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{
                duration: (Math.floor(Math.random() * 25) + 10) / 10,
                ease: 'easeInOut',
              }}
            >
              <Image
                className='rounded-lg'
                fill
                sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 100vw,
                        100vw'
                priority
                quality={100}
                style={{ objectFit: 'cover' }}
                src={photo?.src.tiny ?? ''}
                alt={photo?.alt ?? ''}
              />
            </motion.div>

            <motion.div
              className={classnames(
                'relative w-full h-full col-start-2 col-end-5 row-span-4 flex items-center p-4 cursor-pointer'
              )}
              variants={variant}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{
                duration: (Math.floor(Math.random() * 25) + 10) / 10,
                ease: 'easeInOut',
              }}
            >
              <Image
                className='rounded-lg'
                fill
                sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 100vw,
                        100vw'
                priority
                quality={100}
                style={{ objectFit: 'cover' }}
                src={photo?.src.large ?? ''}
                alt={photo?.alt ?? ''}
              />
            </motion.div>
            <motion.div
              className={classnames(
                'relative w-full h-full col-start-5 col-end-9 row-span-4 flex items-center p-4 cursor-pointer'
              )}
              variants={variant}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{
                duration: (Math.floor(Math.random() * 25) + 10) / 10,
                ease: 'easeInOut',
              }}
            >
              <Image
                className='rounded-lg'
                fill
                sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 100vw,
                        100vw'
                priority
                quality={100}
                style={{ objectFit: 'cover' }}
                src={photo?.src.large2x ?? ''}
                alt={photo?.alt ?? ''}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
