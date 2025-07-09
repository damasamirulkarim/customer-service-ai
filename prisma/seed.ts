import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const name = 'Damas Amirul Karim';
  const password = 'rahasia';
  const email = 'damasamirulkarim@gmail.com';

  // Create new user or find existing
  const user = await prisma.user.upsert({
    where: {
      email: email,
    },
    update: {},
    create: {
      email: email,
      password: password,
      name: name,
    },
  });
  console.log({ user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
