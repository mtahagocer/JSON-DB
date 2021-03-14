import morgan from 'morgan';
import fs from 'fs';

morgan.token('user', (req) => {
    return JSON.stringify(req.user);
});

const logger = morgan(
    ':user\n :date[iso] :status :method\t  :res[content-length]\t :response-time ms\t :url',
    {
        stream: fs.createWriteStream('access.log', {
            flags: 'a'
        })
    }
);

export default logger;
