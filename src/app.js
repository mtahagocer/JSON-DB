import express from 'express';
// import path from 'path';
import cookieParser from 'cookie-parser';
import indexRouter from './Routes/index';
import dotenv from 'dotenv';
import 'dotenv/config';
import logger from './Middlewares/Logger/morgan';
import jwtMV from './Middlewares/JWT';
import userMV from './Middlewares/User';

dotenv.config();
let app = express();

app.use(logger);
app.use(jwtMV);
app.use(userMV);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((err, req, res) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});
// app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
export default app;
