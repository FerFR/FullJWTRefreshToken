import { Response, NextFunction } from 'express';
import auth from '../utils/auth';
import { RequestAuth } from '../types/IAuth';

const verifyAuth = (req: RequestAuth, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = auth.validateTokenFormatFromHeadersAndReturnIt(authHeader);
    const decodedToken = auth.verifyAccessToken(token);
    req.user = decodedToken;
    next();
};

export default verifyAuth;
