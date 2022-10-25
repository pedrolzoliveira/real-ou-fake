import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const tweet = await client.tweet.findFirst({select: {
        id: true,
        tweet: true,
        permalink: true,
        source: true,
        time: true,
        author: true
      }})
      res.status(200).json({ tweet })
    }
    case "POST": {
      if (req.body.status) {
        // Import tweet
      }
      return res.status(201).send({})
    }
    default: {
      return res.status(501).json({
        error: `METHOD ${req.method} not implemented`
      })
    }
  }
}
