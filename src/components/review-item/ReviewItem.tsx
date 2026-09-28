import * as React from "react"
import "./review-item.scss"
import RatingDisplay from "../rating-display/RatingDisplay";

export default function ReviewItem({ review }: { review: Review }) {

   const { title, author, date, rating, content, genres } = review;

   const genreArray = genres.split(",");

   return <article className="review-item-container">
      <div className="date-container">
         <h2>{title}</h2>
         <p className="date">{date.toLocaleDateString("en-GB")}</p>
      </div>
      <p className="author-name">{author}</p>
      <RatingDisplay rating={rating} />
      <details>
         <summary>
            My thoughts
         </summary>
         <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </details>
      <ul className="genre-container">
         {genreArray.map(genre => (<li className="genre-item">{genre}</li>))}
      </ul>
   </article>
}

export interface Review {
   title: string
   author: string
   genres: string
   date: Date
   rating: number
   content: string
}

