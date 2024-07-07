import dotenv from 'dotenv';

dotenv.config();

// Configuration object for environment variables
export const config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/mealmapdb',
};