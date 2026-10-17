import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import { FilterCriteria } from "../../types/types";
import useContextAwareFilterCriteria from "./useContextAwareFilterCriteria";
import "./filter-bar.scss"

export interface FilterBarProps {
   currentFilterCriteria: FilterCriteria
   setFilterCriteria: React.Dispatch<React.SetStateAction<FilterCriteria>>
}

type Data = {
   allMarkdownRemark: {
      nodes: {
         frontmatter: {
            author: string
            genres: string[]
         }
      }[]
   }
}

export default function FilterBar({
   currentFilterCriteria,
   setFilterCriteria
}: FilterBarProps) {

   const allowedOptions = useContextAwareFilterCriteria(currentFilterCriteria);

   const onAuthorChange = React.useCallback((author: string) => {
      setFilterCriteria((current) => ({ ...current, author }))
   }, [setFilterCriteria]);

   const onGenreChange = React.useCallback((genre: string) => {
      setFilterCriteria((current) => ({ ...current, genre }))
   }, [setFilterCriteria]);

   const onRatingChange = React.useCallback((rating: number) => {
      setFilterCriteria((current) => ({ ...current, rating }))
   }, [setFilterCriteria]);

   const onResetForm = React.useCallback(() => { setFilterCriteria({ author: "", genre: "", rating: -1 }) }, [setFilterCriteria])

   return (<div className="filter-bar">

      <div className="filter-input">
         <label htmlFor="authors">Author</label>
         <input type="text" list="author-list" name="authors" id="authors" value={currentFilterCriteria.author} onChange={(event) => onAuthorChange(event.target.value)} />
         <datalist id="author-list">
            {allowedOptions.authorOptions.map((author) => (<option value={author} key={author}>{author}</option>))}
         </datalist>
      </div>

      <div className="filter-input">
         <label htmlFor="genres">Genre</label>
         <input type="text" list="genre-list" name="genres" id="genres" value={currentFilterCriteria.genre} onChange={(event) => onGenreChange(event.target.value)} />
         <datalist id="genre-list">
            {allowedOptions.genreOptions.map((genre) => (<option value={genre} key={genre}>{genre}</option>))}
         </datalist>
      </div>

      <div className="rating-input">
         <label htmlFor="ratings">Rating</label>
         <select name="ratings" id="ratings" value={currentFilterCriteria.rating} onChange={(event) => onRatingChange(Number(event.target.value))}>
            {allowedOptions.ratingOptions.map((rating) => (<option key={rating} value={rating}>{`${rating < 0 ? '-/-' : `${rating}/5`}`}</option>))}
         </select>
      </div>

      <div className="filter-input" id="clear-button-spacing-container"></div>

      <div className="filter-input">
         <button id="clear-filter-button" onClick={onResetForm}>Clear</button>
      </div>
   </div>)
}