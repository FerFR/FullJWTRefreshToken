import { Request, Response, NextFunction } from 'express';
import { IErrorResponse } from '../types/IError';
const customErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err.type && err.type === 'custom') {
        const errorResponse: IErrorResponse = {
            error: true,
            message: err.message,
        };
        return res.status(err.status).json(errorResponse);
    }
    next(err);
};

export default customErrorHandler;
