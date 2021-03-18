import fs from '../Services/File';
import asyncHandler from 'express-async-handler';
import { getCollectionPath } from '../Collection';
import { dbPath, stringify } from '../../Helpers';

export const getDocumentFolderPath = (CollectionName, DocumentName) => dbPath(`${CollectionName}/${DocumentName}`);

export const getDocumentPath = (CollectionName, DocumentName, DocumentId) => dbPath(`${CollectionName}/${DocumentName}/${DocumentId}.json`);

export const createDocument = asyncHandler(async (CollectionName, Document) => {
    await fs.checkDirectory(getDocumentFolderPath(CollectionName, Document.Name));
    await fs.writeFile(getDocumentPath(CollectionName, Document.Name, Document.Id), stringify(Document));
});

export const updateDocument = asyncHandler(async (Document) => {
    await fs.writeFile(getDocumentPath(Document.Collection, Document.Name, Document.Id), stringify(Document));
});

export const addDocument = asyncHandler(async (Collection, Document) => {
    await fs.writeFile(dbPath(`${getCollectionPath(Collection.Name, Collection.Id)}`, stringify(Document)));
});

