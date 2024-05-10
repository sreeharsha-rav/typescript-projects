import express from 'express';
import bodyParser from 'body-parser';
import { errorHandler, cors } from './middleware/errorHandler';
import envelopeRouter from './route/envelope.routes';
import transactionRouter from './route/transaction.route';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Envelopes & Transactions API',
      version: '1.0.0',
      description: 'A simple personal budgeting express API',
    },
  },
  apis: ['personal-budget-2/src/route/envelope.routes.ts', 'personal-budget-2/src/route/transaction.route.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Create an express application
const app = express();

// Use the body parser middleware
app.use(bodyParser.json());

// Use the cors middleware
app.use(cors);

// Use the envelope and transaction routers
app.use('/api/envelopes', envelopeRouter);
app.use('/api/transactions', transactionRouter);

// Use the error handler middleware
app.use(errorHandler);

// Use the swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Export the express application
export default app;