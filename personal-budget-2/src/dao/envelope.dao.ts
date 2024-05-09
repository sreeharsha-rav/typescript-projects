import { Envelope } from "../model/envelope.model";
import dotenv from 'dotenv';

// Set up the database connection using the pg library - use your own connection string
dotenv.config();

const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

/*
 * A class for the envelope repository that interacts with the database
 * getEnvelopes: A method to retrieve all envelopes from the database
 * getEnvelopeById: A method to retrieve a single envelope by id from the database
 * createEnvelope: A method to create a new envelope and add it to the database
 * updateEnvelope: A method to update an envelope in the database
 * deleteEnvelope: A method to delete an envelope from the database
 * transferAmount: A method to transfer an amount from one envelope to another
 */
export class EnvelopeDAO {

    // A method to retrieve all envelopes from the database
    public async getEnvelopes(): Promise<Envelope[]> {
        try {
            const result = await pool.query('SELECT * FROM envelopes ORDER BY id ASC');
            return result.rows;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // A method to retrieve a single envelope by id from the database
    public async getEnvelopeById(id: number): Promise<Envelope | undefined> {
        try {
            const result = await pool.query('SELECT * FROM envelopes WHERE id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    // A method to create a new envelope and add it to the database
    public async createEnvelope(name: string, amount: number): Promise<Envelope> {
        try {
            const result = await pool.query('INSERT INTO envelopes (name, amount) VALUES ($1, $2) RETURNING *', [name, amount]);
            return result.rows[0];
        } catch (error) {
            console.error(error);
            return {} as Envelope;
        }
    }

    // A method to update an envelope in the database
    public async updateEnvelope(id: number, name: string, amount: number): Promise<Envelope | undefined> {
        try {
            const result = await pool.query('UPDATE envelopes SET name = $1, amount = $2 WHERE id = $3 RETURNING *', [name, amount, id]);
            return result.rows[0];
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    // A method to delete an envelope from the database
    public async deleteEnvelope(id: number): Promise<Envelope | undefined> {
        try {
            const result = await pool.query('DELETE FROM envelopes WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    // A method to transfer an amount from one envelope to another
    public async transferAmount(fromIndex: number, toIndex: number, amount: number): Promise<Envelope[] | undefined> {
        try {
            await pool.query('BEGIN');
            const fromEnvelope = await this.getEnvelopeById(fromIndex);
            const toEnvelope = await this.getEnvelopeById(toIndex);


            if (fromEnvelope && toEnvelope) {
                // Parse all the amounts to floating point numbers
                const fromAmount = parseFloat(fromEnvelope.amount.toString());
                const toAmount = parseFloat(toEnvelope.amount.toString());
                const transferAmount = parseFloat(amount.toString());

                // Check if the from envelope has enough amount to transfer
                if (fromAmount >= transferAmount) {
                    // Log amount transfer
                    // console.log(`Transferring $${transferAmount} from ${fromEnvelope.name} to ${toEnvelope.name}`);
                    // console.log(`Before transfer: ${fromEnvelope.name} has $${fromAmount}, ${toEnvelope.name} has $${toAmount}`);

                    fromEnvelope.amount = parseFloat((fromAmount - transferAmount).toFixed(2));
                    toEnvelope.amount = parseFloat((toAmount + transferAmount).toFixed(2));

                    // console.log(`After transfer: ${fromEnvelope.name} has $${fromEnvelope.amount}, ${toEnvelope.name} has $${toEnvelope.amount}`);

                    const updatedFromEnvelope = await this.updateEnvelope(fromEnvelope.id, fromEnvelope.name, fromEnvelope.amount);
                    const updatedToEnvelope = await this.updateEnvelope(toEnvelope.id, toEnvelope.name, toEnvelope.amount);

                    if (updatedFromEnvelope && updatedToEnvelope) {
                        await pool.query('COMMIT');
                        return [updatedFromEnvelope, updatedToEnvelope];
                    }
                }
            }

            await pool.query('ROLLBACK');
            return undefined;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

}