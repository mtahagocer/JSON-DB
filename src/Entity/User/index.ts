import * as UserActions from '../../Business/User';
import * as Helpers from '../../Helpers';
import CustomError from '../CustomError';

export default class DBUser { // TODO: embed other class functions to here
    _Id: string;
    _CreationDate: Date;
    _UpdatedDate: Date;
    UserName: string;
    Password: string;
    Collections: Array<string> = [];
    Blocked: Boolean = false;

    constructor(_Id?: string) {
        if (_Id) this._Id = _Id;
    }

    CreateToken = async (): Promise<string> => {
        return await Helpers.createToken({ _Id: this._Id });
    }

    Save = async ({ Password, UserName }): Promise<DBUser> => {
        if (!UserName) throw new CustomError('"UserName" is required');
        if (!Password) throw new CustomError('"Password" is required');
        this._Id = Helpers.generateId();
        this._CreationDate = new Date(Date.now());
        this.UserName = UserName;
        this.Password = Password;
        await UserActions.createUser({ ...this });
        return { ...this };
    }

    Login = async ({ Password, UserName }): Promise<string> => {
        if (!UserName) throw new CustomError('"UserName" is required');
        if (!Password) throw new CustomError('"Password" is required');
        return await UserActions.getUsers((user: DBUser) => user.Password === Password && user.UserName === UserName).
            then(async (users: Array<DBUser>) => {
                if (!users.length) throw new CustomError('Wrong credentials!');
                this._Id = users[0]._Id;
                return await this.CreateToken();
            });
    }

    Get = async (): Promise<DBUser> => {
        if (!this._Id) throw new CustomError('User Id is required');
        const _user = await UserActions.getUsers((user: DBUser) => user._Id === this._Id).then((users) => users[0]);
        if (!_user) throw new CustomError('User not found');
        this.UserName = _user.UserName;
        this._CreationDate = _user._CreationDate;
        this._UpdatedDate = _user._UpdatedDate;
        this.Collections = _user.Collections;
        return this;
    }

    Update = async (Password: string): Promise<DBUser> => {
        if (!this._Id) throw new CustomError('User Id is required');
        this._UpdatedDate = new Date(Date.now());
        this.Password = Password;
        return await UserActions.updateUser({ ...this });
    }

    Delete = async (Force: Boolean): Promise<any> => {
        this._UpdatedDate = new Date(Date.now());
        await UserActions.deleteUser({ ...this }, Force);
    }

}
