import { useQuery } from 'react-query'
import { getRandomTweet } from '../client-services/tweets'

export const useTweet = () => {
    return useQuery('tweet', getRandomTweet, {
        select(data) {
            if (data.tweet) {
                return {
                    tweet: {
                        ...data.tweet,
                        time: new Date(data.tweet.time)
                    },
                    status: data.tweet?.permalink ? 
                    'real' : 'fake'
                }
            }            
        },
    })
}

