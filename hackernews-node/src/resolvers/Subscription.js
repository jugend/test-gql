/*
 * NOTE Instruction from tutorial manual, doesn't seem to work any more.
 * Not required to manually create custom resolver, more info:
 * https://www.prisma.io/docs/1.10/tutorials/build-graphql-servers/development/build-a-realtime-graphql-server-with-subscriptions-ien5es6ok3#2.-understanding-prisma’s-subscription-api
 */
function newLinkSubscribe(parent, args, context, info) {
  console.log('>> new link subscribe', context.prisma.$subscribe);

  return context.prisma.$subscribe
    .link({ where: { mutation_in: ['CREATED'] } })
    .node()
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => {
    console.log('>> SUBSCRIBE_RESOLVE', payload)
    return payload
  },
}

module.exports = {
  newLink,
}
