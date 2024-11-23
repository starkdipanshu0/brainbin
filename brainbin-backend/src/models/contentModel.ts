import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
    link: string;
    title?: string;
    description?: string;
    type: mongoose.Types.ObjectId; // Reference to the Type model
    tags: mongoose.Types.ObjectId[]; // Array of Tag references
    user: mongoose.Types.ObjectId; // User who owns the content
}

const ContentSchema: Schema = new Schema(
    {
        link: { type: String, required: true },
        title: { type: String },
        description: { type: String },
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IContent>('Content', ContentSchema);

