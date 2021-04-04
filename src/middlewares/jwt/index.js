import expressJwt from 'express-jwt';
import 'dotenv/config';

const jwtMV = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: [process.env.JWT_ALGORITHM]
}).unless({ path: ['/login', '/routes'] });

export default jwtMV;
