import * as uuid from 'uuid';
import paths from '../Constants/Path';
import CustomError from '../Entity/CustomError';

export const required = (message, status) => {
    throw new CustomError(message, status);
};

export const generateId = () => uuid.v4();

export const stringify = (data) => JSON.stringify(data, null, 2);

export const dbPath = (path) => `${paths.db}/${path}`;

export const deepEqual = (x, y) => {
    const keys = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        keys(x).length === keys(y).length && keys(x).every((key) =>
            deepEqual(x[key], y[key]))
    ) : (x === y);
};

export const someEqual = (x, y, excludeKeyList = []) => {
    const keys = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        keys(x).some((key) => excludeKeyList.indexOf(key) === -1 && deepEqual(x[key], y[key]))
    ) : (() => {
        // TODO: logger
        x === y && console.log({ x, y });
        return x === y;
    })();
};

const keys = Object.keys;
const is = (first, second) => first !== undefined && second !== undefined;

export const filterByPatch = (Patch, DeepEquality) => (dbData) => {
    let isMatch = false;
    keys(Patch).forEach((key) => {
        const dbObject = dbData[key] || {};
        const patchObject = Patch[key] || {};

        if (DeepEquality) {
            if (deepEqual(dbData, Patch)) isMatch = true;
        } else if (is(dbObject, patchObject)) {
            if (someEqual(patchObject, dbObject)) isMatch = true;
        }

    });
    return isMatch;
};
