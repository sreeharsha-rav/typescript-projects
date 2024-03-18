import { Request, Response } from 'express';
import { EnvelopeService } from '../service/envelopeService';

// A controller to handle the envelope CRUD operations from RESTful API
export class EnvelopeController {
    private envelopeService: EnvelopeService;

    constructor() {
        this.envelopeService = new EnvelopeService();
    }

    // A method to retrieve all envelopes requested from HTTP GET
    public getAllEnvelopes = async (req: Request, res: Response): Promise<void> => {
        const envelopes = await this.envelopeService.getAllEnvelopes();
        res.json(envelopes);
    }

    // A method to retrieve a single envelope by id requested from HTTP GET
    public getEnvelopeById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const envelope = await this.envelopeService.getEnvelopeById(parseInt(id));
        if (envelope) {
            res.json(envelope);
        } else {
            res.status(404).json({ error: 'Envelope not found' });
        }
    }

    // A method to create a new envelope from request body requested from HTTP POST
    public createEnvelope = async (req: Request, res: Response): Promise<void> => {
        const { name, amount } = req.body;
        const envelope = await this.envelopeService.createEnvelope(name, amount);
        res.status(201).json(envelope);
    }

    // A method to update an envelope by id from request url and body requested from HTTP PUT
    public updateEnvelope = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name, amount } = req.body;
        const envelope = await this.envelopeService.updateEnvelope(parseInt(id), name, amount);
        if (envelope) {
            res.json(envelope);
        } else {
            res.status(404).json({ error: 'Envelope not found' });
        }
    }

    // A method to delete an envelope by id from request url requested from HTTP DELETE
    public deleteEnvelope = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const envelope = await this.envelopeService.deleteEnvelope(parseInt(id));
        if (envelope) {
            res.json(envelope);
        } else {
            res.status(404).json({ error: 'Envelope not found' });
        }
    }

    // A method to transfer an amount from one envelope to another from request body requested from HTTP POST
    public transferAmount = async (req: Request, res: Response): Promise<void> => {
        const { from, to, amount } = req.body;
        const envelopes = await this.envelopeService.transferAmount(from, to, amount);
        if (envelopes) {
            res.json(envelopes);
        } else {
            res.status(400).json({ error: 'Invalid transfer' });
        }
    }

}