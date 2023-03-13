'use client'

import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useNavigationContext } from '~components/providers/NavigationProvider'

export const Transition = () => {
  const { navigate, delay } = useNavigationContext()
  const [animation, setAnimation] = useState(navigate)

  useEffect(() => {
    navigate &&
      setTimeout(() => {
        setAnimation(true)
      }, delay)
    !navigate && setAnimation(false)
  }, [navigate])

  return (
    <div
      className={classNames(
        'w-screen h-screen flex fixed top-0 left-0 justify-center items-center bg-gradient-pure-lust duration-500 ease-in-out pointer-events-none',
        { 'opacity-100': animation, 'opacity-0': !animation }
      )}
    >
      {navigate && (
        <div className='flex flex-col gap-4 justify-center items-center'>
          <div className='loading-cube' />
          <p className='text-center text-white text-3xl font-mono'>Loading</p>
        </div>
      )}
    </div>
  )
}
