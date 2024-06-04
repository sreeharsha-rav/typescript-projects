import { FastifyInstance } from "fastify";
import { getUsers, registerUser, loginUser, logoutUser} from "./user.controller";

// User routes
export const userRoute = async (app: FastifyInstance) => {
    app.get("/", getUsers);
    app.post("/register", registerUser);
    app.post("/login", loginUser);
    app.get("/logout", logoutUser);
}