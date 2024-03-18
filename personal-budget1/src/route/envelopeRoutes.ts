import express from 'express';
import { EnvelopeController } from '../controller/envelopeController';

// A router to handle the envelope CRUD operations
const envelopeRouter = express.Router();
const envelopeController = new EnvelopeController();

// Define the routes for the envelope CRUD operations
envelopeRouter.get('/', envelopeController.getAllEnvelopes);
envelopeRouter.get('/:id', envelopeController.getEnvelopeById);
envelopeRouter.post('/', envelopeController.createEnvelope);
envelopeRouter.put('/:id', envelopeController.updateEnvelope);
envelopeRouter.delete('/:id', envelopeController.deleteEnvelope);
// Route for transferring amount from one envelope to another
envelopeRouter.post('/transfer', envelopeController.transferAmount);

export default envelopeRouter;