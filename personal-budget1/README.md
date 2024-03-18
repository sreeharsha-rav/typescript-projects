# Personal Budget 1.0

## Description

This is a RESTful API that allows users create, read, update and delete their personal budget. The personal budget follows the principles of envelope budgeting, where users allocate a certain amount of money to different categories and track their spending. Learn more here: [Envelope Budgeting](https://www.thebalancemoney.com/what-is-envelope-budgeting-1293682)

## Technologies

- Node.js
- Express.js
- TypeScript

## Data Model

- Envelope
  - id: string
  - name: string
  - amount: number

## API Endpoints

- `GET /api/envelopes/` - Get all envelopes
- `GET /api/envelopes/:id` - Get an envelope by id
- `POST /api/envelopes/` - Create a new envelope
    - Sample request Body: 
        ```json
        {
            "name": "Groceries",
            "amount": 200
        }
        ```
- `POST /api/envelopes/transfer` - Transfer money from one envelope to another using the envelope ids
    - Sample request Body: 
        ```json
        {
            "from": 1,
            "to": 7,
            "amount": 50
        }
        ```
- `PUT /api/envelopes/:id` - Update an envelope by id
    - Sample request Body: 
        ```json
        {
            "id": 1,
            "name": "Groceries",
            "amount": 250
        }
        ```
- `DELETE /api/envelopes/:id` - Delete an envelope by id

## How to use

### Prerequisites

- Node.js
- TypeScript
- Postman
- pnpm (optional but recommended)

### Installation

1. Clone the repository
2. Install the dependencies
    ```bash
    pnpm install
    ```
3. Run the server
    ```bash
    pnpm start
    ```
4. Test the API endpoints using Postman. Use postman collection []()

## Future Improvements

- Add an API endpoint allowing user to add a single amount that will be distributed across all envelopes
- Utilize async/await for connnecting to the database
- Establish a connection to a database
- Add authentication and authorization

## Credits

This project was realized with the help of the following resources:
- [Back-End Engineer](https://www.codecademy.com/learn/paths/back-end-engineer-career-path)