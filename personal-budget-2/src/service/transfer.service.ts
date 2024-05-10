import { EnvelopeDAO } from '../dao/envelope.dao';
import { TransactionDAO } from '../dao/transaction.dao';
import { Transaction } from '../model/transaction.model';

/*
 * A service to handle transferring amounts between envelopes
 * transferAmount: A method to transfer an amount from one envelope to another
 */
export class TransferService {

    private envelopeDAO: EnvelopeDAO;

    private transactionDAO: TransactionDAO;

    constructor() {
        this.envelopeDAO = new EnvelopeDAO();
        this.transactionDAO = new TransactionDAO();
    }

    public transferAmount = async (fromEnvelopeId: number, toEnvelopeId: number, amount: number): Promise<Transaction> => {

        const fromEnvelope = await this.envelopeDAO.getEnvelopeById(fromEnvelopeId);
        const toEnvelope = await this.envelopeDAO.getEnvelopeById(toEnvelopeId);

        // Check if the envelopes exist and the amount is available
        if (fromEnvelope !== undefined && toEnvelope !== undefined) {

            // Parse all the amounts to floating point numbers
            const fromAmount = parseFloat(fromEnvelope.amount.toString());
            const toAmount = parseFloat(toEnvelope.amount.toString());
            const transferAmount = parseFloat(amount.toString());   // transaction amount

            // Check if the from envelope has enough amount to transfer
            if (fromAmount >= transferAmount) {

                // Update the amounts in the envelopes
                fromEnvelope.amount = parseFloat((fromAmount - transferAmount).toFixed(2));
                toEnvelope.amount = parseFloat((toAmount + transferAmount).toFixed(2));

                // Update the envelopes in the database
                const updatedFromEnvelope = await this.envelopeDAO.updateEnvelope(fromEnvelope.id, fromEnvelope.name, fromEnvelope.amount);
                const updatedToEnvelope = await this.envelopeDAO.updateEnvelope(toEnvelope.id, toEnvelope.name, toEnvelope.amount);

                // If both envelopes are updated successfully, create a transaction
                if (updatedFromEnvelope !== undefined && updatedToEnvelope !== undefined) {
                    // Create a transaction for the transfer
                    const transactionDate = new Date().toISOString();
                    const recipient = toEnvelope.name;
                    const envelopeId = fromEnvelope.id;
                    const transactionResult = await this.transactionDAO.createTransaction(transactionDate, transferAmount, recipient, envelopeId);

                    // Log the transaction
                    console.log(`Transaction: Transfered $${transferAmount} from ${fromEnvelope.name} to ${toEnvelope.name}. Transaction ID: ${transactionResult.id}`)

                    return transactionResult;
                }
            }
        }
        return {} as Transaction;
    }

}