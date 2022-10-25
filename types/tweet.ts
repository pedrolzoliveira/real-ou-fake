export interface Tweet {
    author: {
        name: string
        username: string
        image: string
    }
    tweet: string 
    time: string | Date
    source: string
    permalink?: string
}