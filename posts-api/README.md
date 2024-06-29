# Posts API

A application to demonstrate CRUD functionality along with REST API in Next.js. The API allows users to create, read, update, and delete posts.

## Technologies

- Next.js
- TypeScript
- Prisma
- MongoDB

## Data Model

- Posts
  - id: number
  - title: string
  - description: string
  - createdAt: Date
  - updatedAt: Date

## API Endpoints

- `GET /api/posts/` - Get all posts
- `GET /api/posts/:id` - Get a post by id
- `POST /api/posts/` - Create a new post
    - Sample request Body: 
        ```json
        {
            "title": "Post Title",
            "description": "Post Description"
        }
        ```
- `PUT /api/posts/:id` - Update a post by id
    - Sample request Body: 
        ```json
        /api/posts/1
        {
            "title": "Updated Post Title",
            "description": "Updated Post Description"
        }
        ```
- `DELETE /api/posts/:id` - Delete a post by id
