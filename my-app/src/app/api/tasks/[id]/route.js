import connectDB from "@/lib/db";
import Task from "@/models/Task";
import { successResponse, errorResponse } from "@/utils/response";
import { getUserFromRequest } from "@/lib/auth";

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const user = getUserFromRequest(req);
    if (!user) return errorResponse("Unauthorized", 401);

    const { id } = await params;
    const data = await req.json();

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: user.id },
      data,
      { returnDocument: "after" },
    );

    if (!task) return errorResponse("Task not found", 404);

    return successResponse(task, "Task updated");
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const user = getUserFromRequest(req);
    if (!user) return errorResponse("Unauthorized", 401);

    const { id } = await params;

    const task = await Task.findOneAndDelete({
      _id: id,
      userId: user.id,
    });

    if (!task) return errorResponse("Task not found", 404);

    return successResponse(null, "Task deleted");
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
