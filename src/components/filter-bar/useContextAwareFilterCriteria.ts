import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { FilterCriteria } from "../../types/types";

type Data = {
   allMarkdownRemark: {
      nodes: {
         frontmatter: {
            author: string
            genres: string[]
            rating: number
         }
      }[]
   }
}

type AllowedOptions = {
   authorOptions: string[]
   genreOptions: string[]
   ratingOptions: number[]
}

const RATING_OPTIONS = [-1, 1, 2, 3, 4, 5];

/**
 * Converts a string array to a set to remove duplicates and returns a copy of the set as an array.
 * 
 * @param values 
 * @returns An array only containing distinct values
 */
const distinctStringArray = (values: string[]) => ([...new Set<string>(values)]);


const extractDistinctAuthors = (data: Data, selectedGenre: string, selectedRating: number) => {
   const filteredAuthors = data?.allMarkdownRemark?.nodes?.filter(node => {
      // No filter applied
      if (!selectedGenre && selectedRating < 0) {
         return true;
      }

      // Genre is set and does not match
      if (!!selectedGenre && !node.frontmatter.genres.includes(selectedGenre)) {
         return false;
      }

      // Rating is set and does not match
      if (selectedRating >= 0 && node.frontmatter.rating < selectedRating) {
         return false;
      }

      return true;
   }).map(node => node.frontmatter.author);

   return distinctStringArray(filteredAuthors);
}

const extractDistinctGenres = (data: Data, selectedAuthor: string, selectedRating: number) => {
   const filteredGenres = data?.allMarkdownRemark?.nodes?.filter(node => {
      // No filter applied
      if (!selectedAuthor && selectedRating < 0) {
         return true;
      }

      // Author is set and does not match
      if (!!selectedAuthor && selectedAuthor !== node.frontmatter.author) {
         return false;
      }

      // Rating is set and does not match
      if (selectedRating >= 0 && node.frontmatter.rating < selectedRating) {
         return false;
      }

      return true;
   }).flatMap(node => node.frontmatter.genres);

   return distinctStringArray(filteredGenres);
}

const filterRatings = (data: Data, selectedAuthor: string, selectedGenre: string) => {

   const allowedRatings: number[] = [];

   data.allMarkdownRemark.nodes.forEach(node => {
      if (!!selectedAuthor || !!selectedGenre) {

         if (!!selectedAuthor && selectedAuthor === node.frontmatter.author || !!selectedGenre && node.frontmatter.genres.includes(selectedGenre)) {
            if (!allowedRatings.includes(node.frontmatter.rating)) {
               allowedRatings.push(node.frontmatter.rating);
            }
         }
      }
   });

   // Nothing selected to filter - allow all
   if (allowedRatings.length === 0) {
      return RATING_OPTIONS;
   }

   return RATING_OPTIONS.filter(option => allowedRatings.includes(option));
}

const useContextAwareFilterCriteria = (
   currentFilterCriteria: FilterCriteria
): AllowedOptions => {
   const data: Data = useStaticQuery(graphql`
      {
         allMarkdownRemark {
            nodes {
               frontmatter {
                  author
                  genres
                  rating
               }
            }
         }
      }`);


   const allowedOptions = React.useMemo<AllowedOptions>(() => {
      return {
         authorOptions: extractDistinctAuthors(data, currentFilterCriteria.genre, currentFilterCriteria.rating),
         genreOptions: extractDistinctGenres(data, currentFilterCriteria.author, currentFilterCriteria.rating),
         ratingOptions: filterRatings(data, currentFilterCriteria.author, currentFilterCriteria.genre)
      }
   }, [data, currentFilterCriteria])


   return allowedOptions;
}




export default useContextAwareFilterCriteria;