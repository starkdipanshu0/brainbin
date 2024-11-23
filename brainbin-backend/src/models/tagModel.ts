import mongoose, { Schema, Document } from 'mongoose';

export interface ITag extends Document {
    title: string;
    createdBy: mongoose.Types.ObjectId; // User who created the tag
}

const TagSchema: Schema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

export default mongoose.model<ITag>('Tag', TagSchema);
