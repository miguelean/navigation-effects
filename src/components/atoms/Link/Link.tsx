'use client'

import { LinkProps } from 'next/link'
import { FunctionComponent, MouseEventHandler, ReactNode } from 'react'
import * as NextLink from 'next/link'
import classnames from 'classnames'

type CustomLinkProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  children?: ReactNode
}

export const Link: FunctionComponent<LinkProps & CustomLinkProps> = ({
  href,
  onClick,
  children,
  className,
}) => {
  return (
    <button
      aria-label='link'
      className={classnames('duration-500 ease-in-out', className)}
      onClick={onClick}
    >
      {children}
      <NextLink.default className='hidden' href={href}></NextLink.default>
    </button>
  )
}
