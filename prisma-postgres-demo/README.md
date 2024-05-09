# Prisma Postgres Demo

## Description

This is a simple CRUD API that allows users to create, read, update and delete user data. The user data consists of a user's name and email. The API is built using Node.js, Express.js, Prisma ORM and Postgres.

## Technologies

- Node.js
- Express.js
- Prisma
- Postgres
- TypeScript

## Data Model

- User
  - id: number
  - name: string
  - email: string

## API Endpoints

- `GET /users/` - Get all users
- `GET /users/:id` - Get a user by id
- `POST /users/` - Create a new user
    - Sample request Body: 
        ```json
        {
            "name": "John Doe",
            "email": "john.doe@example.com"
        }
        ```
- `PUT /users/:id` - Update a user by id
    - Sample request Body: 
        ```json
        /users/1
        {
            "name": "Jerry Smith",
            "email": "jerry.smith@example.com"
        }
        ```
- `DELETE /users/:id` - Delete a user by id

## How to use

### Prerequisites

- Node.js
- TypeScript
- Postgres (with a database created)
- Postman
- pnpm (optional but recommended)

### Installation

1. Clone the repository
2. Install the dependencies
    ```bash
    pnpm install
    ```
3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database>"
    ```
4. Ensure that Prisma is properly configured by running the following commands:
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```
5. Populate the database with sample data by running the following command:
    ```bash
    npx ts-node src/db/seed.ts
    ```
6. Make sure the database is running postgres. If not, start the database server.
7. Run the application
    ```bash
    pnpm start
    ```
8. Use Postman to test the API endpoints [prisma-demo](./prisma-demo.postman_collection.json).

## Credits

This project is inspired by the [Prisma Getting Started Guide](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql).