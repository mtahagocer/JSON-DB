import * as uuid from 'uuid';
import paths from '../Constants/Path';
import CustomError from '../Entity/CustomError';

export const required = (message, status) => {
    throw new CustomError(message, status);
};

export const generateId = () => uuid.v4();

export const stringify = (data) => JSON.stringify(data, null, 1);

export const dbPath = (path) => `${paths.db}/${path}`;

