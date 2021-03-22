import jwt from 'jsonwebtoken';

export default function extractUser(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        req.User = jwt.verify(token.slice(7), process.env.JWT_SECRET);
    }
    next();
}
