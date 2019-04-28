import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import routes from './routes';

import models, { connectDb } from './models';

const port = process.env.PORT;
const app = express();

// Parses the text as JSON and exposes the resulting object on req.body.
app.use(bodyParser.json());

// Parses the text as URL encoded data 
app.use(bodyParser.urlencoded({ extended: true }));

// simple version of a middleware that determines a pseudo 
// “authenticated” user that is sending the request
app.use(async (req, res, next) => {
    req.context = {
      models,
      me: await models.User.findByLogin('rwieruch'),
    };
    next();
  });

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

const eraseDatabaseOnSync = false;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({}),
    ]);

    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithMessages = async () => {
    const user1 = new models.User({
      username: 'rwieruch',
    });
  
    const user2 = new models.User({
      username: 'ddavids',
    });
  
    const message1 = new models.Message({
      text: 'Published the Road to learn React',
      user: user1.id,
    });
  
    const message2 = new models.Message({
      text: 'Happy to release ...',
      user: user2.id,
    });
  
    const message3 = new models.Message({
      text: 'Published a complete ...',
      user: user2.id,
    });
  
    await message1.save();
    await message2.save();
    await message3.save();
  
    await user1.save();
    await user2.save();

    console.log("seeded.")
};
