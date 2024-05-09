import { Request, Response } from "express";
import { EnvelopeRepository } from "../repository/envelope.repository";

/*
 * A controller to handle requests from the envelope routes and interact with the envelope repository
 * getAllEnvelopes: A method to retrieve all envelopes requested from HTTP GET
 * getEnvelopeById: A method to retrieve a single envelope by id requested from HTTP GET
 * createEnvelope: A method to create a new envelope from request body requested from HTTP POST
 * updateEnvelope: A method to update an envelope by id from request url and body requested from HTTP PUT
 * deleteEnvelope: A method to delete an envelope by id from request url requested from HTTP DELETE
 * transferAmount: A method to transfer an amount from one envelope to another from request body requested from HTTP POST
 */
export class EnvelopeController {

    private envelopeRepository: EnvelopeRepository;

    constructor() {
        this.envelopeRepository = new EnvelopeRepository();
    }

    // A method to retrieve all envelopes requested from HTTP GET
    public getAllEnvelopes = async (req: Request, res: Response): Promise<void> => {
        const result = await this.envelopeRepository.getEnvelopes();
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Bad Request. No envelopes found' });
        }
    }

    // A method to retrieve a single envelope by id requested from HTTP GET
    public getEnvelopeById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const result = await this.envelopeRepository.getEnvelopeById(parseInt(id));
        if (result !== undefined) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Bad Request. Envelope not found' });
        }
    }

    // A method to create a new envelope from request body requested from HTTP POST
    public createEnvelope = async (req: Request, res: Response): Promise<void> => {
        const { name, amount } = req.body;
        const result = await this.envelopeRepository.createEnvelope(name, amount);
        if (result.id) {
            res.status(201).json(result);
        } else {
            res.status(400).json({ error: 'Bad Request. Envelope not created' });
        }
    }

    // A method to update an envelope by id from request url and body requested from HTTP PUT
    public updateEnvelope = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name, amount } = req.body;
        const result = await this.envelopeRepository.updateEnvelope(parseInt(id), name, amount);
        if (result !== undefined) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Bad Request. Envelope not found, not able to update.' });
        }
    }

    // A method to delete an envelope by id from request url requested from HTTP DELETE
    public deleteEnvelope = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const result = await this.envelopeRepository.deleteEnvelope(parseInt(id));
        if (result !== undefined) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Bad Request. Envelope not found, not able to delete.' });
        }
    }

    // A method to transfer an amount from one envelope to another from request body requested from HTTP POST
    public transferAmount = async (req: Request, res: Response): Promise<void> => {
        const { from, to, amount } = req.body;
        const result = await this.envelopeRepository.transferAmount(from, to, amount);
        if (result !== undefined) {
            res.json(result);
        } else {
            res.status(400).json({ error: 'Bad Request. Invalid transfer' });
        }
    }

}