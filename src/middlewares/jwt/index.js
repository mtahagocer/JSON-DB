import expressJwt from 'express-jwt';
import 'dotenv/config';

const jwtMV = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: [process.env.JWT_ALGORITHM]
}).unless({ path: ['/api/login', '/api/routes'] });

export default jwtMV;
