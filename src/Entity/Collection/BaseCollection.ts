import * as utils from '../../Utils';
import BaseDocument from '../Document/BaseDocument';
import CustomError from '../CustomError';
export default class BaseCollection {
    private Name: string;
    Documents: Array<BaseDocument>

    private CreationDate: Date;
    private UpdateDate: Date;
    private UserId: string;

    constructor({ UserId, Name = '', Documents = [] }: BaseCollection) {
        if (!Name) throw new CustomError('Collection Name is required');

        this.Name = Name;
        this.Documents = Documents;
        this.UserId = UserId;
    }

    Get = async () => {
        return await utils.getCollection({ ...this });
    }

    SaveCollection = async () => {
        this.CreationDate = new Date(Date.now());
        await utils.createCollection({ ...this });
        this.Documents.map(async (item) => {
            item.Id = utils.generateId();
            item.CreationDate = new Date(Date.now());
            await item.SaveDocument(item, this.Name);
        });
    }

    Update = async () => {
        await utils.updateCollection({ ...this });
    }

    Delete = async (force) => {
        await utils.deleteCollection({ ...this }, force);
    }

    addDocument = async (Document: BaseDocument) => {
        this.Documents.push(Document);
    }

}
