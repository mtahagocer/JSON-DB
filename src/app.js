import express from 'express';
import dotenv from 'dotenv';
import 'dotenv/config';
import indexRouter from './Routes/index';
import loggerMV from './Middlewares/Logger/morgan';
import jwtMV from './Middlewares/JWT';
import userMV from './Middlewares/User';
import errorMV from './Middlewares/Error';
import asyncHandler from 'express-async-handler';

dotenv.config();
const app = express();
app.use(loggerMV);
app.use(jwtMV);
app.use(userMV);
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, '../public')));
app.on('listening', () => {
    console.log(`Listening on ${process.env.PORT}`);
});
app.use('/', asyncHandler(indexRouter));

app.use(errorMV);

app.on('error', (err, req, res, next) => {
    console.log({ err, req, res, next });
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});


export default app;
