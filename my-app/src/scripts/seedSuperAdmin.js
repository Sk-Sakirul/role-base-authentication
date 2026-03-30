import connectDB from "../lib/db.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/hash.js";
import { ROLES } from "../config/constants.js";
import dotenv from "dotenv";
dotenv.config();

const seed = async () => {
  await connectDB();

  const existing = await User.findOne({ email: "superadmins@test.com" });

  if (existing) {
    console.log("Super Admin already exists");
    process.exit();
  }

  const hashedPassword = await hashPassword("123456");

  await User.create({
    name: "Super Admin",
    email: "superadmin@test.com",
    phone: "9999999925",
    password: hashedPassword,
    role: ROLES.SUPER_ADMIN,
  });

  console.log("Super Admin created");
  process.exit();
};

seed();
