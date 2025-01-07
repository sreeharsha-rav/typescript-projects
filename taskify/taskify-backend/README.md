# Taskify Backend

This is the backend for the Taskify app. It is built using Hono, a web framework for TypeScript.

## Features

- Zod for request validation
- JWT for authentication using `hono/jwt`
- MongoDB for data storage using Mongoose
- Bcrypt for password hashing

## Data Model

- User

  - id: string
  - name: string
  - email: string
  - password: string

- Task
  - id: string
  - title: string
  - description: string
  - type: string (enum: 'TODO', 'IN_PROGRESS', 'DONE')
  - userId: string

## API Endpoints

### Public Routes

- GET /health
  - Health check endpoint

### User Routes

- POST /api/auth/register

  - Register a new user
  - Request Body:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```

- POST /api/auth/login
  - Login a user
  - Request Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

### Task Routes

- GET /api/tasks

  - Get all tasks
  - Request Headers:
    - Authorization: Bearer <token>

- GET /api/tasks/:id

  - Get a task by id
  - Request Headers:
    - Authorization: Bearer <token>

- POST /api/tasks

  - Create a new task
  - Request Headers:
    - Authorization: Bearer <token>
  - Request Body:
    ```json
    {
      "title": "string",
      "description": "string",
      "type": "string"
    }
    ```

- PUT /api/tasks/:id

  - Update a task
  - Request Headers:
    - Authorization: Bearer <token>
  - Request Body:
    ```json
    {
      "title": "string",
      "description": "string",
      "type": "string"
    }
    ```

- PATCH /api/tasks/:id

  - Update a task type
  - Request Headers:
    - Authorization: Bearer <token>
  - Request Body:
    ```json
    {
      "type": "string"
    }
    ```

- DELETE /api/tasks/:id
  - Delete a task
  - Request Headers:
    - Authorization: Bearer <token>

## Pre-requisites

- Node.js
- MongoDB
- pnpm

## Setup

1. Clone the repository
2. Install dependencies
   ```bash
   pnpm install
   ```
3. Create a `.env` file in the root directory, use the `.env.example` file as a template
4. Start the development server
   ```bash
   pnpm dev
   ```
5. The server will be running on `http://localhost:5000`
