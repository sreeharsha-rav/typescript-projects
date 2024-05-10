/*
 * This is the interface for the Transaction model.
 * id: A number representing the unique identifier for the transaction.
 * date: A string representing the date of the transaction.
 * amount: A number representing the amount of money in the transaction.
 * recipient: A string representing the recipient of the transaction.
 * envelope_id: A number representing the unique identifier for the envelope associated with the transaction.
 */
export interface Transaction {
    id: number;
    date: string;
    amount: number;
    recipient: string;
    envelope_id: number;
}