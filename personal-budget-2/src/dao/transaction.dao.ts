import { Transaction } from "../model/transaction.model";
import { pool } from "../db/config";

/*
 * A class for the transaction repository that interacts with the database
 * getTransactions: A method to retrieve all transactions from the database
 * getTransactionById: A method to retrieve a single transaction by id from the database
 * createTransaction: A method to create a new transaction and add it to the database
 * updateTransaction: A method to update a transaction in the database
 * deleteTransaction: A method to delete a transaction from the database
 */
export class TransactionDAO {

    // A method to retrieve all transactions from the database
    public async getTransactions(): Promise<Transaction[]> {
        try {
            const result = await pool.query('SELECT * FROM transactions ORDER BY id ASC');
            return result.rows;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // A method to retrieve a single transaction by id from the database
    public async getTransactionById(id: number): Promise<Transaction | undefined> {
        try {
            const result = await pool.query('SELECT * FROM transactions WHERE id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    // A method to create a new transaction and add it to the database
    public async createTransaction(date: string, amount: number, recipient: string, envelope_id: number): Promise<Transaction> {
        try {
            const result = await pool.query('INSERT INTO transactions (date, amount, recipient, envelope_id) VALUES ($1, $2, $3, $4) RETURNING *', [date, amount, recipient, envelope_id]);
            return result.rows[0];
        } catch (error) {
            console.error(error);
            return {} as Transaction;
        }
    }

    // A method to update a transaction in the database
    public async updateTransaction(id: number, date: string, amount: number, recipient: string, envelope_id: number): Promise<Transaction | undefined> {
        try {
            const result = await pool.query('UPDATE transactions SET date = $1, amount = $2, recipient = $3, envelope_id = $4 WHERE id = $5 RETURNING *', [date, amount, recipient, envelope_id, id]);
            return result.rows[0];
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    // A method to delete a transaction from the database
    public async deleteTransaction(id: number): Promise<Transaction | undefined> {
        try {
            const result = await pool.query('DELETE FROM transactions WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

}