import * as uuid from 'uuid';
import paths from '../Constants/Path';
import fs from '../Services/File';
export const generateId = () => uuid.v4();

// #region entity

export const getCollectionPath = (Name, Id) => `${Name}-${Id}`;

export const getDocumentPath = (CollectionName, DocumentName) => `${CollectionName}/${DocumentName}`;

export const createCollection = async (CollectionName, CollectionId) => {
    await fs.checkDirectory(`${paths.db}/${getCollectionPath(CollectionName, CollectionId)}`);
};

export const createDocument = async (CollectionName, DocumentName) => {
    await fs.checkDirectory(getDocumentPath(CollectionName, DocumentName));
};

export const updateDocument = async (Document) => {
    await createDocument(Document.Collection, Document.Name);
    await fs.writeFile(getDocumentPath(Document.Collection, Document.Name), { ...Document });
};

export const updateCollection = async (Collection) => {
    await createCollection(Collection.Name);
    await fs.writeFile(getCollectionPath(Collection.Name, Collection.Id));
};

// #endregion
