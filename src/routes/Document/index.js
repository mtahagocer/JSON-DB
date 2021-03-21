import { Router } from 'express';
import * as DocumentController from '../../Controllers/Document';

const router = Router();

router.get('/', DocumentController.Get);
router.put('/', DocumentController.Put);
router.patch('/', DocumentController.Patch);
router.post('/', DocumentController.Post);
router.delete('/', DocumentController.Delete);

export default router;
