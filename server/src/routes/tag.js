import { Router } from 'express';
import services from '../services';

const router = Router();

router.get('/', async (req, res)=>{
    try {
        const tags = await services.tag.getAllTags();
        return res.send(tags);
    } catch (e) {
        return res.status(500).send('Server Error');
    }

})

export default router;