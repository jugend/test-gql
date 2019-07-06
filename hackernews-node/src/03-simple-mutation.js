/**
 * To test, visit: http://localhost:4000/
 *
 * Enter:
 *
 * Single quote is not allowed for string
 *
 * mutation {
 *  createLink(
 *    url: "www.test.info"
 *    description: "url description"
 *  ) {
 *    id
 *  }
 * }
 *
 * Response:
 *
 * {
 *   "data": {
 *     "post": {
 *       "id": "link-1"
 *     }
 *   }
 * }
 */
const { GraphQLServer } = require('graphql-yoga')

let links = {
  'link-0': {
    id: 'link-0',
    url: 'www.hotographql.com',
    description: 'Full stack tutorial for GraphQL',
  },
}

let idCount = Object.values(links).length

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    links: () => {
      return Object.values(links)
    },
    link: (parent, args, context, info) => {
      return links[args.id]
    },
  },
  Mutation: {
    createLink: (parent, args) => {
      const id = `link-${idCount++}`
      const link = {
        id,
        description: args.description,
        url: args.url,
      }
      links[id] = link
      return link
    },
    updateLink: (parent, args) => {
      const link = links[args.id]
      if (link) {
        Object.keys(args).forEach(key => {
          link[key] = args[key]
        })
        return link
      }
      return null
    },
    deleteLink: (parent, args) => {
      const link = links[args.id]
      delete links[args.id]
      return link
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.simple-mutation.graphql',
  resolvers,
})

server.start(() => console.log('Server is running on http://localhost:4000'))
