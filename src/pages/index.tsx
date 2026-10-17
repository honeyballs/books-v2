import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql, Link } from "gatsby"
import ReviewItem from "../components/review-item/ReviewItem"
import FilterBar from "../components/filter-bar/FilterBar"
import type { Review, FilterCriteria } from "../types/types"

type DataNode = {
  frontmatter: {
    title: string
    author: string
    date: string
    genres: string[]
    rating: number
  }
  html: string
}

type DataProp = {
  allMarkdownRemark: {
    nodes: DataNode[]
  }
}

const createInitialReviewItems = (nodes: DataNode[] = []): Review[] => {
  return nodes.map(dataNode => ({
    title: dataNode.frontmatter.title,
    author: dataNode.frontmatter.author,
    date: new Date(dataNode.frontmatter.date),
    genres: dataNode.frontmatter.genres,
    rating: dataNode.frontmatter.rating,
    content: dataNode.html
  }))
    .sort((review1, review2) => (review1.date - review2.date) * -1);
}

const filterReviews = (reviews: Review[], filterCriteria: FilterCriteria): Review[] => {
  return reviews.filter(review => {
    if (filterCriteria.author) {
      if (filterCriteria.author !== review.author) {
        return false;
      }
    }

    if (filterCriteria.rating > -1) {
      if (review.rating < filterCriteria.rating) {
        return false;
      }
    }

    if (filterCriteria.genre) {
      if (!review.genres.includes(filterCriteria.genre)) {
        return false;
      }
    }

    return true;
  });
}


const IndexPage: React.FC<PageProps<DataProp>> = ({ data }) => {
  const [reviews, setReviews] = React.useState<Review[]>(createInitialReviewItems(data?.allMarkdownRemark?.nodes));
  const [filterCriteria, setFilterCriteria] = React.useState<FilterCriteria>({
    author: "",
    genre: "",
    rating: -1
  })

  const filteredReviews = React.useMemo(() => filterReviews(reviews, filterCriteria), [reviews, filterCriteria]);

  return (
    <main>
      <div className="main-content">
        <div id="headline-box">
          <h1>The Books</h1>
        </div>
        <FilterBar
          currentFilterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
        />
        <div className="book-list">
          {filteredReviews.map(review => (<ReviewItem
            key={`${review.title}-${review.author}`}
            review={review}
          />))}
        </div>
      </div>
      <footer>
        <Link to="/imprint">Imprint</Link>
      </footer>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Books | bals.io</title>

export const pageQuery = graphql`
query {
  allMarkdownRemark {
		nodes {
       frontmatter {
        title
        date
        author
        slug
        genres
        rating
      }
      html
      excerpt  
    }
  }
}
`