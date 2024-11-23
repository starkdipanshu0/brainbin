import { Request, Response } from 'express';
import Content from '../models/contentModel'; // Import the Content model

// Get all content
export const getAllContent = async (req: Request, res: Response) => {
    try {
        const content = await Content.find().populate('tags').populate('user');
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching content', error });
    }
};

// Create new content
export const createContent = async (req: Request, res: Response) => {
    try {
        const { link, title, description, type, tags, user } = req.body;
        const newContent = new Content({ link, title, description, type, tags, user });
        await newContent.save();
        res.status(201).json(newContent);
    } catch (error) {
        res.status(400).json({ message: 'Error creating content', error });
    }
};
