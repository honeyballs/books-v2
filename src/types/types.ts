export interface Review {
   title: string
   author: string
   genres: string[]
   date: Date
   rating: number
   content: string
}

export type FilterCriteria = {
  author: string
  genre: string
  rating: number
}