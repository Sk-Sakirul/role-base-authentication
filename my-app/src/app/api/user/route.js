import connectDB from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/utils/hash";
import { successResponse, errorResponse } from "@/utils/response";
import { getUserFromRequest } from "@/lib/auth";
import { ROLES } from "@/config/constants";

export async function POST(req) {
  try {
    await connectDB();

    const loggedInUser = getUserFromRequest(req);

    if (!loggedInUser) {
      return errorResponse("Unauthorized", 401);
    }

    // Only admin or superadmin can create users
    if (![ROLES.ADMIN, ROLES.SUPER_ADMIN].includes(loggedInUser.role)) {
      return errorResponse("Forbidden", 403);
    }

    const { name, email, phone, password } = await req.json();

    if (!name || !email || !phone || !password) {
      return errorResponse("All fields are required", 400);
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return errorResponse("User already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone,
      password: hashedPassword,
      role: ROLES.USER,
      createdBy: loggedInUser.id,
    });

    const userData = user.toObject();
    delete userData.password;

    return successResponse(userData, "User created successfully", 201);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}

// Get Users
export async function GET(req) {
  try {
    await connectDB();

    const loggedInUser = getUserFromRequest(req);

    if (!loggedInUser) {
      return errorResponse("Unauthorized", 401);
    }

    let users;

    // Super Admin → all users
    if (loggedInUser.role === ROLES.SUPER_ADMIN) {
      users = await User.find({ role: ROLES.USER });
    }

    // Admin → only their users
    else if (loggedInUser.role === ROLES.ADMIN) {
      users = await User.find({
        role: ROLES.USER,
        createdBy: loggedInUser.id,
      });
    }

    // User → only themselves
    else {
      users = await User.find({ _id: loggedInUser.id });
    }

    return successResponse(users, "Users fetched successfully");
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}