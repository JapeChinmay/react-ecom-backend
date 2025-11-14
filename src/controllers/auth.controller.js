import { Prisma } from "@prisma/client";
import { loginUser, registerUser } from "../services/auth.services.js";
export const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({ message: "User logged in", token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await Prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        products: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "user not fount" });
    }
    res.status(200).json({
      message: "Your user profile ",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "failed to fetch profile" });
  }
};
