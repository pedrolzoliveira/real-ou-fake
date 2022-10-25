import type { NextPage } from 'next'
import Image from 'next/image'
import FakeStamp from '../public/fake-stamp.png'
import { TweetCard } from '../components/tweet-card'

const Home: NextPage = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='absolute'>
        <Image alt='fake stamp' src={FakeStamp}/>
      </div>
      <div className='grid grid-cols-2 gap-4 p-4'>
          <TweetCard
          className='col-span-2'
          author={{
            name: 'Pedro',
            username: 'PedroLzOliveira',
            image:
              'https://pbs.twimg.com/profile_images/1584988234169438209/pBRy4EGz_400x400.jpg',
          }}
          tweet={`Odeio a apple`}
          time={new Date()}
          source="Twitter for iPhone"
          permalink="https://twitter.com/randyfactory/status/1366841622495961091" // optional
        />
        
      <button className='bg-green-400 rounded p-4 text-white font-semi-bold text-lg'>Real</button>
      <button className='bg-red-500 rounded p-4 text-white font-semi-bold text-lg'>Fake</button>
      </div>
    </div>
  )
}

export default Home
