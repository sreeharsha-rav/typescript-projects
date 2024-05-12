import express from 'express';
import bodyParser from 'body-parser';
import bookRouter from './routes/book.route';
import specs from './docs/swagger-config';

// Create an express application
const app = express();

// use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use cors middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Use the book router
app.use('/books', bookRouter);

// Serve the swagger docs
const swaggerUi = require('swagger-ui-express');
app.use(
    '/api-docs', 
    swaggerUi.serve, 
    // swaggerUi.setup(specs, { explorer: true })   // Uncomment this line to enable the swagger UI explorer
    swaggerUi.setup(specs)
);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});