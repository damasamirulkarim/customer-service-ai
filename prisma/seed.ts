import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const name = 'Damas Amirul Karim';
  const password = 'rahasia';

  const user = await prisma.user.upsert({
    where: { email: 'damasamirulkarim@gmail.com' },
    update: {
      password: password,
      name: name,
    },
    create: {
      email: 'damasamirulkarim@gmail.com',
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
