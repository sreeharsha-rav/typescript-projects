import type { Context } from "hono";
import { TaskModel } from "@/db/models";

// Function to create a new task
export const createTask = async (c: Context) => {
  const { title, description, type } = await c.req.json();

  // Create new task
  const newTask = await TaskModel.create({
    title,
    description,
    type,
    user: c.get("user").id,
  });

  return c.json({ message: "Task created successfully", newTask }, 201);
};

// Function to get all tasks
export const getTasks = async (c: Context) => {
  const tasks = await TaskModel.find({ user: c.get("user").id });

  return c.json(tasks, 200);
};

// Function to get a task by ID
export const getTask = async (c: Context) => {
  const taskId = c.req.param("id");
  const task = await TaskModel.findOne({
    _id: taskId,
    user: c.get("user").id,
  });

  if (!task) {
    return c.json({ error: "Task not found" }, 404);
  }

  return c.json(task, 200);
};

// Function to update a task by ID
export const updateTask = async (c: Context) => {
  const taskId = c.req.param("id");
  const { title, description, type } = await c.req.json();

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
    return c.json({ error: "Task not found" }, 404);
  }

  return c.json({ message: "Task updated successfully", updatedTask }, 200);
};

// Function to update a task status by ID
export const updateTaskStatus = async (c: Context) => {
  const taskId = c.req.param("id");
  const { type } = await c.req.json();

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
    return c.json({ error: "Task not found" }, 404);
  }

  return c.json(
    { message: "Task status updated successfully", updatedTask },
    200
  );
};

// Function to delete a task by ID
export const deleteTask = async (c: Context) => {
  const taskId = c.req.param("id");

  // Delete task
  const deletedTask = await TaskModel.findOneAndDelete({
    _id: taskId,
    user: c.get("user").id,
  });

  // Check if task exists
  if (!deletedTask) {
    return c.json({ error: "Task not found" }, 404);
  }

  return c.json({ message: "Task deleted successfully" }, 200);
};
