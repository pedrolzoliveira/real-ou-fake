import axios from "axios"
import { Tweet } from '../types/tweet'

export async function getRandomTweet() {
    const response = await axios.get<{ tweet?: Tweet }>('/api/tweet')
    return response.data
}