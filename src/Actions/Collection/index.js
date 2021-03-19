import fs from '../../Services/File';
import CustomError from '../../Entity/CustomError';
import asyncHandler from 'express-async-handler';
import { dbPath, stringify } from '../../Helpers';

export const getCollectionPath = (UserId, Name) => dbPath(`${UserId}/${Name}`);

export const controlCollection = asyncHandler(async (UserId, CollectionName) => {
    if (await !fs.isExist(getCollectionPath(UserId, CollectionName))) throw new CustomError(`There is not any Collection with Name = ${CollectionName}`);
    return true;
});

export const getCollectionFilePath = (UserId, Name) => dbPath(`${UserId}/${Name}/index.json`);

export const createCollection = asyncHandler(async (Collection) => {
    if (fs.isExist(getCollectionPath(Collection.UserId, Collection.Name))) throw new CustomError(`There is a already Collection with Name = ${Collection.Name}`);

    await fs.checkDirectory(getCollectionPath(Collection.UserId, Collection.Name));
    await fs.writeFile(getCollectionFilePath(Collection.UserId, Collection.Name), stringify(Collection));
    await fs.writeFile(`${getCollectionPath(Collection.UserId, Collection.Name)}/data.json`, stringify([]));
});

export const getCollection = asyncHandler(async (Collection) => {
    await controlCollection(Collection.UserId, Collection.Name);
    return await fs.readFile(getCollectionFilePath(Collection.UserId, Collection.Name)).then((data) => {
        return data;
    }).catch((err) => {
        throw new CustomError(err.message);
    });
});

export const updateCollection = asyncHandler(async (Collection) => {
    await fs.writeFile(getCollectionFilePath(Collection.Name, Collection.Id), stringify(Collection));
});

export const deleteCollection = asyncHandler(async (Collection, force) => {
    await controlCollection(Collection.UserId, Collection.Name);
    await fs.deleteFile(getCollectionPath(Collection.UserId, Collection.Name), force).catch((err) => {
        throw new CustomError(err.message);
    });
});
