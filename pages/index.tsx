import type { NextPage } from 'next'
import 'react'
import { TweetCard } from '../components/tweet-card'

const Home: NextPage = () => {
  return (
    <div>
      <TweetCard
      author={{
        name: 'randy',
        username: 'randyfactory',
        image:
          'https://pbs.twimg.com/profile_images/1382083582752096262/xrx0PO8Z_400x400.jpg',
      }}
      tweet={`how was “philosopher” ever a job lmao like was socrates sippin wine on a balcony somewhere drunkenly slurring shit like “to find urself, think for urself” with a crowd cheering underneath him like fuck yes socrates another banger this man will not miss`}
      time={new Date(2021, 2, 2, 21, 3)}
      source="Twitter for iPhone"
      permalink="https://twitter.com/randyfactory/status/1366841622495961091" // optional
    />
    </div>
  )
}

export default Home
