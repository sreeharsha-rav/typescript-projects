# MealMap

MealMap is a recipe discovery app designed to help you find delicious recipes based on your preferences and ingredients.

## Description

MealMap allows users to search, filter, and discover a wide variety of recipes. Users can also save their favorite recipes and create a personalized meal plan. The app leverages Fastify for the backend, Prisma as the ORM, and MongoDB for data storage, with TypeScript ensuring robust and maintainable code.

## Features

- Search for recipes by ingredients, cuisine, and dietary preferences
- Save and manage favorite recipes
- Create and customize meal plans
- User authentication and profile management
- Responsive design for a seamless experience across devices

## Technologies

- **Frontend:** TypeScript, HTML, CSS, Bootstrap
- **Backend:** Fastify, TypeScript
- **Database:** PostgreSQL, MongoDB
- **ORM:** Prisma, Mongoose
- **Others:** Node.js, pnpm, Docker, GitHub Actions

## Development

### Phase 1

v0.1 - set up the project structure and basic recipe CRUD operations

- set up the project structure
- create the data model in PostgreSQL with Prisma
- implement recipe CRUD operations
- write unit tests
- implement CI/CD pipeline

v0.2 - implement search and filter functionality

- implement search functionality
- implement filter functionality
- write integration tests
- update CI/CD pipeline

v0.3 - add feaures to recipes

- add ingredients and instructions to recipes in MongoDB with Mongoose
- update search and filter functionality
- write integration tests
- update CI/CD pipeline

v0.4 - implement user authentication and profile management

- implement user authentication
- implement user profile management
- write integration tests
- update CI/CD pipeline

v0.5 - implement favorites and meal plans

- implement favorites functionality
- implement meal plans functionality
- write integration tests
- update CI/CD pipeline

### Phase 2

v0.9 - implement basic frontend
v1.0 - final release

## Phase 3

- add rating and reviews to recipes
- implement social sharing
- add user notifications

## Data Model

### User

- `id` (String): Unique identifier
- `username` (String): User's name
- `email` (String): User's email address
- `password` (String): User's password (hashed)
- `favorites` (Array of Recipe IDs): List of user's favorite recipes
- `mealPlans` (Array of Meal Plan IDs): List of user's meal plans

### Recipe

- `id` (String): Unique identifier
- `name` (String): Name of the recipe
- `ingredients` (Array of Strings): List of ingredients
- `instructions` (String): Step-by-step instructions
- `cuisine` (String): Cuisine type
- `dietaryPreferences` (Array of Strings): Dietary preferences (e.g., vegan, gluten-free)

### Meal Plan

- `id` (String): Unique identifier
- `userId` (String): ID of the user who created the meal plan
- `name` (String): Name of the meal plan
- `recipes` (Array of Recipe IDs): List of recipes in the meal plan

## API Endpoints

### User Endpoints

- `POST /api/users`: Register a new user
- `POST /api/users/login`: User login
- `GET /api/users/:id`: Get user details
- `PUT /api/users/:id`: Update user details
- `DELETE /api/users/:id`: Delete user account

### Recipe Endpoints

- `GET /api/recipes`: Get all recipes
- `GET /api/recipes/:id`: Get recipe by ID
- `POST /api/recipes`: Add a new recipe
- `PUT /api/recipes/:id`: Update a recipe
- `DELETE /api/recipes/:id`: Delete a recipe

### Meal Plan Endpoints

- `GET /api/mealplans`: Get all meal plans
- `GET /api/mealplans/:id`: Get meal plan by ID
- `POST /api/mealplans`: Create a new meal plan
- `PUT /api/mealplans/:id`: Update a meal plan
- `DELETE /api/mealplans/:id`: Delete a meal plan