import * as React from "react";
import "./rating-display.scss";

const MAX_RATING = 5;
const RATING_SHAPES = ["circle", "triangle", "square", "pentagon", "hexagon"];


const createShapeScale = (currentRating: number, maxRating: number) => {

   const shapes = [];

   for (let index = 0; index < maxRating; index++) {
      shapes.push(<div aria-hidden="true" key={RATING_SHAPES[index]} className={`shape ${RATING_SHAPES[index]} ${(currentRating - 1) < index && "grey"}`}></div>)
   }

   return shapes;
}

export default function RatingDisplay({ rating }: { rating: number }) {



   return <div
      aria-label="rating-scale"
      aria-describedby="rating-descr"
      id="rating-container">
      <p id="rating-descr">{`The book is rated ${rating}/${MAX_RATING}`}</p>
      {createShapeScale(rating, MAX_RATING)}
   </div>



}