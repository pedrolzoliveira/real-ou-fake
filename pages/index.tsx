import type { NextPage } from 'next'
import { useQueryClient } from 'react-query'
import { TweetCard } from '../components/tweet-card'
import { useTweet } from '../hooks/tweet-hooks'


const Home: NextPage = () => {

  const { data } = useTweet()

  const queryClient = useQueryClient()

  const invalidateTweetQuery = () => {
    queryClient.invalidateQueries(['tweet'])
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='grid grid-cols-2 gap-4 p-4'>
        {
          data?.tweet ? 
          <TweetCard
          className='col-span-2'
          { ...data.tweet }
        />
        : null
        }
      <button onClick={invalidateTweetQuery} className='bg-green-400 rounded p-4 text-white font-semi-bold text-lg'>Real</button>
      <button className='bg-red-500 rounded p-4 text-white font-semi-bold text-lg'>Fake</button>
      </div>
    </div>
  )
}

export default Home
