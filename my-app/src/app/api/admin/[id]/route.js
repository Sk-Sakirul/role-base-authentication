import connectDB from "@/lib/db";
import User from "@/models/User";
import { successResponse, errorResponse } from "@/utils/response";
import { getUserFromRequest } from "@/lib/auth";
import { ROLES } from "@/config/constants";

// ================= UPDATE ADMIN =================
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const loggedInUser = getUserFromRequest(req);

    // check auth
    if (!loggedInUser) {
      return errorResponse("Unauthorized", 401);
    }

    // only super admin
    if (loggedInUser.role !== ROLES.SUPER_ADMIN) {
      return errorResponse("Forbidden", 403);
    }

    const { id } = await params;
    const body = await req.json();

    // whitelist fields
    const { name, email, phone } = body;

    const safeData = {};
    if (name) safeData.name = name.trim();
    if (email) safeData.email = email.toLowerCase().trim();
    if (phone) safeData.phone = phone;

    // only update admin role users
    const admin = await User.findOneAndUpdate(
      { _id: id, role: ROLES.ADMIN },
      safeData,
      { new: true, runValidators: true },
    );

    if (!admin) return errorResponse("Admin not found", 404);

    // remove password
    const adminData = admin.toObject();
    delete adminData.password;

    return successResponse(adminData, "Admin updated successfully");
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}

// ================= DELETE ADMIN =================
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const loggedInUser = getUserFromRequest(req);

    // check auth
    if (!loggedInUser) {
      return errorResponse("Unauthorized", 401);
    }

    // only super admin
    if (loggedInUser.role !== ROLES.SUPER_ADMIN) {
      return errorResponse("Forbidden", 403);
    }

    const { id } = await params;

    // only delete admins
    const admin = await User.findOneAndDelete({
      _id: id,
      role: ROLES.ADMIN,
    });

    if (!admin) return errorResponse("Admin not found", 404);

    return successResponse(null, "Admin deleted successfully");
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
