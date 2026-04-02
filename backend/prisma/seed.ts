import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Database...");

  // 1. Create Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@cody.com" },
    update: {},
    create: {
      email: "admin@cody.com",
      name: "Admin User",
      password: bcrypt.hashSync("admin", 10),
      role: Role.ADMIN,
    },
  });

  // 2. Create Supervisor
  const supervisor = await prisma.user.upsert({
    where: { email: "super@cody.com" },
    update: {},
    create: {
      email: "super@cody.com",
      name: "Supervisor User",
      password: bcrypt.hashSync("super", 10),
      role: Role.SUPERVISOR,
    },
  });

  // 3. Create Promotor
  const promotor = await prisma.user.upsert({
    where: { email: "promotor1@cody.com" },
    update: {},
    create: {
      email: "promotor1@cody.com",
      name: "John Promotor",
      password: bcrypt.hashSync("promotor", 10),
      role: Role.PROMOTOR,
    },
  });

  // 4. Create Category
  const category1 = await prisma.category.create({
    data: {
      name: "Electronics",
      description: "Devices and gadgets",
    },
  });

  // 5. Create Products
  await prisma.product.createMany({
    data: [
      { name: "Smartphone Pro", price: 999.99, categoryId: category1.id },
      { name: "Wireless Earbuds", price: 149.5, categoryId: category1.id },
    ],
  });

  // 6. Create Goal
  await prisma.goal.create({
    data: {
      target: 5000,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      promotorId: promotor.id,
    },
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
