export interface IError {
    type: 'custom';
    status: number;
    message: string;
}

export interface IErrorResponse extends Omit<IError, 'type' | 'status'> {
    error: true;
}
