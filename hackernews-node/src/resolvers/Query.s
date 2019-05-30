function links(root, args, context, info) {
  return context.prisma.links()
}

module.exports = {
  links,
}
