const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

require('./db/mongoose')
const memeRouter = require('./routers/meme');
const swaggerDocument = require('./swagger.json');

const app = express();
const env = process.env.NODE_ENV;

var forceSsl = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    let status = 302;
    if (req.method !== 'GET') status = 307;
    return res.redirect(status, ['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

if (env === 'production') app.use(forceSsl);
app.use(express.json());
app.use(mongoSanitize());
app.use(cors());
app.use(memeRouter);
if (env === 'production') app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;