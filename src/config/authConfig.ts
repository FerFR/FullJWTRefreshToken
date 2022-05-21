import { IUserDocument } from '../types/IUser';
import { ITokenPayload } from '../types/IAuth';

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRES = '20s';
export const REFRESH_TOKEN_EXPIRES = '30d';
export const TOKEN_PAYLOAD = (user: IUserDocument): ITokenPayload => {
    return {
        id: user._id,
        email: user.email,
        role: user.role,
    };
};
export const ADMIN_NAME = process.env.ADMIN_NAME;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
