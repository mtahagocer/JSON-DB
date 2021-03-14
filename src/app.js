import express from 'express';
import listEndpoints from 'express-list-endpoints';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import 'dotenv/config';
import indexRouter from './Routes/index';
import loggerMV from './Middlewares/Logger/morgan';
import jwtMV from './Middlewares/JWT';
import userMV from './Middlewares/User';
import errorMV from './Middlewares/Error';
import './Services/Singleton/create';

dotenv.config();
const app = express();

app.use(loggerMV);
app.use(jwtMV);
app.use(userMV);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));
app.all('/api/routes', (req, res) => {
    let endpoints = listEndpoints(app);
    endpoints.splice(0, 1);
    res.json({ routes: endpoints });
});
app.use('/', indexRouter);
app.on('error', errorMV);


export default app;
