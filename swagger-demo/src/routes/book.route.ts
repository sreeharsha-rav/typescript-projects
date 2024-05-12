import express from 'express';
import { Book } from '../model/book.model';
import books from '../util/data';

// Create a new router
const bookRouter = express.Router();

// GET /books
bookRouter.get('/', (req, res) => {
    res.status(200).json(books);
});

// GET /books/:id
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