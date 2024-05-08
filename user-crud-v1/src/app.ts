import express from 'express';
import bodyParser from 'body-parser';
import { errorHandler, cors } from './middleware/errorHandler';
import userRouter from './routes/user.routes';

// Create an express application
const app = express();

// Use the body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the cors middleware
app.use(cors);

// Use the user router
app.use('/users', userRouter);

// Use the error handler middleware
app.use(errorHandler);

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});