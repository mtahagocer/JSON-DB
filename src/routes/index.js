import { Router } from 'express';
import listEndpoints from 'express-list-endpoints';
import * as CollectionController from '../Controllers/Collection';
const router = Router();

router.get('/collection', CollectionController.Get);
router.post('/collection', CollectionController.Post);
router.delete('/collection', CollectionController.Delete);

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
