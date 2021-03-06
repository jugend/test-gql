/**
 * To test, visit: http://localhost:4000/
 *
 * Enter:
 *
 * query {
 *  info,
 *  feed {
 *    id,
 *    description,
 *    url
 *  }
 * }
 */
const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`
let links = [
  {
    id: 'link-0',
    url: 'www.hotographql.com',
    description: 'Full stack tutorial for GraphQL',
  },
]

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
  },
  // Can be eremoved, just to show you how it works
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url,
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log('Server is running on http://localhost:4000'))
