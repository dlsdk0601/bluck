import path from "path";
import * as fs from "fs";
import { Prisma, PrismaClient } from "@prisma/client";
import { Faker, ko } from "@faker-js/faker";
import moment from "moment/moment";
import mime from "mime-types";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { config } from "@/config/config";
import { getHash } from "../src/ex/bcryptEx";
// @ 를 안쓰는 이유는 ts-node 에서 해당 option 이 먹지 않는다.

const prisma = new PrismaClient();

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.awsAccessKey,
    secretAccessKey: config.awsSecretKey,
  },
  region: config.awsRegion,
});

// seed 도 bun 으로 돌리고 싶지만,
// Command was killed with SIGSEGV (Segmentation fault) 에러가 나기 때문에
// ts-node 로 밖에 되지 않는다.
async function main() {
  console.log("----------------Faker Insert Start----------------");

  const faker = new Faker({ locale: ko });

  const _insertAssts = await prisma.asset.createMany({
    data: await assets(),
  });

  const _insertUsers = await prisma.user.createMany({
    data: await users(faker),
  });

  console.log("----------------Faker Insert Success----------------");
}

async function users(faker: Faker) {
  const users: Prisma.userCreateManyInput[] = [];

  // test 계정
  users.push({
    email: "test@test.com",
    password: await getHash("1234"),
    name: "테스터",
    birthday: moment("1992-06-01").toDate(),
    phone: "01022223333",
    message: faker.lorem.sentences(),
    introduce: faker.lorem.paragraphs(),
    main_image_pk: 1,
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
      main_image_pk: 2,
    };

    users.push(user);
  }

  return users;
}

async function assets() {
  const assets: Prisma.assetCreateInput[] = [];

  const temp = path.join(__dirname, "..", "temp");
  const files = fs.readdirSync(temp, { withFileTypes: true });

  for (let i = 0; i < files.length; i++) {
    const entry = files[i];

    if (!entry.isFile()) {
      continue;
    }

    const filePath = path.join(temp, entry.name);
    const file = fs.readFileSync(filePath);
    const fileBase64 = file.toString("base64");
    const isUpload = await awsUpload(entry.name, fileBase64);

    if (!isUpload) {
      continue;
    }

    const contentType = mime.lookup(filePath);

    if (!contentType) {
      continue;
    }

    const asset = {
      content_type: contentType,
      name: entry.name,
      uuid: uuidv4().toString(),
      url: awsDownloadUrl(entry.name),
      download_url: awsDownloadUrl(entry.name),
    };

    assets.push(asset);
  }

  return assets;
}

async function awsUpload(name: string, base64: string): Promise<boolean> {
  const command = new PutObjectCommand({
    Bucket: config.awsBucketName,
    Key: name,
    Body: Buffer.from(base64, "base64"),
    ContentType: "application/octet-stream",
  });

  try {
    const res = await s3.send(command);
    return res.$metadata.httpStatusCode === 200;
  } catch {
    return false;
  }
}

function awsDownloadUrl(fileName: string) {
  return `https://${config.awsBucketName}.s3.${config.awsRegion}.amazonaws.com/${fileName}`;
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
