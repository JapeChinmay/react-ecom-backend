import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const prisma = new PrismaClient();

export const registerUser = async ({ email, password }) => {
  if (!email || !password) throw new Error("Email and password are required");

  console.log(email, password);
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  return { id: user.id, email: user.email };
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,

    { expiresIn: "1h" }
  );

  return token;
};

export const logoutService = async (token) => {
  return await prisma.BlacklistedToken.create({
    data: { token },
  });
};
