import express from 'express';
import { getAllUsers, createUser } from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsers); // Fetch all users
router.post('/', createUser); // Create a new user


export default router;
