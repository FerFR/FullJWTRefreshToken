import bcrypt from 'bcrypt';
import { IUser } from '../types/IUser';
import { BadRequest } from '../errors';
import { ROUNDS } from '../config/hashConfig';
const hash = {
    async comparePasswords(
        password: IUser['password'],
        hashedPassword: IUser['password']
    ) {
        const samePassword = await bcrypt.compare(password, hashedPassword);

        if (!samePassword) {
            throw BadRequest('Wrong user email or password');
        }
    },
    async encryptPassword(password: IUser['password']): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, ROUNDS);
        return hashedPassword;
    },
};

export default hash;
