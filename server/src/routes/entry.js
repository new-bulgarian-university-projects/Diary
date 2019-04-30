import { Router } from 'express';
import services from '../services';

const router = Router();

router.get('/', async (req, res) => {
    try {
        console.log(req.query);
        const entries = await services.entry.getAllEntries(req.query);
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
        console.log("Error ", e);
        return res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    const data = req.body;
    console.log(data)
    if(data && Object.entries(data).length === 0 && data.constructor === Object){
        return res.status(400).send('Bad request');
    }

    try {
        const entry = await services.entry.saveEntry(data);
        return res.send(entry);
    } catch (e) {
        // console.log(e)
        return res.status(500).send('Server Error ');
    }
});

router.delete('/:entryId', async (req, res)=>{

});




export default router;