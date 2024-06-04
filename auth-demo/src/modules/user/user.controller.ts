// Desc: User controller for handling user requests and business logic

import { FastifyReply, FastifyRequest } from "fastify";
import prismaClient from "../../utils/prisma";
import bcrypt from "bcrypt";

// In memory store to store the refresh tokens
const validTokens = new Set<string>();

// Get all users
export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        // Check if token is valid
        if (!request.headers.authorization) {
            return reply.status(400).send({ message: "Unauthorized. Token not provided" });
        }
        const token = request.headers.authorization.replace("Bearer ", "");  // Extract the token from the header
        if (!validTokens.has(token)) {
            return reply.status(400).send({ message: "Unauthorized. Invalid token." });
        }

        await request.jwtVerify();  // Verify the JWT token

        const users = await prismaClient.user.findMany({
        select: {
            id: true,
            username: true,
            },
        });
        return reply.status(200).send(users);
    } catch (err) {
        return reply.status(401).send({ error: err, message: "Unauthorized" });
    }
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

    validTokens.add(token);  // Store the token in the in-memory store

    return reply.status(200).send({ token });
};

// Logout a user
export const logoutUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return reply.status(400).send({ message: "Logout failed! Token not provided" });
    }

    // Check if the token is valid
    if (!validTokens.has(token)) {
        return reply.status(400).send({ message: "Logout failed! Invalid token" });
    }

    // Remove the token from the in-memory store
    validTokens.delete(token);

    // Check if the token is removed
    if (validTokens.has(token)) {
        return reply.status(500).send({ message: "Failed to logout user!" });
    }

    
    return reply.status(200).send({ message: "User logged out successfully" });
};