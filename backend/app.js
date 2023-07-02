require('dotenv').config();

const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const { errorsHandler } = require('./middlewares/errors');
const router = require('./routes');
const { createUser, login } = require('./controllers/users');
const { POST_SIGNUP, POST_SIGNIN } = require('./utils/validators');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();
app.use(express.json());
app.post('/signup', POST_SIGNUP, createUser);
app.post('/signin', POST_SIGNIN, login);
app.use(cookieParser());
app.use(auth);
app.use(router);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Server on port ${PORT} started...`);
  /* eslint-enable no-console */
});
