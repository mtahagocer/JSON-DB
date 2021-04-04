import * as CollectionActions from '../../Business/Collection';
import CustomError from '../CustomError';
import BaseDocument from '../Document/BaseDocument';

export default class BaseCollection { // TODO: export default new instance
    private Name: string;
    DocumentCount: number = 0;

    private CreationDate: Date;
    private UpdateDate: Date;
    private UserId: string;

    constructor({ UserId, Name = '' }: BaseCollection) {
        if (!Name) throw new CustomError('Collection Name is required');

        this.Name = Name;
        this.UserId = UserId;
    }

    // #region collection

    Save = async () => {
        this.CreationDate = new Date(Date.now());
        await CollectionActions.createCollection({ ...this });
    }

    Get = async (): Promise<BaseCollection> => {
        return await CollectionActions.getCollection({ ...this });
    }

    Update = async (Params: BaseCollection) => {
        this.UpdateDate = new Date(Date.now());
        return await CollectionActions.updateCollection(Params);
    }

    Delete = async (force) => {
        await CollectionActions.deleteCollection({ ...this }, force);
    }

    // #endregion

    // #region document

    SaveDocument = async (Document: Object) => {
        return await BaseDocument.Save(this.UserId, this.Name, Document);
    }

    GetDocument = async (filter?: Function) => {
        return await BaseDocument.Get(this.UserId, this.Name, filter);
    }

    UpdateDocument = async (Document: BaseDocument, Replace: boolean) => {
        return await BaseDocument.Update(this.UserId, this.Name, Document, Replace);
    }

    DeleteDocument = async (filter: Function) => {
        return await BaseDocument.Delete(this.UserId, this.Name, filter);
    }

    // #endregion
}
