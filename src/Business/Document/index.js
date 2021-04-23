import fs from '../../Service/File';
import { getCollectionPath, controlCollection } from '../Collection';
import { stringify } from '../../Helpers';
import CustomError from '../../Entity/CustomError';
import { filterByPatch, filterByKeyAndValue, deepEqual } from '../../Helpers';
import { SearchTypes } from '../../Constants/Business';
import { TypeChecker } from '../../Entity/Concrete/RuntimeTyping';
import SingletonContainer from '../../Service/Singleton';

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

    if (docIndex === -1) throw new Error(`There is no Document with Id ${Document._Id}`, 404);

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

export const deleteDocument = async (UserId, CollectionName, patch) => {
    let data = await getDocument(UserId, CollectionName);
    const dataLength = data.length;
    const filtered = await data.filter((d) => !deepEqual(d, patch));

    await _writeDocument(UserId, CollectionName, filtered);

    return dataLength - filtered.length;
};

export const handleFilterAlgorithm = ({ SearchType, Patch, Strict, KeyList, ValueList }) => {
    const typer = SingletonContainer.get('typer');
    TypeChecker.Check(typer.type({ // TODO: return typer callback
        SearchType: typer.string
    }), { SearchType });

    const _condition = (!Patch || !Object.keys(Patch).length || typeof Patch !== 'object' || Array.isArray(Patch));
    switch (SearchType) {

        case SearchTypes.Patch: {
            if (_condition) throw new CustomError(`Patch must be a object and required for ${SearchTypes.Patch}`);

            return filterByPatch(Patch, false);
        }

        case SearchTypes.DeepPatch: {
            if (_condition) throw new CustomError(`Patch must be a object and required for ${SearchTypes.DeepPatch}`);

            return filterByPatch(Patch, false);
        }

        case SearchTypes.KeyValue: {
            if (!KeyList && !ValueList) throw new CustomError(`KeyList and ValueList required for ${SearchTypes.KeyValue}`);
            if ((!Array.isArray(KeyList)) || (!Array.isArray(ValueList))) throw new CustomError('"KeyList" and "ValueList" must be a array');
            if (KeyList.some((item) => typeof item !== 'string')) throw new CustomError('"KeyList items" must be a string object key.');
            if (Strict !== undefined && typeof Strict !== 'boolean') throw new CustomError('"Strict" must be a boolean');

            return filterByKeyAndValue(KeyList, ValueList)(Strict);
        }

        default: throw new CustomError(`Avaliable search types ${SearchTypes.join(' ')}`);
    }
};
