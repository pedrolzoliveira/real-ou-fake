import { Tweet } from "../types/tweet";

export async function getTweetByStatus(status: string) : Promise<Tweet> {
    /**
     * TODO:
     * IMPLEMENT GET FROM TWITTER
     * CREATE AUTHOR IF NOT EXISTS
     * UPDATE AUTHOR IF IT`S OUT OF DATE (NAME AND USERNAME)
     * SAVES IF NOT EXISTS AND RETURNS TWEET
     */
    return {
        author: {
            name: 'Pedro',
            username: 'PedrolzOliveira',
            image: 'https://pbs.twimg.com/profile_images/1584988234169438209/pBRy4EGz_400x400.jpg'
        },
        source: 'Twitter from Android',
        time: new Date(),
        tweet: 'Esse é um tweet de teste',
        permalink: `https://www.twitter.com/PedrolzOliveira/status/${status}`
    }
}