const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

// let links = {
//   'link-0': {
//     id: 'link-0',
//     url: 'www.hotographql.com',
//     description: 'Full stack tutorial for GraphQL',
//   },
// }
//
// let idCount = links.length

// const resolvers = {
//   Query: {
//     info: () => 'This is the API of a Hackernews Clone',
//     links: (root, args, context, info) => {
//       return context.prisma.links()
//     },
//     link: (parent, args, context, info) => {
//       return links[args.id]
//     },
//   },
//   Mutation: {
//     createLink: (root, args, context) => {
//       return context.prisma.createLink({
//         url: args.url,
//         description: args.description,
//       })
//     },
//     updateLink: (parent, args) => {
//       const link = links[args.id]
//       if (link) {
//         Object.keys(args).forEach(key => {
//           link[key] = args[key]
//         })
//         return link
//       }
//       return null
//     },
//     deleteLink: (parent, args) => {
//       const link = links[args.id]
//       delete links[args.id]
//       return link
//     },
//   },
// }

const resolvers = {
  Query,
  Mutation,
  User,
  Link
}

const server = new GraphQLServer({
  typeDefs: './src/schema.prisma.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
