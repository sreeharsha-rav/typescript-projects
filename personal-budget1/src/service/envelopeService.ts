import { Envelope } from '../model/envelopeModel';
import { EnvelopeDB } from '../sampleDB/envelopeDB';

// A service to handle the envelope CRUD operations that interacts with the database
export class EnvelopeService {

    private envelopeDB: Envelope[] = EnvelopeDB;

    // A method to create a new envelope and add it to the database
    public createEnvelope(name: string, amount: number): Envelope {
        // Create new envelope id from last id + 1
        const newId: number = this.envelopeDB.length > 0 ? this.envelopeDB[this.envelopeDB.length - 1].id + 1 : 1;

        // Create a new envelope object
        const newEnvelope: Envelope = {
            id: newId,
            name: name,
            amount: amount,
        };

        // Add the new envelope to the database
        this.envelopeDB = [...this.envelopeDB, newEnvelope];

        return newEnvelope;
    }

    // A method to retrieve all envelopes from the database
    public getAllEnvelopes(): Envelope[] | undefined {
        return this.envelopeDB;
    }

    // A method to retrieve a single envelope by id from the database
    public getEnvelopeById(id: number): Envelope | undefined {
        // Find the envelope with the given id
        const envelope: Envelope | undefined = this.envelopeDB.find((e) => e.id === id);

        return envelope;
    }

    // A method to update an envelope in the database
    public updateEnvelope(id: number, name: string, amount: number): Envelope | undefined {
        // Find the index of the envelope with the given id
        const index: number = this.envelopeDB.findIndex((e) => e.id === id);

        // If the envelope is not found, return undefined
        if (index === -1) {
            return undefined;
        }

        // Update the envelope in the database
        this.envelopeDB[index] = {
            id: id,
            name: name,
            amount: amount,
        };

        return this.envelopeDB[index];
    }

    // A method to delete an envelope from the database
    public deleteEnvelope(id: number): Envelope | undefined {
        // Find the index of the envelope with the given id
        const index: number = this.envelopeDB.findIndex((e) => e.id === id);

        // If the envelope is not found, return undefined
        if (index === -1) {
            return undefined;
        }

        // Remove the envelope from the database
        const deletedEnvelope: Envelope = this.envelopeDB[index];
        this.envelopeDB = this.envelopeDB.filter((e) => e.id !== id);

        return deletedEnvelope;
    }

    // A method to transfer an amount from one envelope to another
    public transferAmount(from: number, to: number, amount: number): Envelope[] | undefined {
        // Find the index of the envelope with the given id
        const fromIndex: number = this.envelopeDB.findIndex((e) => e.id === from);
        const toIndex: number = this.envelopeDB.findIndex((e) => e.id === to);

        // If the envelopes are not found, return undefined
        if (fromIndex === -1 || toIndex === -1) {
            return undefined;
        }

        // If the amount to transfer is greater than the amount in the from envelope, return undefined
        if (this.envelopeDB[fromIndex].amount < amount) {
            return undefined;
        }

        // Transfer the amount from the from envelope to the to envelope
        this.envelopeDB[fromIndex].amount -= amount;
        this.envelopeDB[toIndex].amount += amount;

        // Return both envelopes
        return [this.envelopeDB[fromIndex], this.envelopeDB[toIndex]];
    }

}