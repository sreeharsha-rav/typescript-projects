# Personal Budget 2

## Description

This is a RESTful API that allows users create, read, update and delete their personal budget. The personal budget follows the principles of envelope budgeting, where users allocate a certain amount of money to different categories and track their spending. Learn more here: [Envelope Budgeting](https://www.thebalancemoney.com/what-is-envelope-budgeting-1293682)

## Technologies

- Node.js
- Express.js
- TypeScript
- PostgreSQL

## Data Model

- Envelope
  - id: number
  - name: string
  - amount: number

- Transaction
  - id: number
  - date: date
  - amount: number
  - recipient: string
  - envelope_id: number

## API Endpoints

### Envelopes

- `GET /api/envelopes/` - Get all envelopes
- `GET /api/envelopes/:id` - Get an envelope by id
- `POST /api/envelopes/` - Create a new envelope
    - Sample request Body: 
        ```json
        {
            "name": "Gym",
            "amount": 40.00
        }
        ```
- `POST /api/envelopes/transfer` - Transfer money from one envelope to another using the envelope ids
    - Sample request Body: 
        ```json
        {
            "fromEnvelopeId": 1,
            "toEnvelopeId": 7,
            "amount": 50.00
        }
        ```
- `PUT /api/envelopes/:id` - Update an envelope by id
    - Sample request Body: 
        ```json
        {
            "id": 8,
            "name": "Gym",
            "amount": 50.00
        }
        ```
- `DELETE /api/envelopes/:id` - Delete an envelope by id

### Transactions

- `GET /api/transactions/` - Get all transactions
- `GET /api/transactions/:id` - Get a transaction by id
- `POST /api/transactions/` - Create a new transaction
    - Sample request Body: 
        ```json
        {
            "date": "2021-09-01",
            "amount": 40.00,
            "recipient": "Planet Fitness",
            "envelopeId": 1
        }
        ```
- `PUT /api/transactions/:id` - Update a transaction by id
    - Sample request Body: 
        ```json
        {
            "id": 1,
            "date": "2021-09-01",
            "amount": 50.00,
            "recipient": "Planet Fitness",
            "envelopeId": 1
        }
        ```
- `DELETE /api/transactions/:id` - Delete a transaction by id

## How to use

### Prerequisites

- Node.js
- TypeScript
- PostgreSQL (running on port 5432)
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
    DB_USER=<your_postgres_username>
    DB_HOST=localhost
    DB_NAME=<your_database_name>
    DB_PASSWORD=<your_postgres_password>
    DB_PORT=<your_postgres_port>
    ```
4. Initialize the database with schema and seed data
    - [`schema`](./src/db/schema.sql)
    - [`seed data`](./src/db/data.sql)
    
    ```psql
    psql -U <your_postgres_username> -d <your_database_name> -a -f src/db/schema.sql
    psql -U <your_postgres_username> -d <your_database_name> -a -f src/db/data.sql
    ```
5. Run the server
    ```bash
    pnpm start
    ```
6. Open Postman and test the API endpoints [personal-budget](./personal-budget.postman_collection.json)

## Future Improvements

- Add front-end to interact with the API
- Deploy to Render

## Credits

This project was realized with the help of the following resources:
- [Back-End Engineer](https://www.codecademy.com/learn/paths/back-end-engineer-career-path)
