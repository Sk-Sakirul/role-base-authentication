import connectDB from "@/lib/db";
import User from "@/models/User";
import { comparePassword } from "@/utils/hash";
import { generateToken } from "@/lib/auth";
import { successResponse, errorResponse } from "@/utils/response";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return errorResponse("Email and password are required", 400);
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return errorResponse("Invalid credentials", 401);
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return errorResponse("Invalid credentials", 401);
    }

    // generate token
    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    return successResponse(
      {
        token,
        role: user.role,
        userId: user._id,
      },
      "Login successful",
    );
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
