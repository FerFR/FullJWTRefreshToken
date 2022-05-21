import 'dotenv/config';
import connectDatabase from '../database/connectDatabase';
import { URL_CONNECTION } from '../config/databaseConfig';
import { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } from '../config/authConfig';
import User from '../models/User';
import hash from '../utils/hash';
import mongoose from 'mongoose';

const createAdminUser = () => {
    connectDatabase(URL_CONNECTION!);
    mongoose.connection.once('open', async () => {
        const password = await hash.encryptPassword(ADMIN_PASSWORD!);
        const user = await User.create({
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            password,
            role: 'admin',
            emailConfirmed: true,
        });

        if (!user) {
            console.log('Admin User could not be created');
        } else {
            console.log('Admin user created');
        }

        process.exit();
    });
};
createAdminUser();
