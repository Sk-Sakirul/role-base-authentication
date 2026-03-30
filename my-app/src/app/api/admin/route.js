import connectDB from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/utils/hash";
import { successResponse, errorResponse } from "@/utils/response";
import { getUserFromRequest } from "@/lib/auth";
import { ROLES } from "@/config/constants";

// ================= CREATE ADMIN =================
export async function POST(req) {
  try {
    await connectDB();

    const loggedInUser = getUserFromRequest(req);

    if (!loggedInUser) {
      return errorResponse("Unauthorized", 401);
    }

    if (loggedInUser.role !== ROLES.SUPER_ADMIN) {
      return errorResponse("Forbidden: Only Super Admin can create Admin", 403);
    }

    const { name, email, phone, password } = await req.json();

    if (!name || !email || !phone || !password) {
      return errorResponse("All fields are required", 400);
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return errorResponse("User already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    const admin = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      role: ROLES.ADMIN,
      createdBy: loggedInUser.id,
    });

    // remove password
    const adminData = admin.toObject();
    delete adminData.password;

    return successResponse(adminData, "Admin created successfully", 201);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}

// ================= GET ADMINS =================
export async function GET(req) {
  try {
    await connectDB();

    const loggedInUser = getUserFromRequest(req);

    if (!loggedInUser) {
      return errorResponse("Unauthorized", 401);
    }

    if (loggedInUser.role !== ROLES.SUPER_ADMIN) {
      return errorResponse("Forbidden", 403);
    }

    const admins = await User.find({ role: ROLES.ADMIN }).select("-password");

    return successResponse(admins, "Admins fetched successfully");
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
