import { Hono } from "hono";
import { login, register } from "@/routes/user/handlers";

const authRoutes = new Hono();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

export default authRoutes;
