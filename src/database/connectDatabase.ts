import mongoose from 'mongoose';
import { URL_CONNECTION } from '../config/databaseConfig';

const connectDatabase = (url: string = URL_CONNECTION!) => {
    mongoose
        .connect(url)
        .then(() => console.log('DB Connected'))
        .catch((e) => console.log(e));
};

export default connectDatabase;
