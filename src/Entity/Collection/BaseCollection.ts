import * as CollectionActions from '../../Actions/Collection';
import CustomError from '../CustomError';

export default class BaseCollection {
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

    Get = async (): Promise<BaseCollection> => {
        return await CollectionActions.getCollection({ ...this });
    }

    SaveCollection = async () => {
        this.CreationDate = new Date(Date.now());
        await CollectionActions.createCollection({ ...this });
    }

    Update = async (Params: BaseCollection) => {
        this.UpdateDate = new Date(Date.now());
        await CollectionActions.updateCollection(Params);
    }

    Delete = async (force) => {
        await CollectionActions.deleteCollection({ ...this }, force);
    }

}
