import { Router } from 'express';
import services from '../services';

// filter queries- scope&tag 
// get /
// get /entryId
// post / : {}
// delete /entryId

const router = Router();

router.get('/', async (req, res) => {
    try {
        const entries = await services.entry.getAllEntries();
        return res.send(entries);
    } catch (e) {
        return res.status(500).send('Server Error');
    }
});

router.get('/:entryId', async (req, res)=> {
    try {
        const entry = await services.entry.getEntryById(req.params.entryId);
        return res.send(entry);
    } catch (e) {
        return res.status(500).send('Server Error');
    }
});



export default router;