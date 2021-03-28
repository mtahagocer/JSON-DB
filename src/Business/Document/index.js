import fs from '../../Service/File';
import { getCollectionPath, controlCollection } from '../Collection';
import { stringify } from '../../Helpers';
import CustomError from '../../Entity/CustomError';
import { filterByPatch, filterByKeyAndValue } from '../../Helpers';
import { SearchTypes } from '../../Constants/Business';
export const getDocumentPath = (UserId, CollectionName) => `${getCollectionPath(UserId, CollectionName)}/data.json`;

const _writeDocument = async (UserId, CollectionName, Document) => await fs.writeFile(getDocumentPath(UserId, CollectionName), stringify(Document));

export const getDocument = async (UserId, CollectionName, filter) => {
    if (await controlCollection(UserId, CollectionName)) {
        let data = await fs.readFile(getDocumentPath(UserId, CollectionName));

        if (filter) {
            data = data.filter(filter);
        }
        return data;
    }
};

export const createDocument = async (UserId, CollectionName, Document) => {
    const prev = await getDocument(UserId, CollectionName);
    const newData = [...prev, Document];
    await _writeDocument(UserId, CollectionName, newData);
    return Document;
};

export const updateDocument = async (UserId, CollectionName, Document, Replace = false) => {
    let prev = await getDocument(UserId, CollectionName);
    const docIndex = await prev.findIndex((user) => user._Id === Document._Id);

    if (docIndex === -1) throw new Error(`There is no Document with Id ${Document._Id}`);

    if (Replace) {
        prev[docIndex] = {
            ...Document,
            _CreationDate: prev[docIndex]._CreationDate,
        };
    } else {
        prev[docIndex].Data = {
            ...prev[docIndex],
            ...Document,
            _CreationDate: prev[docIndex]._CreationDate,
        };
    }

    await _writeDocument(UserId, CollectionName, prev);
    return prev[docIndex];
};

export const deleteDocument = async (UserId, CollectionName, filter) => {
    let data = await getDocument(UserId, CollectionName);
    const dataLength = data.length;
    const filtered = await data.filter(filter);
    await _writeDocument(UserId, CollectionName, filtered);

    return dataLength - filtered.length;
};

export const handleFilterAlgorithm = (SearchType, Patch, Strict, KeyList, ValueList) => {

    switch (SearchType) {

        case SearchTypes[0]: {
            if ((!Patch || !Object.keys(Patch).length || typeof Patch !== 'object' || Array.isArray(Patch))) throw new CustomError(`Patch must be a object and required for ${SearchTypes[0]}`);

            return filterByPatch(Patch, false);
        }

        case SearchTypes[1]: {
            if ((!Patch || !Object.keys(Patch).length || typeof Patch !== 'object' || Array.isArray(Patch))) throw new CustomError(`Patch must be a object and required for ${SearchTypes[1]}`);

            return filterByPatch(Patch, true);
        }

        case SearchTypes[2]: {
            if (!KeyList && !ValueList) throw new CustomError(`KeyList and ValueList required for ${SearchTypes[2]}`);
            if ((!Array.isArray(KeyList)) || (!Array.isArray(ValueList))) throw new CustomError('"KeyList" and "ValueList" must be a array');
            if (KeyList.some((item) => typeof item !== 'string')) throw new CustomError('"KeyList items" must be a string object key.');
            if (Strict !== undefined && typeof Strict !== 'boolean') throw new CustomError('"Strict" must be a boolean');

            return filterByKeyAndValue(KeyList, ValueList)(Strict);
        }

        default: throw new CustomError(`Avaliable search types ${SearchTypes.join(' ')}`);
    }
};
