import Joi from 'joi';
import JoiPasswordComplexity from 'joi-password-complexity';
import { IUserLoginRequest } from '../types/IUser';
import { BadRequest } from '../errors';

const UserLoginValidator = (userData: IUserLoginRequest['body']) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('email'),
        password: JoiPasswordComplexity().required().label('password'),
    });

    const result = schema.validate(userData);

    if (result.error?.message) {
        throw BadRequest('User login validation fails!');
    }
};

export default UserLoginValidator;
