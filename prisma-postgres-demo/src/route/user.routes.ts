import express from 'express';

const userService = require('../service/user.service');
const userRouter = express.Router();

// Create a new user
userRouter.post('/', (req, res) => {
    const { name, email } = req.body;
    userService.createUser(name, email)
        .then((user: any) => res.json(user))
        .catch((error: any) => res.json(error));
});

// Get all users
userRouter.get('/', (req, res) => {
    userService.getUsers()
        .then((users: any) => res.json(users))
        .catch((error: any) => res.json(error));
});

// Get a user by id
userRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    userService.getUserById(id)
        .then((user: any) => res.json(user))
        .catch((error: any) => res.json(error));
});

// Update a user by id
userRouter.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name, email } = req.body;
    userService.updateUser(id, name, email)
        .then((user: any) => res.json(user))
        .catch((error: any) => res.json(error));
});

// Delete a user by id
userRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    userService.deleteUser(id)
        .then((user: any) => res.json(user))
        .catch((error: any) => res.json(error));
});

export default userRouter;