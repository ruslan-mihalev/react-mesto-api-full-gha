require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const { errorsHandler } = require('./middlewares/errors');
const router = require('./routes');
const { createUser, login } = require('./controllers/users');
const { POST_SIGNUP, POST_SIGNIN } = require('./utils/validators');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

const corsOptions = {
  origin: [/^http:\/\/localhost:\d+$/, /^https?:\/\/travelplaces.api.nomoreparties.sbs$/],
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(requestLogger);

app.options('*', cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', POST_SIGNUP, createUser);
app.post('/signin', POST_SIGNIN, login);
app.use(cookieParser());
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Server on port ${PORT} started...`);
  /* eslint-enable no-console */
});
