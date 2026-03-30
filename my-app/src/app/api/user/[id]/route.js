import connectDB from "@/lib/db";
import User from "@/models/User";
import { successResponse, errorResponse } from "@/utils/response";
import { getUserFromRequest } from "@/lib/auth";
import { ROLES } from "@/config/constants";

// ================= UPDATE USER =================
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const loggedInUser = getUserFromRequest(req);

    if (!loggedInUser) {
      return errorResponse("Unauthorized", 401);
    }

    const { id } = await params;
    const updateData = await req.json();

    // whitelist fields (prevent role/password update)
    const { name, email, phone } = updateData;

    const safeData = {};
    if (name) safeData.name = name.trim();
    if (email) safeData.email = email.toLowerCase().trim();
    if (phone) safeData.phone = phone;

    let user;

    // Super Admin → update anyone
    if (loggedInUser.role === ROLES.SUPER_ADMIN) {
      user = await User.findByIdAndUpdate(id, safeData, {
        new: true,
        runValidators: true,
      });
    }

    // Admin → only their users
    else if (loggedInUser.role === ROLES.ADMIN) {
      user = await User.findOneAndUpdate(
        { _id: id, createdBy: loggedInUser.id },
        safeData,
        { new: true, runValidators: true },
      );
    } else {
      return errorResponse("Forbidden", 403);
    }

    if (!user) {
      return errorResponse("User not found", 404);
    }

    // remove password
    const userData = user.toObject();
    delete userData.password;

    return successResponse(userData, "User updated successfully");
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}

// ================= DELETE USER =================
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const loggedInUser = getUserFromRequest(req);

    if (!loggedInUser) {
      return errorResponse("Unauthorized", 401);
    }

    const { id } = await params;

    let user;

    if (loggedInUser.role === ROLES.SUPER_ADMIN) {
      user = await User.findByIdAndDelete(id);
    } else if (loggedInUser.role === ROLES.ADMIN) {
      user = await User.findOneAndDelete({
        _id: id,
        createdBy: loggedInUser.id,
      });
    } else {
      return errorResponse("Forbidden", 403);
    }

    if (!user) {
      return errorResponse("User not found", 404);
    }

    return successResponse(null, "User deleted successfully");
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
