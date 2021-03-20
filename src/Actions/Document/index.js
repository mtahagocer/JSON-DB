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

export const updateDocument = asyncHandler(async (UserId, CollectionName, Document, replace = false) => {
    let prev = await getDocument(UserId, CollectionName);
    if (!prev.find((item) => item.Id === Document.Id)) throw new Error(`There is no Document with Id ${Document.Id}`);

    await prev.map((doc) => {
        if (doc.Id === Document.Id) {
            if (replace) {
                doc.params = Document.params;
            } else {
                doc.params = { ...doc.params, ...Document.params };
            }
        }
    });

    await fs.writeFile(getDocumentPath(UserId, CollectionName), stringify(prev));
});

export const deleteDocument = asyncHandler(async (UserId, CollectionName, filter) => {
    let data = await getDocument(UserId, CollectionName);
    const filtered = await data.filter(filter(false));
    const deleted = await data.filter(filter());
    await fs.writeFile(getDocumentPath(UserId, CollectionName), stringify(filtered));
    return deleted;
});
