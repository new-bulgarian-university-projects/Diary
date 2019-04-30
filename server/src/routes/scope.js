import { Router } from 'express';
import services from '../services';

const router = Router();

router.get('/', async (req, res)=>{
    try {
        const scopes = await services.scope.getAllScopes();
        return res.send(scopes);
    } catch (e) {
        return res.status(500).send('Server Error');
    }

})

export default router;