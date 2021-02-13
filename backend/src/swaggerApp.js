const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

const swaggerApp = express();

swaggerApp.use(cors());
swaggerApp.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = swaggerApp;