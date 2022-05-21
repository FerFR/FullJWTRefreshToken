import { Request, Response } from 'express';

const genericErrorHandler = (err: Error, req: Request, res: Response) => {
    return res.status(500).json({ message: err.message });
};

export default genericErrorHandler;
