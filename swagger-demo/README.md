# Swagger Demo

## Description

This is a demo project to show how to use Swagger with Express.js along with TypeScript.

## Technologies

- Node.js
- Express.js
- TypeScript
- Swagger

## Data Model

- Books
  - id: number
  - title: string
  - author: string
  - finished: boolean
  - createdAt: Date

## API Endpoints

- `GET /books/` - Get all books
- `GET /books/:id` - Get a book by id
- `POST /books/` - Create a new book
    - Sample request Body: 
        ```json
        {
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "finished": false
        }
        ```
- `PUT /books/:id` - Update a book by id
    - Sample request Body: 
        ```json
        /books/1
        {
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "finished": true
        }
        ```
- `DELETE /books/:id` - Delete a book by id

## How to use

### Prerequisites

- Node.js
- TypeScript
- Swagger
- pnpm (optional but recommended)

### Installation

1. Clone the repository
2. Install the dependencies
    ```bash
    pnpm install
    ```
3. Start the server
    ```bash
    pnpm run start
    ```
4. Open your browser and go to `http://localhost:3000/api-docs` to see the Swagger UI

## Credits

This project was realized with the help of the following resources:
- [Documenting your Express API with Swagger](https://blog.logrocket.com/documenting-express-js-api-swagger/)