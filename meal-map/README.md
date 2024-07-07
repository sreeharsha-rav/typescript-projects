# MealMap

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/sreeharsha-rav/typescript-projects/tree/mealmap)
[![Latest Update](https://img.shields.io/badge/latest%20update-July%202024-blue.svg)]()

MealMap is a recipe discovery app designed to help you find delicious recipes based on your preferences and ingredients.

Current development roadmap [here](./roadmap.md).

## Description

MealMap allows users to search, filter, and discover a wide variety of recipes. Users can also save their favorite recipes and create a personalized meal plan. The app leverages Fastify for the backend, Prisma as the ORM, and MongoDB for data storage, with TypeScript ensuring robust and maintainable code.

## Features

- Search for recipes by ingredients, cuisine, and dietary preferences
- Save and manage favorite recipes
- Create and customize meal plans
- User authentication and profile management
- Responsive design for a seamless experience across devices

## Technologies

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Fastify, TypeScript, Jest
- **Database:** PostgreSQL, MongoDB
- **ORM:** Prisma, Mongoose
- **Others:** Node.js, pnpm, Docker, GitHub Actions

## Data Model

### User

| Field           | Type                | Description                  |
|-----------------|---------------------|------------------------------|
| id              | String              | Unique identifier            |
| username        | String              | User's name                  |
| email           | String              | User's email address         |
| password        | String              | User's password (hashed)     |
| favorites       | Array of Recipe IDs | List of user's favorite recipes |
| mealPlans       | Array of Meal Plan IDs | List of user's meal plans |

### Recipe

| Field           | Type                | Description                  |
|-----------------|---------------------|------------------------------|
| id              | String              | Unique identifier            |
| name            | String              | Name of the recipe           |
| ingredients     | Array of Strings    | List of ingredients          |
| instructions    | String              | Step-by-step instructions    |
| cuisine         | String              | Cuisine type                 |
| dietaryPreferences | Array of Strings | Dietary preferences (e.g., vegan, gluten-free) |

### Meal Plan

| Field           | Type                | Description                  |
|-----------------|---------------------|------------------------------|
| id              | String              | Unique identifier            |
| userId          | String              | ID of the user who created the meal plan |
| name            | String              | Name of the meal plan        |
| recipes         | Array of Recipe IDs | List of recipes in the meal plan |

## API Endpoints

### User Endpoints

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| POST   | /api/users            | Register a new user    |
| POST   | /api/users/login      | User login             |
| GET    | /api/users/:id        | Get user details       |
| PUT    | /api/users/:id        | Update user details    |
| DELETE | /api/users/:id        | Delete user account    |

### Recipe Endpoints

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | /api/recipes          | Get all recipes        |
| GET    | /api/recipes/:id      | Get recipe by ID       |
| POST   | /api/recipes          | Add a new recipe       |
| PUT    | /api/recipes/:id      | Update a recipe        |
| DELETE | /api/recipes/:id      | Delete a recipe        |

### Meal Plan Endpoints

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | /api/mealplans        | Get all meal plans     |
| GET    | /api/mealplans/:id    | Get meal plan by ID    |
| POST   | /api/mealplans        | Create a new meal plan |
| PUT    | /api/mealplans/:id    | Update a meal plan     |
| DELETE | /api/mealplans/:id    | Delete a meal plan     |


## Installation

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sreeharsha-rav/typescript-projects/tree/main/meal-map
   cd meal-map
   ```

2. Install the dependencies:
   ```bash
   pnpm install
   ```

3. Add environment variables to a `.env` file:
   ```bash
   PORT=3000
   DATABASE_URL=postgres://user:password@host:port/db
   ```

4. Generate Prisma client:
   ```bash
   pnpm prisma generate
   ```

5. Run database migrations:
   ```bash
   pnpm prisma migrate dev
   ```

6. Seed the database with initial data:
   ```bash
   pnpm seed
   ```

### Runnning the App

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. To build and start the production server:
   ```bash
   pnpm build
   pnpm start
   ```
### Testing

Run the unit tests:
```bash
pnpm test
```

### Docker

Build the Docker image:
```bash
docker build -t meal-map-api .
```

Configure the environment variables (PORT, HOST, DATABASE_URL) in docker-compose.yml and run the container:
```bash
docker-compose up
```

Access the API at http://localhost:3000.

## API Usage Examples

View all the api usage examples and test cases here: [Postman](https://www.postman.com/sreeharsha-rav/workspace/typescript-apps/collection/28103794-5532ef74-0ec3-4a93-ac67-86f9a03cfc4e?action=share&creator=28103794).

## Credits

This project was realized with the help of the following resources:
- [Back-End Engineer](https://www.codecademy.com/learn/paths/back-end-engineer-career-path)