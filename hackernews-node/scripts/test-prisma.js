const { prisma } = require('../src/generated/prisma-client')

async function main() {
  // Create link
  const newLink = await prisma.createLink({
    url: 'prisma.com',
    description: 'Prisma replaces ORM'
  })
  console.log('>> Created new link', newLink)

  // All Links
  const allLinks = await prisma.links()
  console.log('>> All links', allLinks)
}

main.catch(e => console.error(e))

