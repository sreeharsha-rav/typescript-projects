import express from 'express';
import { UserController } from '../controller/user.controller';

// A router to handle the user CRUD operations from RESTful API
const userRouter = express.Router();
const userController = new UserController();

// Define the routes for the user CRUD operations
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;