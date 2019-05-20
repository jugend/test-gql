const { GraphQLServer } = require('graphql-yoga')

let links = {
  'link-0': {
    id: 'link-0',
    url: 'www.hotographql.com',
    description: 'Full stack tutorial for GraphQL',
  },
}

let idCount = links.length

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => {
      return Object.values(links)
    },
    link: (parent, args, context, info) => {
      return links[args.id]
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
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
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log('Server is running on http://localhost:4000'))
