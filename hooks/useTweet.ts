import { useQuery } from 'react-query'
import { getRandomTweet } from '../client-services/tweets'

export const useTweet = () => {
    return useQuery('tweet', getRandomTweet)
}
