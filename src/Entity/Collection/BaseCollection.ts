import * as utils from '../../Utils';
import BaseDocument from '../Document/BaseDocument';

export default class BaseCollection {
    private Id: string;
    private Name: string;
    Documents: Record<string, BaseDocument>

    Save = async () => {
        this.Id = utils.generateId();
        await utils.updateCollection({ ...this.Documents });
    }

    constructor(Name: string) {
        this.Name = Name;
    }
}
