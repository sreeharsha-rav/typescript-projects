import express from 'express';
import { TransactionController } from '../controller/transaction.controller';

// A router to handle the transaction CRUD operations
const transactionRouter = express.Router();
const transactionController = new TransactionController();

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Retrieve a list of transactions
 *     responses:
 *       200:
 *         description: A list of transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 */
transactionRouter.get('/', transactionController.getAllTransactions);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Retrieve a single transaction by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the transaction to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single transaction.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */
transactionRouter.get('/:id', transactionController.getTransactionById);

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: The created transaction.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */
transactionRouter.post('/', transactionController.createTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the transaction to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: The updated transaction.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */
transactionRouter.put('/:id', transactionController.updateTransaction);

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - date
 *         - amount
 *         - recipient
 *         - envelope_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the transaction
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the transaction
 *         amount:
 *           type: number
 *           format: float
 *           description: The amount of the transaction
 *         recipient:
 *           type: string
 *           description: The recipient of the transaction
 *         envelope_id:
 *           type: integer
 *           description: The id of the envelope associated with the transaction
 *       example:
 *         id: 1
 *         date: "2022-01-01"
 *         amount: 100.00
 *         recipient: "Groceries"
 *         envelope_id: 1
 */

export default transactionRouter;