"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./config/database");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const PORT = process.env.PORT || 3001;
const startServer = async () => {
    try {
        await (0, database_1.checkDatabaseConnection)();
        app_1.default.listen(PORT);
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
