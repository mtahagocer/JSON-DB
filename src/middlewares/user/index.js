import jwt from 'jsonwebtoken';

export default function bindUser(req, res, next) {
    const token = req.headers.authorization;
    if (token) req.user = jwt.verify(token.slice(7), process.env.JWT_SECRET);
    next();
}
