/*
 * This file is created to define the model of the book entity.
 * id: number - The unique identifier of the book.
 * title: string - The title of the book.
 * author: string - The author of the book.
 * finished: boolean - The status of the book, whether it is finished or not.
 * createdAt: Date - The date when the book was created.
 */
export interface Book {
    id: number;
    title: string;
    author: string;
    finished: boolean;
    createdAt: Date;
}