import { Photo } from '~types/Photo'

export const fetchImage = async (
  id: string,
  isDynamic?: boolean
): Promise<Photo> => {
  const res = await fetch(`${process.env.PEXELS_API_PHOTO_URL ?? ''}/${id}`, {
    method: 'GET',
    cache: isDynamic ? 'no-cache' : 'default',
    next: isDynamic ? { revalidate: 0 } : { revalidate: 60 },
    headers: {
      Authorization: `${process.env.PEXELS_API_KEY}`,
    },
  })

  const response = await res.json()

  return response
}
