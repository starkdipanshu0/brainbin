import express from 'express';
import { getAllContent, createContent } from '../controllers/contentController';

const router = express.Router();

router.get('/', getAllContent); // Fetch all content
router.post('/', createContent); // Create new content

export default router;