// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchImage } from '~domains/pexels/fetchImage'
import { Photo } from '~types/Photo'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Photo>
) {
  try {
    const id = req.query?.id as string

    const response = await fetchImage(id)
    res.status(200).json(response)
  } catch (e) {
    console.error(e)
  }
}
