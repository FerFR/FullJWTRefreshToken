import 'dotenv/config';
import connectDatabase from '../database/connectDatabase';
import mongoose from 'mongoose';
import { URL_CONNECTION } from '../config/databaseConfig';

const clearDatabase = () => {
    connectDatabase(URL_CONNECTION!);
    mongoose.connection.once('open', async () => {
        await mongoose.connection.db.dropDatabase();
        console.log('Database cleared');
        process.exit();
    });
};

clearDatabase();
