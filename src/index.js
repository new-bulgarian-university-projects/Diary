import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import uuidv4 from 'uuid/v4';

import models from './models/index';

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

app.get('/session', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
  });
  
  app.get('/users', (req, res) => {
    return res.send(Object.values(req.context.models.users));
  });
  
  app.get('/users/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
  });
  
  app.get('/messages', (req, res) => {
    return res.send(Object.values(req.context.models.messages));
  });
  
  app.get('/messages/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId]);
  });
  
  app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
      id,
      text: req.body.text,
      userId: req.context.me.id,
    };
  
    req.context.models.messages[id] = message;
  
    return res.send(message);
  });
  
  app.delete('/messages/:messageId', (req, res) => {
    const {
      [req.params.messageId]: message,
      ...otherMessages
    } = req.context.models.messages;
  
    req.context.models.messages = otherMessages;
  
    return res.send(message);
  });


app.listen(port, () =>
    console.log(`Example app listening on port ${port} !`),
);
