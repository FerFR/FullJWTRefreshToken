import { Response, NextFunction } from 'express';
import { RefreshTokenRequest } from '../types/IAuth';
import UserRepository from '../repositories/UserRepository';
import auth from '../utils/auth';

const AuthController = {
    async refreshToken(
        req: RefreshTokenRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const token = req.body.token;
            auth.verifyRefreshToken(token);
            const user = await UserRepository.findByRefreshToken(token);
            const { accessToken, refreshToken } =
                auth.createRefreshAndAccessToken(user);
            await UserRepository.setRefreshToken(user, refreshToken);
            return res.status(200).json({ accessToken, refreshToken });
        } catch (e) {
            next(e);
        }
    },
};
export default AuthController;
