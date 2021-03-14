import * as utils from '../../Utils';

export default class BaseDocument {
    Id: string;
    Name: string;
    CreationDate: Date;
    UpdateDate: Date;
    Collection: string;

    Save = async () => {
        await utils.updateDocument({ ...this });
    }
    constructor(props: Record<string, any>) {
        Object.keys(props).map((key) => {
            this[key] = props[key];
        });

        this.Collection = props.Collection.Name;
        this.Id = utils.generateId();
        this.Name = props.Name;
        this.CreationDate = new Date(Date.now());

        this.Save.bind(this);
    }
}
