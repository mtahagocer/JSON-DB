import { Router } from 'express';
import listEndpoints from 'express-list-endpoints';
import CollectionRouter from './Collection';
import DocumentRouter from './Document';

const router = Router();

router.all('/collection', CollectionRouter);

router.all('/document', DocumentRouter);

router.all('*', (req, res) => {
    let endpoints = listEndpoints(router);
    endpoints.splice(0, 1);
    res.json({
        success: false,
        error: [
            'Invalid route'
        ],
        routes: JSON.stringify(endpoints)
    });
});

export default router;
