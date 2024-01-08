import { Prisma, PrismaClient } from "@prisma/client";
import { Faker, ko } from "@faker-js/faker";
import moment from "moment/moment";
import { getHash } from "../src/ex/bcryptEx";
// @ 를 안쓰는 이유는 ts-node 에서 해당 option 이 먹지 않는다.

const prisma = new PrismaClient();

// seed 도 bun 으로 돌리고 싶지만,
// Command was killed with SIGSEGV (Segmentation fault) 에러가 나기 때문에
// ts-node 로 밖에 되지 않는다.
async function main() {
  console.log("----------------Faker Insert Start----------------");

  const faker = new Faker({ locale: ko });

  const _insertUsers = await prisma.user.createMany({
    data: await users(faker),
  });

  console.log("----------------Faker Insert Success----------------");
}

async function users(faker: Faker) {
  const users: Prisma.userCreateInput[] = [];

  // test 계정
  users.push({
    email: "test@test.com",
    password: await getHash("1234"),
    name: "테스터",
    birthday: moment("1992-06-01").toDate(),
    phone: "01022223333",
    message: faker.lorem.sentences(),
    introduce: faker.lorem.paragraphs(),
  });

  for (let i = 0; i < 20; i++) {
    // eslint-disable-next-line no-await-in-loop
    const password = await getHash(faker.internet.password());
    const user = {
      email: faker.internet.email(),
      password,
      name: faker.internet.userName(),
      birthday: faker.date.birthdate(),
      phone: faker.phone.number(),
      message: faker.lorem.sentences(),
      introduce: faker.lorem.paragraphs(),
    };

    users.push(user);
  }

  return users;
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
