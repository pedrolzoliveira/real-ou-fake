import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../prisma/client'
import { getTweetByStatus } from '../../server-services/twitter'
import { Tweet } from '../../types/tweet'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const queryReturn = await client.$queryRaw<Omit<Tweet & { id: string } & { username: string, name: string, image: string }, 'author'>[]>`
      SELECT
        "T"."id",
        "T"."tweet",
        "T"."time",
        "T"."source",
        "T"."permalink",
        "A"."username",
        "A"."name",
        "A"."image"
      FROM "Tweet" "T"
      JOIN "Author" "A"
      ON ("T"."username" = "A"."username")
      ORDER BY random()
      LIMIT 1`

      const tweet = {
        id: queryReturn[0].id,
        tweet: queryReturn[0].tweet,
        time: queryReturn[0].time,
        source: queryReturn[0].source,
        permalink: queryReturn[0].permalink,
        author: {
          name: queryReturn[0].name,
          username: queryReturn[0].username,
          image: queryReturn[0].image
        }
      }

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
        time,
        permalink
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
          permalink,
          source: source ?? 'Twitter from iPhone',
          time: time ?
            new Date(time) : new Date(),
          author: {
            connectOrCreate: {
              create: {
                username,
                name: name ?? 'any_name',
                image: image ?? 'any_link'
              },
              where: { username }
            }
          }
        },
        select: {
          id: true,
          tweet: true,
          permalink: true,
          source: true,
          time: true,
          author: true 
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
