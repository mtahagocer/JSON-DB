import { Router } from 'express';
import listEndpoints from 'express-list-endpoints';
import CollectionRouter from './Collection';
import DocumentRouter from './Document';

const router = Router();


router.use('/document', DocumentRouter);

router.use('/collection', CollectionRouter);

router.all('*', (req, res) => {
    let endpoints = listEndpoints(router);
    endpoints.pop();
    res.json({
        success: false,
        error: [
            'Invalid route'
        ],
        routes: endpoints
    });
});

export default router;
