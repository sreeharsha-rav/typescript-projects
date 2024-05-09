import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './route/user.routes';

// Create an express application
const app = express();

// Use the body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the user router
app.use('/users', userRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});