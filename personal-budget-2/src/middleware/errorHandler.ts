import { Request, Response, NextFunction } from 'express';

// A middleware to handle errors
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
};

// Middleware to handle cors
export const cors = (req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};