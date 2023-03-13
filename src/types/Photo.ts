export type Photo = {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  liked: boolean
  alt: string
}

export type PhotoSizes = {
  original: Size | null
  large2x: Size | null
  large: Size | null
  medium: Size | null
  small: Size | null
  portrait: Size | null
  landscape: Size | null
}

export type PhotoTypes = keyof Photo['src']

export type Size = {
  w: string
  h: string
} | null
