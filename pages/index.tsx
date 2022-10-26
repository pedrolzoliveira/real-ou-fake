import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { TweetCard } from '../components/tweet-card'
import { useTweet } from '../hooks/tweet-hooks'

import TrueStamp from '../public/true-stamp.png'
import FakeStamp from '../public/fake-stamp.png'

const RealOrFake = ({ real } : { real: boolean}) => {
  return (
    <div className='absolute pointer-events-none'>
      {
        real ? 
        <Image alt='true stamp' height={300} width={300}  src={TrueStamp}/>
        :
        <Image alt='fake stamp' src={FakeStamp}/>
      }
    </div>
  )
}

const Home: NextPage = () => {

  const [isRevealed, setIsRevealed] = useState(false)
  const [total, setTotal] = useState(0)
  const [right, setRight] = useState(0)

  const { data, isLoading } = useTweet()

  const queryClient = useQueryClient()

  const invalidateTweetQuery = () => {
    queryClient.refetchQueries(['tweet'])
    setIsRevealed(false)
    setTotal(v => v + 1)
  }

  const handleReveal = () => {
    setIsRevealed(true)
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      {
        isRevealed ?
        <RealOrFake real={ data?.status === 'real' }/>
        : null
      }
      <div className='grid grid-cols-2 gap-4 p-4'>
        {
          isLoading ? <p>Carregando...</p> :
            data?.tweet ? 
              <TweetCard
                className='col-span-2'
                { ...data.tweet }
                />
              : null
        }
      <button onClick={invalidateTweetQuery} className='bg-green-400 rounded p-4 text-white font-semi-bold text-lg'>Real</button>
      <button onClick={handleReveal} className='bg-red-500 rounded p-4 text-white font-semi-bold text-lg'>Fake</button>
      </div>
    </div>
  )
}

export default Home
