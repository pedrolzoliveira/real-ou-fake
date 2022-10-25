import dynamic from 'next/dynamic'

export const TweetCard = dynamic(
  () => import('react-tweet-card'),
  { ssr: false }
)
