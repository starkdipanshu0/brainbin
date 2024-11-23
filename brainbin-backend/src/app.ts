import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db'; // MongoDB connection
import userRoutes from './routes/userRoutes'; // Example user routes
import contentRoutes from './routes/contentRoutes'; // Example content routes
import authRoutes from './routes/authRoutes'
dotenv.config();

// Initialize Express app
const app: Application = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging HTTP requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// MongoDB Connection
connectDB();

// Basic health check route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the BrainBin API!' });
});

// Routes
app.use('/api/users', userRoutes); // Routes for user operations
app.use('/api/content', contentRoutes); // Routes for content management
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
});

// Export the app for server initialization
export default app;