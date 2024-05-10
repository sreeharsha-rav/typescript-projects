import express from 'express';
import { EnvelopeController } from '../controller/envelope.controller';

// A router to handle the envelope CRUD operations
const envelopeRouter = express.Router();
const envelopeController = new EnvelopeController();

// Define the routes for the envelope CRUD operations

/**
 * @swagger
 * /envelopes:
 *   get:
 *     summary: Retrieve a list of envelopes
 *     responses:
 *       200:
 *         description: A list of envelopes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Envelope'
 */
envelopeRouter.get('/', envelopeController.getAllEnvelopes);

/**
 * @swagger
 * /envelopes/{id}:
 *   get:
 *     summary: Retrieve a single envelope by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the envelope to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single envelope.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Envelope'
 */
envelopeRouter.get('/:id', envelopeController.getEnvelopeById);

/**
 * @swagger
 * /envelopes:
 *   post:
 *     summary: Create a new envelope
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Envelope'
 *     responses:
 *       201:
 *         description: The created envelope.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Envelope'
 */
envelopeRouter.post('/', envelopeController.createEnvelope);

/**
 * @swagger
 * /envelopes/{id}:
 *   put:
 *     summary: Update an envelope by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the envelope to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Envelope'
 *     responses:
 *       200:
 *         description: The updated envelope.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Envelope'
 */
envelopeRouter.put('/:id', envelopeController.updateEnvelope);

/**
 * @swagger
 * /envelopes/{id}:
 *   delete:
 *     summary: Delete an envelope by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the envelope to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: The envelope was successfully deleted.
 */
envelopeRouter.delete('/:id', envelopeController.deleteEnvelope);

/**
 * @swagger
 * /envelopes/transfer:
 *   post:
 *     summary: Transfer an amount between two envelopes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromEnvelopeId:
 *                 type: integer
 *               toEnvelopeId:
 *                 type: integer
 *               amount:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: The amount was successfully transferred.
 */
envelopeRouter.post('/transfer', envelopeController.transferAmount);

/**
 * @swagger
 * components:
 *   schemas:
 *     Envelope:
 *       type: object
 *       required:
 *         - name
 *         - amount
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the envelope
 *         name:
 *           type: string
 *           description: The name of the envelope
 *         amount:
 *           type: number
 *           format: float
 *           description: The budget of the envelope
 *       example:
 *         id: 1
 *         name: "Groceries"
 *         amount: 200.00
 */

export default envelopeRouter;