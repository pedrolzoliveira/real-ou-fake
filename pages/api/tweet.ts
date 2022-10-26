import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../prisma/client'
import { getTweetByStatus } from '../../server-services/twitter'

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
        const tweet = getTweetByStatus(req.body.status)
        return res.status(201).send({ tweet })
      }
      const {
        tweet,
        author,
        source,
        time
      } = req.body
      
      if (!tweet || !author?.username) {
        return res.status(401).json({
          error: 'required fields are missing'
        })
      }

      const { name, username, image } = author
      
      const prismaTweet = await client.tweet.create({
        data: {
          tweet,
          username,
          source: source ?? 'Twitter from iPhone',
          time: new Date(time),
          author: {
            connectOrCreate: {
              create: {
                name,
                username,
                image
              },
              where: { username }
            }
          }
        } 
      })

      return res.status(201).json({
        tweet: prismaTweet
      })

    }
    default: {
      return res.status(501).json({
        error: `METHOD ${req.method} not implemented`
      })
    }
  }
}
