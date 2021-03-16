import * as utils from '../../Utils';

export default class BaseDocument {
    Id: string;
    Name: string;
    CreationDate: Date;
    UpdateDate: Date;

    constructor() {
        this.CreationDate = new Date(Date.now());
    }

    Save = async () => {
        await utils.updateDocument({ ...this });
    }

    SaveDocument = async (documentRef: Object, CollectionName: string) => {
        console.log({ documentRef });
        if (!this.Name) {
            this.Id = utils.generateId();
            this.Name = documentRef.constructor.name;
            await utils.createDocument(CollectionName, this);
        }
    }
}
