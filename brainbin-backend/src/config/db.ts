import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI || '';
        if (!mongoURI) {
            throw new Error('MONGO_URI not found in environment variables');
        }

        await mongoose.connect(mongoURI); // 
        console.log('MongoDB connected successfully');
    } catch (error: any) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;