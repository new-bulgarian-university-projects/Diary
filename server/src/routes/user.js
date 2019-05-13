import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import services from '../services';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});

// login
router.post('/', async (req, res) => {
  const username = req.body.username;
  try {
    const foundUser = await req.context.models.User.findOne({username: username});
    console.log(foundUser);

    if(foundUser){
      return bcrypt.compare(req.body.password, foundUser.password, (err, result)=>{
          if(err){
            res.status(500).send('Error on authentication !')
          }

          if(result) {
            const token = jwt.sign({id: foundUser.id, username: foundUser.username}, 
                                    process.env.SECRET, 
                                    { expiresIn: '1h' });
            return res.json({status:"success", token});
          } else {
            return res.status(401).send('Unauthorized');
          }
      })
    }
    return res.send('unauthorized');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Server error !');
  }

});

router.post('/create', (req, res)=> {
  bcrypt.hash(req.body.password, +process.env.SALT_ROUNDS, async (err, hash) => {
    if(err){
      res.status(500);
    }

    const username = req.body.username;
    const email = req.body.email;
    await req.context.models.User.create({
        username,
        email,
        password: hash }).then((data) => {
            console.log("user saved")
            if (data) {
                return res.send({username, email});
            }
            return res.status(500);
     });
  });
});

router.get('/:userId/entries', async(req, res) => {
  const userId = req.params['userId'];
  try {
    const entries = await services.entry.getEntryForUser(userId);
    return res.send(entries)
  } catch (e) {
    console.log(e);
    res.status(500).send(`Error on getting entries for user: ${userId}`)
  }
});

router.get('/:userId', async (req, res) => {
  try {
      const user = await req.context.models.User.findById(req.params.userId);
      return res.send({email: user.email, username: user.username});
  } catch (e) {
      console.log(e)
  }
});

export default router;