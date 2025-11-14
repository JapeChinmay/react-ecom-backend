import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductByID = async (id) => {
  return await prisma.product.findUnique({ where: { id: Number(id) } });
};

export const createProduct = async ({
  name,
  description,
  price,
  stock,
  userId,
}) => {
  if (!userId) {
    throw new Error("user id is required for product creation");
  }
  return await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      user: {
        connect: { id: Number(userId) },
      },
    },
  });
};
