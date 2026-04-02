import app from './app';
import dotenv from 'dotenv';
import path from 'path';
import { checkDatabaseConnection } from './config/database';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        // Initialize Database connections here
        await checkDatabaseConnection();
        
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
