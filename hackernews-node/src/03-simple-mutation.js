const { GraphQLServer } = require('graphql-yoga')

let links = [
  {
    id: 'link-0',
    url: 'www.hotographql.com',
    description: 'Full stack tutorial for GraphQL',
  },
]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
    link: id => {
      console.log('>> linnk ', id)
      links.find(link => link.id === id)
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
  },
}

const server = new GraphQLServer({
  typeDefs: './src/03-schema.graphql',
  resolvers,
})

server.start(() => console.log('Server is running on http://localhost:4000'))
