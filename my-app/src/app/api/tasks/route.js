import connectDB from "@/lib/db";
import Task from "@/models/Task";
import { successResponse, errorResponse } from "@/utils/response";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();

    const user = getUserFromRequest(req);
    if (!user) return errorResponse("Unauthorized", 401);

    const { title } = await req.json();

    if (!title) {
      return errorResponse("Title is required", 400);
    }

    const task = await Task.create({
      title,
      userId: user.id,
    });

    return successResponse(task, "Task created", 201);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}

// Get all tasks of logged-in user
export async function GET(req) {
  try {
    await connectDB();

    const user = getUserFromRequest(req);
    if (!user) return errorResponse("Unauthorized", 401);

    const tasks = await Task.find({ userId: user.id });

    return successResponse(tasks, "Tasks fetched");
  } catch (error) {
    return errorResponse(error.message, 500);
  }
}
