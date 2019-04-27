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
app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1]
    }
    next();
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

connectDb().then(async () => {
    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`),
    );
  });
