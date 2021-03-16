import * as utils from '../../Utils';
import BaseDocument from '../Document/BaseDocument';

export default class BaseCollection {
    private Id: string;
    private Name: string;
    Documents: Array<BaseDocument> = [];

    private CreationDate: Date;
    private UpdateDate: Date;

    constructor() {
        this.Id = utils.generateId();
        this.CreationDate = new Date(Date.now());
    }

    Save = async () => {
        await utils.updateCollection({ ...this });
    }

    SaveCollection = async (collectionRef: Object) => {
        if (!this.Name) {
            this.Name = collectionRef.constructor.name;
            await utils.createCollection(this.Name);

            await this.Documents.map(async (item) => {
                item.Id = utils.generateId();
                item.CreationDate = new Date(Date.now());
                await item.SaveDocument(item, this.Name);
            });
        }
    }

    addDocument = async (Document: BaseDocument) => {
        if (this.Documents.find((document) => document.Name === Document.Name)) throw new Error(`There is a already Document with ${Document.Name} name`);
        this.Documents.push(Document);
    }

}
