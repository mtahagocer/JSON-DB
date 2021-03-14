import expressJwt from 'express-jwt';
import 'dotenv/config';

const jwtMV = expressJwt( {
    secret: process.env.JWT_SECRET,
    credentialsRequired: true,
    algorithms: [ 'HS256' ]
} ).unless( { path: [ '/api/login', '/api/db-check' ] } );

export default jwtMV;
