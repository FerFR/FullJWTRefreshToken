import { Document, ObjectId } from 'mongoose';
import { Request } from 'express';

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface IUserDocument extends Omit<IUser, 'password'>, Document {
    _id: ObjectId;
    role: string;
    password?: string;
    refreshToken?: string;
}

export interface IUserLoginRequest extends Request {
    body: Pick<IUser, 'email' | 'password'>;
}

export interface IUserRegisterRequest extends Request {
    body: IUser;
}
