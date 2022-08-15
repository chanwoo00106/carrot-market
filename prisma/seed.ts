import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    await client.stream.create({
      data: {
        name: item + "",
        description: item + "",
        price: item,
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });
    console.log(`${item}/500`);
  });
}

main()
  .catch(console.log)
  .finally(() => client.$disconnect());
