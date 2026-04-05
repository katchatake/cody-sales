import app from './app';
import dotenv from 'dotenv';
import path from 'path';
import { checkDatabaseConnection } from './config/database';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await checkDatabaseConnection();

        app.listen(PORT);
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
