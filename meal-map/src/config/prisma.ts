import { PrismaClient } from '@prisma/client';

// Declare a global variable to store the PrismaClient instance
declare global {
    var prisma: PrismaClient | undefined;
}

// create a singleton instance of PrismaClient
export const prisma = global.prisma || new PrismaClient();

// Assign the PrismaClient instance to the global object
if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}
