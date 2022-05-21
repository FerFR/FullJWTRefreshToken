import mongoose, { Schema } from 'mongoose';
import { IUserDocument } from '../types/IUser';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ['admin', 'costumer'],
        default: 'costumer',
        required: true,
    },
    refreshToken: {
        type: String,
        select: false,
    },
});

const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;
