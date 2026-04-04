import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Database...");

  const defaultPassword = bcrypt.hashSync("promotor", 10);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  await prisma.user.upsert({
    where: { email: "admin@cody.com" },
    update: {},
    create: {
      email: "admin@cody.com",
      name: "Admin User",
      password: bcrypt.hashSync("admin", 10),
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: "super@cody.com" },
    update: {},
    create: {
      email: "super@cody.com",
      name: "Supervisor User",
      password: bcrypt.hashSync("super", 10),
      role: Role.SUPERVISOR,
    },
  });

  const promotors = await Promise.all([
    prisma.user.upsert({
      where: { email: "promotor1@cody.com" },
      update: {},
      create: {
        email: "promotor1@cody.com",
        name: "John Promotor",
        password: defaultPassword,
        role: Role.PROMOTOR,
      },
    }),
    prisma.user.upsert({
      where: { email: "promotor2@cody.com" },
      update: {},
      create: {
        email: "promotor2@cody.com",
        name: "Ana Ruiz",
        password: defaultPassword,
        role: Role.PROMOTOR,
      },
    }),
    prisma.user.upsert({
      where: { email: "promotor3@cody.com" },
      update: {},
      create: {
        email: "promotor3@cody.com",
        name: "Carlos Vega",
        password: defaultPassword,
        role: Role.PROMOTOR,
      },
    }),
    prisma.user.upsert({
      where: { email: "promotor4@cody.com" },
      update: {},
      create: {
        email: "promotor4@cody.com",
        name: "Luisa Moreno",
        password: defaultPassword,
        role: Role.PROMOTOR,
      },
    }),
  ]);

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { id: 1 },
      update: {
        name: "Electronics",
        description: "Devices and gadgets",
      },
      create: {
        name: "Electronics",
        description: "Devices and gadgets",
      },
    }),
    prisma.category.upsert({
      where: { id: 2 },
      update: {
        name: "Home Appliances",
        description: "Useful products for home and kitchen",
      },
      create: {
        name: "Home Appliances",
        description: "Useful products for home and kitchen",
      },
    }),
    prisma.category.upsert({
      where: { id: 3 },
      update: {
        name: "Computing",
        description: "Accessories and devices for workstations",
      },
      create: {
        name: "Computing",
        description: "Accessories and devices for workstations",
      },
    }),
  ]);

  const categoryByName = Object.fromEntries(categories.map((category) => [category.name, category.id]));

  const products = [
    { name: "Smartphone Pro", price: 999.99, categoryName: "Electronics" },
    { name: "Wireless Earbuds", price: 149.5, categoryName: "Electronics" },
    { name: "Smart TV 55", price: 799.0, categoryName: "Electronics" },
    { name: "Air Fryer Max", price: 189.99, categoryName: "Home Appliances" },
    { name: "Robot Vacuum", price: 349.0, categoryName: "Home Appliances" },
    { name: "Coffee Maker Plus", price: 119.9, categoryName: "Home Appliances" },
    { name: "Mechanical Keyboard", price: 129.99, categoryName: "Computing" },
    { name: "UltraWide Monitor", price: 459.5, categoryName: "Computing" },
    { name: "USB-C Dock Station", price: 89.9, categoryName: "Computing" },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: products.indexOf(product) + 1 },
      update: {
        name: product.name,
        price: product.price,
        categoryId: categoryByName[product.categoryName],
      },
      create: {
        name: product.name,
        price: product.price,
        categoryId: categoryByName[product.categoryName],
      },
    });
  }

  for (const promotor of promotors) {
    const existingGoal = await prisma.goal.findFirst({
      where: {
        promotorId: promotor.id,
        month: currentMonth,
        year: currentYear,
      },
    });

    if (!existingGoal) {
      await prisma.goal.create({
        data: {
          target: 5000 + promotor.id * 250,
          month: currentMonth,
          year: currentYear,
          promotorId: promotor.id,
        },
      });
    }
  }

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
