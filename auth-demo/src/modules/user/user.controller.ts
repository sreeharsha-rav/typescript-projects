// Desc: User controller for handling user requests and business logic

import { FastifyReply, FastifyRequest } from "fastify";
import prismaClient from "../../utils/prisma";
import bcrypt from "bcrypt";

// Get all users
export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await prismaClient.user.findMany({
        select: {
            id: true,
            username: true,
        },
    });
    return reply.status(200).send(users);
};

// Register/Create a new user
export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { username, password } = request.body as { username: string, password: string };  // Need to cast the request body to the correct type, FUTURE: Use a schema to validate the request body

    // Check if the username already exists
    const user = await prismaClient.user.findUnique({
        where: {
            username,
        },
    });
    if (user) {
        return reply.status(400).send({ message: "Username already exists" });
    }

    // Create the user
    try {
        const newUser = await prismaClient.user.create({
            data: {
                username,
                password: await bcrypt.hash(password, 10),
            },
        });
        return reply.status(201).send({ message: "User created successfully", user: newUser });
    } catch (error) {
        return reply.status(500).send({ error: error, message: "Failed to create user" });
    }

};

// Login a user
export const loginUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { username, password } = request.body as { username: string, password: string };  // Need to cast the request body to the correct type, FUTURE: Use a schema to validate the request body

    // Find the user
    const user = await prismaClient.user.findUnique({
        where: {
            username,
        },
    });
    if (!user) {
        return reply.status(400).send({ message: "Invalid username" });
    }

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return reply.status(400).send({ message: "Invalid password" });
    }

    // Generate a token
    const payload = { 
        id: user.id,
        username: user.username,
    };
    const token = request.server.jwt.sign(payload);

    return reply.status(200).send({ token });
};

// Logout a user
export const logoutUser = async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ message: "User logged out successfully" });
};