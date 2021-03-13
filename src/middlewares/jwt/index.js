import jwt from 'express-jwt';

const jwtMV = jwt({
    secret: process.env.JWT_SECRET || 'alaşsldlşasd',
    credentialsRequired: true,
}).unless({ path: ['/api/login', '/api/db-check'] });

export default jwtMV;
