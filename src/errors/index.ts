import { IError } from '../types/IError';

export const BadRequest = (message: string): IError => {
    return {
        status: 400,
        message,
        type: 'custom',
    };
};
export const InternalServerError = (message: string): IError => {
    return {
        status: 500,
        message,
        type: 'custom',
    };
};
export const Forbidden = (message: string): IError => {
    return {
        status: 403,
        message,
        type: 'custom',
    };
};
export const Unauthorizated = (message: string): IError => {
    return {
        status: 401,
        message,
        type: 'custom',
    };
};
