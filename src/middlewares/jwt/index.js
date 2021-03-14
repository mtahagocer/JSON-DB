import expressJwt from 'express-jwt';
import 'dotenv/config';

const jwtMV = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
}).unless({ path: ['/api/login', '/api/routes'] });

export default jwtMV;
