import { Hono } from "hono";
import type { Context } from "hono";
import { TaskModel } from "@/db/models";
import { AppError } from "@/utils/errors";
import { schemas } from "@/utils/validation";

const app = new Hono();

// Create a new task
app.post("/", async (c: Context) => {
  const body = await c.req.json();
  const { title, description, type } = schemas.createTask.parse(body);

  // Create new task
  const newTask = await TaskModel.create({
    title,
    description,
    type,
    user: c.get("user").id,
  });

  return c.json(
    {
      success: true,
      message: "Task created successfully",
      data: newTask,
    },
    201
  );
});

// Get all tasks
app.get("/", async (c: Context) => {
  const tasks = await TaskModel.find({ user: c.get("user").id });

  return c.json({ success: true, data: tasks }, 200);
});

// Get a task by ID
app.get("/:id", async (c: Context) => {
  const taskId = c.req.param("id");
  const task = await TaskModel.findOne({
    _id: taskId,
    user: c.get("user").id,
  });

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  return c.json({ success: true, data: task }, 200);
});

// Update a task by ID
app.put("/:id", async (c: Context) => {
  const taskId = c.req.param("id");
  const body = await c.req.json();
  const { title, description, type } = schemas.updateTask.parse(body);

  // Update task
  const updatedTask = await TaskModel.findOneAndUpdate(
    {
      _id: taskId,
      user: c.get("user").id,
    },
    {
      title,
      description,
      type,
    },
    { new: true }
  );

  // Check if task exists
  if (!updatedTask) {
    throw new AppError(404, "Task not found");
  }

  return c.json(
    {
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    },
    200
  );
});

// Update task status by ID
app.patch("/:id", async (c: Context) => {
  const taskId = c.req.param("id");
  const body = await c.req.json();
  const { type } = schemas.updateTaskStatus.parse(body);

  // Update task status
  const updatedTask = await TaskModel.findOneAndUpdate(
    {
      _id: taskId,
      user: c.get("user").id,
    },
    {
      type,
    },
    { new: true }
  );

  // Check if task exists
  if (!updatedTask) {
    throw new AppError(404, "Task not found");
  }

  return c.json(
    {
      success: true,
      message: "Task status updated successfully",
      data: updatedTask,
    },
    200
  );
});

// Delete a task by ID
app.delete("/:id", async (c: Context) => {
  const taskId = c.req.param("id");

  // Delete task
  const deletedTask = await TaskModel.findOneAndDelete({
    _id: taskId,
    user: c.get("user").id,
  });

  // Check if task exists
  if (!deletedTask) {
    throw new AppError(404, "Task not found");
  }

  return c.json({
    success: true,
    message: "Task deleted successfully",
  });
});

export default app;
