import jwt from 'jsonwebtoken';
import BaseUser from '../../Entity/User';

const decode = async (token: string): Promise<any> => {
    return await jwt.verify(token.slice(7), process.env.JWT_SECRET);
};

export default async function extractUser(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const { _Id } = await decode(token);
        req.User = await new BaseUser(_Id).Get();
    }
    next();
}
