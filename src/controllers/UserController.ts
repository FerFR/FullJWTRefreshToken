import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import UserLoginValidator from '../validators/UserLoginValidator';
import UserRegisterValidator from '../validators/UserRegisterValidator';
import hash from '../utils/hash';
import { IUserLoginRequest, IUserRegisterRequest } from '../types/IUser';
import auth from '../utils/auth';

const UserController = {
    async listAll(req: Request, res: Response) {
        const allUsers = await UserRepository.listAll();
        return res.status(200).json({ data: allUsers });
    },
    async login(req: IUserLoginRequest, res: Response, next: NextFunction) {
        try {
            UserLoginValidator(req.body);
            const { email, password } = req.body;
            const user = await UserRepository.findByEmailWithPassword(email);
            await hash.comparePasswords(password, user.password!);
            const { accessToken, refreshToken } =
                auth.createRefreshAndAccessToken(user);
            await UserRepository.setRefreshToken(user, refreshToken);
            user.password = undefined;
            return res
                .status(200)
                .json({ data: user, accessToken, refreshToken });
        } catch (e) {
            next(e);
        }
    },
    async register(
        req: IUserRegisterRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            UserRegisterValidator(req.body);
            const { name, email, password } = req.body;
            await UserRepository.failIfUserExistsByEmail(email);
            const hashedPassword = await hash.encryptPassword(password);
            const user = await UserRepository.create({
                name,
                email,
                password: hashedPassword,
            });
            const { accessToken, refreshToken } =
                auth.createRefreshAndAccessToken(user);
            await UserRepository.setRefreshToken(user, refreshToken);
            user.password = undefined;
            return res.status(201).json({
                message: 'User created successfully',
                data: user,
                accessToken,
                refreshToken,
            });
        } catch (e) {
            next(e);
        }
    },
};

export default UserController;
