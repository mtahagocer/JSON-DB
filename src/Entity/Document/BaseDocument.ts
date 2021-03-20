import * as DocumentActions from '../../Actions/Document';
import * as Helpers from '../../Helpers';
import CustomError from '../CustomError';

export default class BaseDocument {
    Id: string;
    CollectionName: string;
    Name: string;
    CreationDate: Date;
    UpdateDate: Date;
    Params: Object = {};

    constructor({ CollectionName, Params }: BaseDocument) {
        if (!CollectionName) throw new CustomError('Collection Name is required');
        this.CollectionName = CollectionName;
        if (Params) this.Params = Params;
    }

    Get = async (UserId: string, filter: Function) => {
        return await DocumentActions.getDocument(UserId, this.CollectionName, filter);
    }

    SaveDocument = async (UserId, Name: string) => {
        this.CreationDate = new Date(Date.now());
        this.Id = Helpers.generateId();
        this.Name = Name;
        return await DocumentActions.createDocument(UserId, this.CollectionName, { ...this });
    }

    Update = async (UserId: string, Id: string, replace: boolean) => {
        if (!Id) throw new CustomError('Document Id is required');
        this.UpdateDate = new Date(Date.now());
        await DocumentActions.updateDocument(UserId, this.CollectionName, { ...this }, replace);
    }

    Delete = async (UserId: string, Id: string) => {
        if (!Id) throw new CustomError('Document Id is required');
        await DocumentActions.deleteDocument(UserId, this.CollectionName, this.Id);
    }

}
