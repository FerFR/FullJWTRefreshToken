import Joi from 'joi';
import JoiPasswordComplexity from 'joi-password-complexity';
import { IUserRegisterRequest } from '../types/IUser';
import { BadRequest } from '../errors';

const UserRegisterValidator = (userData: IUserRegisterRequest['body']) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(30).required().label('name'),
        email: Joi.string().email().required().label('email'),
        password: JoiPasswordComplexity().required().label('password'),
    });

    const result = schema.validate(userData);

    if (result.error?.message) {
        throw BadRequest('User register validation fails!');
    }
};

export default UserRegisterValidator;
