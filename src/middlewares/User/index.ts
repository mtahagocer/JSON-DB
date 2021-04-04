import jwt from 'jsonwebtoken';
import BaseUser from '../../Entity/User';
import 'dotenv/config';
import CustomError from '../../Entity/CustomError';

const _decode = async (token: string): Promise<any> => {
    return await jwt.verify(process.env.JWT_BEARER_USAGE ? token.slice(7) : token,
        process.env.JWT_SECRET);
};

export default async function extractUser(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const { _Id } = await _decode(token);
        req.User = await new BaseUser(_Id).Get();
        if (!req.User) throw new CustomError('User not found');
    }
    next();
}
