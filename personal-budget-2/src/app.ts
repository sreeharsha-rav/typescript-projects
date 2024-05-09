import express from 'express';
import bodyParser from 'body-parser';
import { errorHandler, cors } from './middleware/errorHandler';
import envelopeRouter from './route/envelope.routes';

// Create an express application
const app = express();

// Use the body parser middleware
app.use(bodyParser.json());

// Use the cors middleware
app.use(cors);

// Use the envelope router
app.use('/api/envelopes', envelopeRouter);

// Use the error handler middleware
app.use(errorHandler);

// Export the express application
export default app;