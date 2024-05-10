import { Request, Response } from "express";
import { TransactionDAO } from "../dao/transaction.dao";

/*
 * A controller to handle requests from the transaction routes and interact with the transaction DAO
 * getAllTransactions: A method to retrieve all transactions requested from HTTP GET
 * getTransactionById: A method to retrieve a single transaction by id requested from HTTP GET
 * createTransaction: A method to create a new transaction from request body requested from HTTP POST
 * updateTransaction: A method to update a transaction by id from request url and body requested from HTTP PUT
 * deleteTransaction: A method to delete a transaction by id from request url requested from HTTP DELETE
 */
export class TransactionController {

    private transactionDAO: TransactionDAO;

    constructor() {
        this.transactionDAO = new TransactionDAO();
    }

    // A method to retrieve all transactions requested from HTTP GET
    public getAllTransactions = async (req: Request, res: Response): Promise<void> => {
        const result = await this.transactionDAO.getTransactions();
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Bad Request. No transactions found' });
        }
    }

    // A method to retrieve a single transaction by id requested from HTTP GET
    public getTransactionById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const result = await this.transactionDAO.getTransactionById(parseInt(id));
        if (result !== undefined) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Bad Request. Transaction not found' });
        }
    }

    // A method to create a new transaction from request body requested from HTTP POST
    public createTransaction = async (req: Request, res: Response): Promise<void> => {
        const { date, amount, recipient, envelope_id } = req.body;
        const result = await this.transactionDAO.createTransaction(date, amount, recipient, envelope_id);
        if (result.id) {
            res.status(201).json(result);
        } else {
            res.status(400).json({ error: 'Bad Request. Transaction not created' });
        }
    }

    // A method to update a transaction by id from request url and body requested from HTTP PUT
    public updateTransaction = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { date, amount, recipient, envelope_id } = req.body;
        const result = await this.transactionDAO.updateTransaction(parseInt(id), date, amount, recipient, envelope_id);
        if (result !== undefined) {
            res.json(result);
        } else {
            res.status(400).json({ error: 'Bad Request. Transaction not updated' });
        }
    }

}