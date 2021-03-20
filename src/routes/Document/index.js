import { Router } from 'express';
import * as DocumentController from '../../Controllers/Document';

const router = Router();

router.get('/document', DocumentController.Get);
router.put('/document', DocumentController.Put);
router.patch('/document', DocumentController.Patch);
router.post('/document', DocumentController.Post);
router.delete('/document', DocumentController.Delete);

export default router;
