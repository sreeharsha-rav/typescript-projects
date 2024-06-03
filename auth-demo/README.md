# Authentication Demo

This is a simple demo of a JWT authentication service using Fastify, Prisma, Postgres and TypeScript. It provides endpoints to register, login, and logout users. The API uses JWT for authentication and authorization. It uses bcrypt to hash passwords, and fastify-jwt to generate and verify JWT tokens.

## Technologies

- Fastify: A web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture.
- Prisma ORM: A modern database toolkit that simplifies database access for Node.js and TypeScript applications.
- Postgres: An open-source relational database management system that uses and extends the SQL language.
- TypeScript: A superset of JavaScript that adds static types to the language.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL (running on localhost:5432)
- Postman
- pnpm

### Installation

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Configure the database:
    - Create a `.env` file in the root directory
    - Add the following environment variables:
        ```
        DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database>"
        ```
4. Set up the database:
    - Generate the Prisma client: `pnpm prisma generate`
    - Run the migrations: `pnpm prisma migrate dev --name init`
    - Seed the database: `pnpm seed`

### Running the Server

1. Run the server: `pnpm dev`
2. Open Postman and import the collection from the `postman` directory
3. Test the API endpoints using the Postman collection at `http://localhost:3000`

## API Endpoints

## Database Schema

### User
| Column    | Type   |
|-----------|--------|
| id        | number |
| username  | string |
| password  | string |

### Session

| Column    | Type   |
|-----------|--------|
| id        | number |
| userId    | number |
| token     | string |
| expiresAt | date   |

## Credits

This project took elements from the following resources:
- [jwt-auth-fastify](https://github.com/arifimran5/jwt-auth-fastify/tree/master)
