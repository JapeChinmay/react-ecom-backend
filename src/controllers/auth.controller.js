import { Prisma } from "@prisma/client";
import {
  loginUser,
  registerUser,
  logoutService,
} from "../services/auth.services.js";
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

export const logoutController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(req.headers);
    if (!authHeader) return res.status(400).json({ error: "Token missing" });

    const token = authHeader.split(" ")[1];

    await logoutService(token);

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("LOGOUT ERROR =", err);
    return res.status(500).json({ error: "Logout failed" });
  }
};
