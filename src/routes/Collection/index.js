import { Router } from 'express';
import * as CollectionController from '../../Controllers/Collection';

const router = Router();

router.get('/', CollectionController.Get);
router.post('/', CollectionController.Post);
router.delete('/', CollectionController.Delete);

export default router;
