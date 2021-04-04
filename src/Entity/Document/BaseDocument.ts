import * as DocumentActions from '../../Business/Document';
import * as Helpers from '../../Helpers';
import CustomError from '../CustomError';

export default class BaseDocument { 
    // TODO: process test for new embeded user
    // TODO: delete process for bigdata
    static _Id: string;
    static _CreationDate: Date;
    static _UpdateDate: Date;

    static Save = async (UserId: string, CollectionName: string, Document: BaseDocument): Promise<BaseDocument> => {
        if (!Object.keys(Document).length) throw new CustomError('"Document" must be a object');
        BaseDocument._CreationDate = new Date(Date.now());
        BaseDocument._UpdateDate = new Date(Date.now());
        BaseDocument._Id = Helpers.generateId();
        return await DocumentActions.createDocument(UserId, CollectionName, { ...Document, ...BaseDocument });
    }

    static Get = async (UserId: string, CollectionName: string, filter: Function): Promise<any> => {
        return await DocumentActions.getDocument(UserId, CollectionName, filter);
    }

    static Update = async (UserId: string, CollectionName: string, Document, Replace: boolean): Promise<BaseDocument> => {
        if (!Document._Id) throw new CustomError('Document _Id is required');
        return await DocumentActions.updateDocument(UserId, CollectionName, { ...Document, _UpdatedDate: new Date(Date.now()) }, Replace);
    }

    static Delete = async (UserId: string, CollectionName: string, filter: Function): Promise<Number> => {
        return await DocumentActions.deleteDocument(UserId, CollectionName, filter);
    }

}
