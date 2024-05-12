import express from 'express';
import { Book } from '../model/book.model';
import books from '../util/data';

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

// Create a new router
const bookRouter = express.Router();

// GET /books
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   get:
 *     summary: Returns the list of all the books.
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error
 */
bookRouter.get('/', (req, res) => {
    res.status(200).json(books);
});

// GET /books/:id
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books/{id}:
 *   get:
 *     summary: Get a book by id.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book with the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *       500:
 *         description: Internal server error
 */
bookRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book: { id: number; }) => book.id === id);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// POST /books
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   post:
 *     summary: Create a new book.
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
bookRouter.post('/', (req, res) => {
    const { title, author, finished } = req.body;

    if (!title || !author || finished === undefined) {
        res.status(400).send('Invalid request body');
        return;
    }

    const newBook: Book = {
        id: books.length + 1,
        title,
        author,
        finished,
        createdAt: new Date(),
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

// PUT /books/:id
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books/{id}:
 *   put:
 *     summary: Update a book by id.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The updated book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *       500:
 *         description: Internal server error
 */
bookRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author, finished } = req.body;

    const book = books.find((book: { id: number; }) => book.id === id);

    if (book) {
        // Update the book
        book.title = title || book.title;
        book.author = author || book.author;
        book.finished = finished === undefined ? book.finished : finished;

        res.status(200).json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// DELETE /books/:id
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by id.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book id
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: The book was not found
 *       500:
 *         description: Internal server error
 */
bookRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex((book: { id: number; }) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        res.status(204).send('Book deleted successfully');
    } else {
        res.status(404).send('Book not found');
    }
});

export default bookRouter;