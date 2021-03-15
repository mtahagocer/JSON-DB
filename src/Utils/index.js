import * as uuid from 'uuid';
import paths from '../Constants/Path';
import fs from '../Services/File';
export const generateId = () => uuid.v4();

export const stringify = (data) => JSON.stringify(data, null, 1);

export const dbPath = (path) => `${paths.db}/${path}`;

// #region entity

export const getCollectionPath = (Name, Id) => dbPath(`${Name}-${Id}`);

export const getDocumentPath = (CollectionName, DocumentName) => dbPath(`${CollectionName}/${DocumentName}.json`);

export const createCollection = async (CollectionName, CollectionId) => {
    await fs.checkDirectory(getCollectionPath(CollectionName, CollectionId));
};

export const createDocument = async (CollectionName, DocumentName) => {
    await fs.checkDirectory(getDocumentPath(CollectionName, DocumentName));
};

export const updateDocument = async (Document) => {
    await createDocument(Document.Collection, Document.Name);
    await fs.writeFile(getDocumentPath(Document.Collection, Document.Name), stringify(Document));
};

export const updateCollection = async (Collection) => {
    await fs.writeFile(`${getCollectionPath(Collection.Name, Collection.Id)}/index.json`, stringify(Collection));
};

export const addDocument = async (Collection, Document) => {
    await fs.writeFile(dbPath(`${getCollectionPath(Collection.Name, Collection.Id)}`, stringify(Document)));
};

// #endregion
