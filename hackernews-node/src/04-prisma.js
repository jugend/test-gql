const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')

const resolvers = {
  Query,
  Mutation,
  User,
  Link
  /*
   * Note instruction from tutorial manual, doesn't seem to work any more.
   * not required to manually create custom resolver, more info:
   * https://www.prisma.io/docs/1.10/tutorials/build-graphql-servers/development/build-a-realtime-graphql-server-with-subscriptions-ien5es6ok3#2.-understanding-prisma’s-subscription-api
   */
  // Subscription
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

