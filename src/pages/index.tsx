import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql, Link } from "gatsby"
import ReviewItem from "../components/review-item/ReviewItem"

type DataProp = {
  allMarkdownRemark: {
    nodes: {
      frontmatter: {
        title: string
        author: string
        date: Date
        genres: string[]
        rating: number
      }
      html: string
    }[]
  }
}

const IndexPage: React.FC<PageProps<DataProp>> = ({ data }) => {

  const reviewNodesWithDateObject = React.useMemo(() => data?.allMarkdownRemark?.nodes.map(node => ({
    ...node, 
    frontmatter: {
      ...node.frontmatter, 
      date: new Date(node.frontmatter.date)
    }})) || [], [data]);

  const filteredAndSortedNodes = reviewNodesWithDateObject
  .sort((node1, node2) => (node1.frontmatter.date - node2.frontmatter.date) * -1); 

  return (
    <main>
      <div className="main-content">
        <div id="headline-box">
          <h1>The Books</h1>
        </div>
        <div className="book-list">
          {filteredAndSortedNodes.map(node => (<ReviewItem
            key={`${node.frontmatter.title}-${node.frontmatter.author}`}
            review={{
              title: node.frontmatter.title,
              author: node.frontmatter.author,
              date: node.frontmatter.date,
              genres: node.frontmatter.genres,
              rating: node.frontmatter.rating,
              content: node.html
            }}
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