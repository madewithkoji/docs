# draft-docs

## Installation & Local Development

Clone this repo, install nvm, make sure you are using v12.14.1

`gatsby develop`

## Outstanding Issues

### `gatsby-react-router-scroll` (8/12/2020)

An issue with the `gatsby-react-router-scroll` package prevents anchor clicks from working correctly. There is more information available in [this thread](https://github.com/gatsbyjs/gatsby/issues/25778).

If the issue is resolved upstream, we should be able to update the `gatsby` package, remove the `gatsby-react-router-scroll` package from dev dependencies, and also pull the `preinstall` script, which will return the app to default behavior.

# Update!
