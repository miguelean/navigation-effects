import { Photo } from '~types/Photo'

export const fetchAlbum = async (
  page?: string,
  perPage?: string,
  isDynamic?: boolean
): Promise<Photo[]> => {
  const params = `?page=${page ?? '1'}&per_page=${perPage ?? '20'}`

  const res = await fetch(
    `${process.env.PEXELS_API_ALBUM_URL ?? ''}${params}`,
    {
      method: 'GET',
      cache: isDynamic ? 'no-cache' : 'default',
      next: isDynamic ? { revalidate: 0 } : { revalidate: 60 },
      headers: {
        Authorization: `${process.env.PEXELS_API_KEY}`,
      },
    }
  )

  const response = await res.json()

  return response.photos
}
