import type { NextApiRequest, NextApiResponse } from 'next'
import { Tweet } from '../../types/tweet'

type Data = {
    tweet: Tweet
    status: 'real' | 'fake'
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    tweet: {
        author: {
            name: 'Pedro',
            username: 'PedroLzOliveira',
            image: 'https://pbs.twimg.com/profile_images/1584988234169438209/pBRy4EGz_400x400.jpg',
        },
        time: new Date(),
        tweet: 'carai mo preguiça',
        source: 'Twitter',
    },
    status: 'fake'
  })
}
