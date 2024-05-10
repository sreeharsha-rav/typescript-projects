import { Envelope } from "../model/envelope.model";
import { pool } from "../db/config";

/*
 * A class for the envelope repository that interacts with the database
 * getEnvelopes: A method to retrieve all envelopes from the database
 * getEnvelopeById: A method to retrieve a single envelope by id from the database
 * createEnvelope: A method to create a new envelope and add it to the database
 * updateEnvelope: A method to update an envelope in the database
 * deleteEnvelope: A method to delete an envelope from the database
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
}