import { IUserDocument, IUser } from './IUser';
import { Request } from 'express';

export interface ITokenPayload {
    id: IUserDocument['_id'];
    email: IUser['email'];
    role: IUserDocument['role'];
}

export interface RequestAuth extends Request {
    user?: ITokenPayload;
}

export interface RefreshTokenRequest extends Request {
    body: { token: string };
}
