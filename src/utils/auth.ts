import jwt from 'jsonwebtoken';
import { IUserDocument } from '../types/IUser';
import {
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES,
    REFRESH_TOKEN_EXPIRES,
    TOKEN_PAYLOAD,
} from '../config/authConfig';
import { ITokenPayload } from '../types/IAuth';
import { BadRequest, Forbidden, Unauthorizated } from '../errors';

const auth = {
    createAccessToken(user: IUserDocument) {
        const accessToken = jwt.sign(
            TOKEN_PAYLOAD(user),
            ACCESS_TOKEN_SECRET!,
            {
                expiresIn: ACCESS_TOKEN_EXPIRES!,
            }
        );
        return accessToken;
    },
    createRefreshToken(user: IUserDocument) {
        const refreshToken = jwt.sign(
            TOKEN_PAYLOAD(user),
            REFRESH_TOKEN_SECRET!,
            {
                expiresIn: REFRESH_TOKEN_EXPIRES!,
            }
        );
        return refreshToken;
    },
    createRefreshAndAccessToken(user: IUserDocument) {
        const accessToken = this.createAccessToken(user);
        const refreshToken = this.createRefreshToken(user);

        return { accessToken, refreshToken };
    },
    validateTokenFormat(token: string) {
        return token.split('.').length === 3;
    },
    validateTokenFormatFromHeadersAndReturnIt(authHeader: string | undefined) {
        if (!authHeader) {
            throw Unauthorizated(
                'Missing Access Token from Authorization Headers'
            );
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'BEARER' || !token || !this.validateTokenFormat(token)) {
            throw BadRequest('Access Token Malformatted');
        }

        return token;
    },
    verifyAccessToken(accessToken: string) {
        if (!this.validateTokenFormat(accessToken)) {
            throw BadRequest('Access Token Malformatted');
        }
        try {
            //@ts-ignore
            const decodedToken: ITokenPayload = jwt.verify(
                accessToken,
                ACCESS_TOKEN_SECRET!
            );
            return decodedToken;
        } catch (e) {
            throw Forbidden('Access Token is invalid or expires');
        }
    },
    verifyRefreshToken(refreshToken: string | undefined) {
        if (!refreshToken) {
            throw BadRequest('Missing Refresh Token');
        }

        if (!this.validateTokenFormat(refreshToken)) {
            throw BadRequest('Refresh Token Malformatted');
        }
        try {
            //@ts-ignore
            const decodedToken: ITokenPayload = jwt.verify(
                refreshToken,
                REFRESH_TOKEN_SECRET!
            );
            return decodedToken;
        } catch (e) {
            throw Forbidden('Refresh Token is invalid or expires');
        }
    },
    verifyIsAuthenticated(user: ITokenPayload | undefined) {
        if (!user) {
            throw Unauthorizated('You are not authenticated');
        }
    },
};
export default auth;
