import mongoose, { Schema, Document } from "mongoose";

export interface IType extends Document {
    name: string;
    isDefault: boolean; // True for predefined types like Instagram, Twitter
    createdBy?: mongoose.Types.ObjectId; // User ID if it’s a user-generated type
}

const TypeSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        isDefault: { type: Boolean, default: false }, // Predefined or user-generated
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

export default mongoose.model<IType>('Type', TypeSchema);
