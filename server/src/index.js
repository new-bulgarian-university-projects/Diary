import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import seeder from './utils/seed';

import models, { connectDb } from './models';


const app = express();

// Parses the text as JSON and exposes the resulting object on req.body.
app.use(bodyParser.json());

// Parses the text as URL encoded data 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    req.context = {models};
    next();
  });

app.use(cors());

app.use('/users', routes.user);
app.use('/entries', routes.entry);
app.use('/scopes', routes.scope);
app.use('/tags', routes.tag);

app.get('/protected', (req, res) => {
  console.log('authenticated user ', req.user);
  res.send('authenticated');
})

// Error handling 
app.use(function (err, req, res, next) {
  // Send the error rather than to show it on the console
  if (err.name === 'UnauthorizedError') { 
      res.status(401).send(err);
  }
  else {
      next(err);
  }
});

const eraseDatabaseOnSync = false;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Scope.deleteMany({}),
      models.Entry.deleteMany({}),
      models.Tag.deleteMany({}),
    ]);
    
    seeder.createUsersWithEntries();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});