import 'dotenv/config';
import * as uuid from 'uuid';
import Paths from '../Constants/Path';
import Types from '../Constants/Type';
import CustomError from '../Entity/CustomError';
import jwt from 'jsonwebtoken';

export const createToken = (data, expiresIn = process.env.JWT_EXPIRE_TIME) => new Promise((resolve, reject) => {
    jwt.sign(data, process.env.JWT_SECRET, {
        algorithm: process.env.JWT_ALGORITHM,
        ...(expiresIn ? ({ expiresIn: expiresIn }) : {})
    }, (err, token) => {
        if (err) return reject(err);
        return resolve(token);
    });
});

export const required = (message, status) => {
    throw new CustomError(message, status);
};

export const generateId = () => uuid.v4();

export const isProduction = process.env.NODE_ENV === 'production';

export const stringify = (data) => JSON.stringify(data, null, isProduction ? 0 : 2);


export const dbPath = (path) => `${Paths.db}/${path}`;

export const filterByPatch = (Patch, DeepEquality) => (dbData) => {

    const keys = Object.keys;
    const is = (first, second) => first !== undefined && second !== undefined;
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
        // x === y && console.log({ x, y });
        return x === y;
    })();
};

export const filterByKeyAndValue = (KeyList, ValueList) => (strict = true) => (dbData) => {
    let isMatch = !strict;
    KeyList.forEach((key) => {
        if (ValueList.indexOf(dbData[key]) !== -1) isMatch = strict;
    });

    return isMatch;
};

export const checkType = (data, type) => {
    if (!Types[type](data)) throw new CustomError(`For ${JSON.stringify(data)} expected type have to be ${type}!`);
    return true;
};
