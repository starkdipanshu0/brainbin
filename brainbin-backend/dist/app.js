"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db")); // MongoDB connection
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Example user routes
const contentRoutes_1 = __importDefault(require("./routes/contentRoutes")); // Example content routes
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)()); // Enable CORS
app.use((0, morgan_1.default)('dev')); // Logging HTTP requests
app.use(body_parser_1.default.json()); // Parse JSON request bodies
app.use(body_parser_1.default.urlencoded({ extended: true })); // Parse URL-encoded request bodies
// MongoDB Connection
(0, db_1.default)();
// Basic health check route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the BrainBin API!' });
});
// Routes
app.use('/api/users', userRoutes_1.default); // Routes for user operations
app.use('/api/content', contentRoutes_1.default); // Routes for content management
// Error handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
});
// Export the app for server initialization
exports.default = app;
