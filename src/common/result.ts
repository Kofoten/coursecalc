interface SuccessResult<T> {
    success: true;
    data: T;
}

interface ErrorResult {
    success: false;
    error: string;
}

export type Result<T> = SuccessResult<T> | ErrorResult;

export const error = (message: string): ErrorResult => ({
    success: false,
    error: message,
});

export const success = <T>(data: T): SuccessResult<T> => ({
    success: true,
    data,
});
