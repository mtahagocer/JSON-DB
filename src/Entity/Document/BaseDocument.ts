import * as DocumentActions from '../../Actions/Document';
import * as Helpers from '../../Helpers';
import CustomError from '../CustomError';

export default class BaseDocument {
    static _Id: string;
    static _CreationDate: Date;
    static _UpdateDate: Date;
    static Data: Object;

    static Get = async (UserId: string, CollectionName: string, filter: Function) => {
        return await DocumentActions.getDocument(UserId, CollectionName, filter);
    }

    static Save = async (UserId: string, CollectionName: string, Data: Object) => {
        if (!Object.keys(Data).length) throw new CustomError('"Data" must be a object');
        BaseDocument.Data = Data;
        BaseDocument._CreationDate = new Date(Date.now());
        BaseDocument._Id = Helpers.generateId();
        return await DocumentActions.createDocument(UserId, CollectionName, { ...BaseDocument });
    }

    static Update = async (UserId: string, CollectionName: string, Document) => {
        if (!Document._Id) throw new CustomError('Document _Id is required');
        return await DocumentActions.updateDocument(UserId, CollectionName, { ...Document, _UpdatedDate: new Date(Date.now()) });
    }

    static Delete = async (UserId: string, CollectionName: string, filter: Function) => {
        return await DocumentActions.deleteDocument(UserId, CollectionName, filter);
    }

}
