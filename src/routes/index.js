import { Router } from 'express';
let router = Router();

/* GET home page. */
router.get( '/', ( req, res ) => {
    res.json( {
        'index': 'index'
    } );
} );

export default router;
