# User CRUD API

## Description

This is a simple CRUD API that allows users to create, read, update and delete user data. The user data consists of a user's name, email and password. The API is built using Node.js, Express.js, node-postgres and TypeScript.

## Technologies

- Node.js
- Express.js
- TypeScript
- Postgres

## Data Model

- Users
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
- Postgres
- Postman
- pnpm (optional but recommended)

### Installation

1. Clone the repository
2. Install the dependencies
    ```bash
    pnpm install
    ```
3. Make sure you have a Postgres database running with the following schema: (Use pgAdmin or postbird to create the database and table)
    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    );
    ```
4.  Insert some sample data into the `users` table
    ```sql
    INSERT INTO users (name, email) VALUES ('Jerry', 'jerry@example.com');
    INSERT INTO users (name, email) VALUES ('Tom', 'tom@example.com');
    ```
5. Ensure the database connection details are correct in the `src/db/index.ts` file.
6. Run the server
    ```bash
    pnpm start
    ```
7. Test the API endpoints using Postman. Use postman collection [user-crud-v1](./user-crud-v1.postman_collection.json).

## Future Improvements

- Add authentication and authorization

## Credits

This project was realized with the help of the following resources:
- [Back-End Engineer](https://www.codecademy.com/learn/paths/back-end-engineer-career-path)