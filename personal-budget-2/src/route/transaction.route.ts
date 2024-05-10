import express from 'express';
import { TransactionController } from '../controller/transaction.controller';

// A router to handle the transaction CRUD operations
const transactionRouter = express.Router();
const transactionController = new TransactionController();

// Define the routes for the transaction CRUD operations
transactionRouter.get('/', transactionController.getAllTransactions);
transactionRouter.get('/:id', transactionController.getTransactionById);
transactionRouter.post('/', transactionController.createTransaction);
transactionRouter.put('/:id', transactionController.updateTransaction);

export default transactionRouter;