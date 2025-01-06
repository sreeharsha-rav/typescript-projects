import { Hono } from "hono";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "@/routes/tasks/handlers";
import { authenticate } from "@/middleware/auth";

const taskRoutes = new Hono();

taskRoutes.use("*", authenticate);

taskRoutes.post("/", createTask);
taskRoutes.get("/", getTasks);
taskRoutes.get("/:id", getTask);
taskRoutes.put("/:id", updateTask);
taskRoutes.patch("/:id", updateTaskStatus);
taskRoutes.delete("/:id", deleteTask);

export default taskRoutes;
