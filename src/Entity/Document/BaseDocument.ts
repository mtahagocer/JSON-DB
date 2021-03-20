import * as DocumentActions from '../../Actions/Document';
import * as Helpers from '../../Helpers';
import CustomError from '../CustomError';

export default class BaseDocument {
    Id: string;
    CollectionName: string;
    CreationDate: Date;
    UpdateDate: Date;
    Params: Object = {};

    constructor(CollectionName: string, Params: Object) {
        if (!CollectionName) throw new CustomError('Collection Name is required');
        this.CollectionName = CollectionName;
        if (Params) {
            if (!Object.keys(Params).length) throw new CustomError('"Params" must be a object');
            this.Params = Params;
        }
    }

    Get = async (UserId: string, filter: Function) => {
        return await DocumentActions.getDocument(UserId, this.CollectionName, filter);
    }

    SaveDocument = async (UserId: string) => {
        this.CreationDate = new Date(Date.now());
        this.Id = Helpers.generateId();
        return await DocumentActions.createDocument(UserId, this.CollectionName, { ...this });
    }

    Update = async (UserId: string, Id: string, replace: boolean) => {
        if (!Id) throw new CustomError('Document Id is required');
        this.UpdateDate = new Date(Date.now());
        return await DocumentActions.updateDocument(UserId, this.CollectionName, { ...this }, replace);
    }

    Delete = async (UserId: string, filter: Function) => {
        return await DocumentActions.deleteDocument(UserId, this.CollectionName, filter);
    }

}
