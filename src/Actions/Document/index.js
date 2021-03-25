import fs from '../../Services/File';
import asyncHandler from 'express-async-handler';
import { getCollectionPath, controlCollection } from '../Collection';
import { stringify } from '../../Helpers';

export const getDocumentPath = (UserId, CollectionName) => `${getCollectionPath(UserId, CollectionName)}/data.json`;

export const getDocument = asyncHandler(async (UserId, CollectionName, filter) => {
    if (await controlCollection(UserId, CollectionName)) {
        let data = await fs.readFile(getDocumentPath(UserId, CollectionName));

        if (filter) {
            data = data.filter(filter);
        }
        return data;
    }
});

export const createDocument = asyncHandler(async (UserId, CollectionName, Document) => {
    const prev = await getDocument(UserId, CollectionName);
    const newData = [...prev, Document];
    await fs.writeFile(getDocumentPath(UserId, CollectionName), stringify(newData));
    return Document;
});

export const updateDocument = asyncHandler(async (UserId, CollectionName, Document) => {
    let prev = await getDocument(UserId, CollectionName);
    let _updated;
    if (!prev.find((item) => item._Id === Document._Id)) throw new Error(`There is no Document with Id ${Document._Id}`);

    await prev.map((doc) => {
        if (doc._Id === Document._Id) {
            doc._UpdatedDate = Document._UpdatedDate;
            delete Document._Id;
            delete Document._UpdatedDate;
            doc.Data = { ...doc.data, ...Document };
            _updated = { ...doc };
        }
    });

    await fs.writeFile(getDocumentPath(UserId, CollectionName), stringify(prev));
    return _updated;
});

export const deleteDocument = asyncHandler(async (UserId, CollectionName, filter) => {
    let data = await getDocument(UserId, CollectionName);
    const dataLength = data.length;
    const filtered = await data.filter(filter);
    await fs.writeFile(getDocumentPath(UserId, CollectionName), stringify(filtered));

    return dataLength - filtered.length;
});
