import User from '../models/User';
import { IUser, IUserDocument } from '../types/IUser';
import { BadRequest, InternalServerError, Unauthorizated } from '../errors';
const UserRepository = {
    async listAll() {
        const allUsers = await User.find();
        return allUsers;
    },
    async findByEmailWithPassword(email: IUser['email']) {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            throw BadRequest('User not exists');
        }

        return user;
    },
    async failIfUserExistsByEmail(email: IUser['email']) {
        const user = await User.findOne({ email });

        if (user) {
            throw BadRequest('User already exists');
        }
    },
    async create(userData: IUser) {
        const user = await User.create(userData);

        if (!user) {
            throw InternalServerError('User can not be created now');
        }

        return user;
    },
    async setRefreshToken(user: IUserDocument, refreshToken: string) {
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { refreshToken },
            { new: true }
        ).select('+refreshToken');

        if (!updatedUser || updatedUser.refreshToken !== refreshToken) {
            throw InternalServerError(
                'Can not set refresh token for this user'
            );
        }
    },
    async findByRefreshToken(refreshToken: string) {
        const user = await User.findOne({ refreshToken });
        if (!user) {
            throw Unauthorizated('You are not authenticated')
        }
        return user
    },
};

export default UserRepository;
