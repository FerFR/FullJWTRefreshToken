import express from 'express';
import 'dotenv/config';
import { PORT } from './config/serverConfig';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import connectDatabase from './database/connectDatabase';
import customErrorHandler from './middlewares/customErrorHandler';
import genericErrorHandler from './middlewares/genericErrorHandler';

const app = express();

connectDatabase();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(customErrorHandler);
app.use(genericErrorHandler);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
