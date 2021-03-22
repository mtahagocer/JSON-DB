import * as DocumentActions from '../../Actions/Document';
import * as Helpers from '../../Helpers';
import CustomError from '../CustomError';

export default class BaseDocument {
    static _Id: string;
    static CreationDate: Date;
    static UpdateDate: Date;
    static Params: Object;

    get Params(): Object {
        return BaseDocument.Params;
    }

    static Get = async (UserId: string, CollectionName: string, filter: Function) => {
        return await DocumentActions.getDocument(UserId, CollectionName, filter);
    }

    static Save = async (UserId: string, CollectionName: string, Params: Object) => {
        if (!Object.keys(Params).length) throw new CustomError('"Params" must be a object');
        BaseDocument.CreationDate = new Date(Date.now());
        BaseDocument._Id = Helpers.generateId();
        return await DocumentActions.createDocument(UserId, CollectionName, { ...BaseDocument.Params, ...BaseDocument });
    }

    static Update = async (UserId: string, CollectionName: string, _Id: string, replace: boolean) => {
        if (!_Id) throw new CustomError('Document _Id is required');
        BaseDocument.UpdateDate = new Date(Date.now());
        return await DocumentActions.updateDocument(UserId, CollectionName, { ...BaseDocument }, replace);
    }

    static Delete = async (UserId: string, CollectionName: string, filter: Function) => {
        return await DocumentActions.deleteDocument(UserId, CollectionName, filter);
    }

}
