// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAlbum } from '~domains/pexels'
import { Photo } from '~types/Photo'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Photo[]>
) {
  try {
    const page = req.query?.page as string
    const perpage = req.query?.perPage as string

    const response = await fetchAlbum(page, perpage)
    res.status(200).json(response)
  } catch (e) {
    console.error(e)
  }
}
