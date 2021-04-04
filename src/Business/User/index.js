import fs from '../../Service/File';
import CustomError from '../../Entity/CustomError';
import { dbPath, stringify } from '../../Helpers';
import * as validator from 'validator';
export const usersPath = dbPath('users.json');

const _writeUser = async (data) => await fs.writeFile(usersPath, data);

export const getUsers = async (filter) => {
    await fs.checkFile(usersPath, []);

    let users = await fs.readFile(usersPath);
    if (filter) {
        users = await users.filter(filter);
    }

    return users;
};

export const createUser = async (User) => {
    const options = { min: 5, max: 8 };
    if (!validator.isLength(User.UserName, options) || !validator.isLength(User.Password, options))
        throw new CustomError(`UserName and Password must be ${stringify(options)}`);
    const _users = await getUsers();
    if (_users.findIndex((user) => user.UserName === User.UserName) !== -1) throw new CustomError(`UserName : ${User.UserName} is already in use`);
    await _writeUser(stringify([..._users, User]));
};

export const updateUser = async (User) => {
    const _users = await getUsers();
    const userIndex = await _users.findIndex((user) => user._Id === User._Id);
    if (userIndex === -1) throw new CustomError(`There is not any user with ${User._Id} Id.`);

    _users[userIndex] = User;
    await _writeUser(stringify([..._users]));

    return _users[userIndex];
};

export const deleteUser = async (Id) => {
    const _users = await getUsers();
    const userIndex = await _users.findIndex((user) => user._Id === Id);
    if (userIndex === -1) throw new CustomError(`There is not any user with ${Id} Id.`);

    await _writeUser(stringify(_users));
};
