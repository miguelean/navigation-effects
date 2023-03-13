import { useEffect, RefObject, useReducer } from 'react'

type Offset = {
  x: number | undefined
  y: number | undefined
}

export const scrollToElement = (
  element: HTMLElement | null,
  offset: number
) => {
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

export const useOffset = (component?: HTMLElement | null): Offset => {
  const [offset, setOffset] = useReducer(
    (state) => {
      return {
        ...state,
        x: component?.scrollLeft ?? window.scrollX,
        y: component?.scrollTop ?? window.scrollY,
      }
    },
    {
      x: undefined,
      y: undefined,
    }
  )

  useEffect(() => {
    ;(component ?? window).addEventListener('scroll', setOffset)
    setOffset()
    return () => (component ?? window).removeEventListener('scroll', setOffset)
  }, [component])

  return offset
}
