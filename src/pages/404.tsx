import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main>
      <div className="main-content">
        <h1 id="404-h1">Whoops</h1>
        <p>
          Wrong turn. <Link to="/">Go home</Link>.
        </p>
      </div>
    </main>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found | bals.io</title>
