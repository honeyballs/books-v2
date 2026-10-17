# Books

A personal book review website built with Gatsby and TypeScript. Reviews are written in Markdown and rendered into a filterable list.

## Features

- Book reviews sourced from Markdown files in `src/content/`
- Filter reviews by author, genre, and minimum rating
- Context-aware filter options (only shows valid combinations)
- Rating display component
- Imprint page

## Tech stack

- [Gatsby](https://www.gatsbyjs.com/) (v5)
- TypeScript
- SCSS
- `gatsby-transformer-remark` for Markdown processing

## Getting started

```shell
npm install
npm run develop
```

The site runs at `http://localhost:8000`.

## Adding a review

Create a Markdown file under `src/content/<author-name>/`:

```markdown
---
slug: "/my-book"
date: "2026-01-01"
title: "Book Title"
author: Author Name
genres: ["Genre"]
rating: 4
---

Your review text here.
```

## Scripts

| Command | Description |
|---|---|
| `npm run develop` | Start dev server |
| `npm run build` | Production build |
| `npm run serve` | Serve production build locally |
| `npm run clean` | Clear Gatsby cache |
| `npm run typecheck` | Run TypeScript type checking |
