import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import uuidv4 from 'uuid/v4';

const port = process.env.PORT;
const app = express();

// Parses the text as JSON and exposes the resulting object on req.body.
app.use(bodyParser.json());

// Parses the text as URL encoded data 
app.use(bodyParser.urlencoded({ extended: true }));

// simple version of a middleware that determines a pseudo 
// “authenticated” user that is sending the request
app.use((req, res, next) => {
    req.me = users[1];
    next();
});

const users = {
    1: {
      id: '1',
      username: 'Robin Wieruch',
    },
    2: {
      id: '2',
      username: 'Dave Davids',
    },
};
  
const messages = {
    1: {
        id: '1',
        text: 'Hello World',
        userId: '1',
    },
    2: {
        id: '2',
        text: 'By World',
        userId: '2',
    },
};

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    return res.send(Object.values(users));
});

app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
});

app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
      id,
      text: req.body.text,     
      userId: req.me.id,
    };
  
    messages[id] = message;
    return res.send(message);
});


app.listen(port, () =>
    console.log(`Example app listening on port ${port} !`),
);
