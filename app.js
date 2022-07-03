require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');
const { vaidateSignup, vaidateSignin } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const port = process.env.PORT || 5000;
const { DATABASE_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(requestLogger);
app.post('/signup', vaidateSignup, createUser);
app.post('/signin', vaidateSignin, login);
app.use(auth);
app.use('/users', routerUser);
app.use('/cards', routerCards);
app.use(() => {
  throw new NotFoundError('Страница не найдена');
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

mongoose.connect(DATABASE_URL);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
