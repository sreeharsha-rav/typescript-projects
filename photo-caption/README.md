# Photo Caption Contest

This is a backend for a platform where users can participate in a photo caption contest. The server hosts few images and provides endpoint to authenticate and authorize users, upload images, and submit captions for the images.

## Table of Contents

- [Technologies](#technologies)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Future Improvements](#future-improvements)
- [Credits](#credits)

## Technologies Used

- Node.js
- Fastify
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT
- Localized Caching

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
    - Run the migrations: `pnpm prisma migrate dev --name init`
    - Generate the Prisma client: `pnpm prisma generate`
    - Seed the database: `pnpm prisma db seed`

### Running the Server

1. Run the server: `pnpm dev`
2. Open Postman and import the collection from the `postman` directory
3. Test the API endpoints using the Postman collection at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login a user

### Images

- `GET /images/` - Get all images

### Captions

- `GET /captions/` - Get all captions (requires authentication)
- `POST /captions/` - Submit a caption for an image (requires authentication)

## Database Schema

### User
| Column    | Type   |
|-----------|--------|
| id        | number |
| username  | string |
| password  | string |

### Image
| Column    | Type   |
|-----------|--------|
| id        | number |
| url       | string |

### Caption
| Column    | Type   |
|-----------|--------|
| id        | number |
| text      | string |
| userId    | number |
| imageId   | number |

## Future Improvements

## Credits

This project was realized with the help of the following resources:
- [Back-End Engineer](https://www.codecademy.com/learn/paths/back-end-engineer-career-path)