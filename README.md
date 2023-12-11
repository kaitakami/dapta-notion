# Dapta Notion integration showcase

Simple Next.js application that integrates with Dapta API to fetch data from Notion database.

Use your notion database as your cms.

## Biggest blocker

I couldn't find a way of retrieving the page content information.

Notion uses blocks, if you want to retrieve the content of a page you have to retrieve the content of each block inside that page. However, Notion doesn't provide a way to fetch all blocks inside a page.

### Possible solution

- Use scraping.
- Use another attribute (e.g content) => current solution in this repo

## Why are you fetching the Notion API directly instead of using Dapta?

I couldn't find in the documentation the way to use the query param in the url from the input in the next action.
