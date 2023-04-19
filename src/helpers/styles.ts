import { Size } from '~types/Photo'

export const handleSliderAnimation = (
  idx: number,
  activeImg: number | undefined,
  navigate: boolean,
  type: 'horizontal' | 'vertical'
) => {
  if (activeImg) {
    if (!navigate) return 'duration-700'
    if (idx === activeImg) return 'duration-500'
    if (Math.abs(idx - activeImg) === 1) return 'duration-[1400ms]'
    if (Math.abs(idx - activeImg) === 2) return 'duration-[1200ms]'
    if (Math.abs(idx - activeImg) === 3) return 'duration-[1000ms]'
    if (Math.abs(idx - activeImg) === 4) return 'duration-[800ms]'
    if (Math.abs(idx - activeImg) === 5) return 'duration-[600ms]'
    if (Math.abs(idx - activeImg) === 6) return 'duration-[400ms]'
    if (Math.abs(idx - activeImg) === 7) return 'duration-[200ms]'
  }
  if (!activeImg) {
    if ((idx === 0 && !navigate) || (idx === 13 && navigate))
      return 'duration-[500ms]'
    if ((idx === 1 && !navigate) || (idx === 12 && navigate))
      return 'duration-[600ms]'
    if ((idx === 2 && !navigate) || (idx === 11 && navigate))
      return 'duration-[700ms]'
    if ((idx === 3 && !navigate) || (idx === 10 && navigate))
      return 'duration-[800ms]'
    if ((idx === 4 && !navigate) || (idx === 9 && navigate))
      return 'duration-[900ms]'
    if ((idx === 5 && !navigate) || (idx === 8 && navigate))
      return 'duration-[1000ms]'
    if ((idx === 6 && !navigate) || (idx === 7 && navigate))
      return 'duration-[1100ms]'
    if ((idx === 7 && !navigate) || (idx === 6 && navigate))
      return 'duration-[1200ms]'
    if ((idx === 8 && !navigate) || (idx === 5 && navigate))
      return 'duration-[1300ms]'
    if ((idx === 9 && !navigate) || (idx === 4 && navigate))
      return 'duration-[1400ms]'
    if ((idx === 10 && !navigate) || (idx === 3 && navigate))
      return 'duration-[1400ms]'
    if ((idx === 11 && !navigate) || (idx === 2 && navigate))
      return 'duration-[1500ms]'
    if ((idx === 12 && !navigate) || (idx === 1 && navigate))
      return 'duration-[1600ms]'
    if ((idx === 13 && !navigate) || (idx === 0 && navigate))
      return 'duration-[1700ms]'
    return 'duration-700'
  }
}

export const handleImgSize = (size: Size) => {
  return { width: `${size?.w}px`, height: `${size?.h}px` }
}

export const handleRandomDuration = () => {
  const random = Math.floor(Math.random() * 25) + 10
  if (random === 10) return 'duration-[1000ms]'
  if (random === 11) return 'duration-[1100ms]'
  if (random === 12) return 'duration-[1200ms]'
  if (random === 13) return 'duration-[1300ms]'
  if (random === 14) return 'duration-[1400ms]'
  if (random === 15) return 'duration-[1500ms]'
  if (random === 16) return 'duration-[1600ms]'
  if (random === 17) return 'duration-[1700ms]'
  if (random === 18) return 'duration-[1800ms]'
  if (random === 19) return 'duration-[1900ms]'
  if (random === 20) return 'duration-[2000ms]'
  if (random === 21) return 'duration-[2100ms]'
  if (random === 22) return 'duration-[2200ms]'
  if (random === 23) return 'duration-[2300ms]'
  if (random === 24) return 'duration-[2400ms]'
  if (random === 25) return 'duration-[2500ms]'
  if (random === 26) return 'duration-[2600ms]'
  if (random === 27) return 'duration-[2700ms]'
  if (random === 28) return 'duration-[2800ms]'
  if (random === 29) return 'duration-[2900ms]'
  if (random === 30) return 'duration-[3000ms]'

  return 'duration-1000'
}
