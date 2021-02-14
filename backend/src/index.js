const mongooseConnect = require('./db/mongoose');
const app = require('./app');
const swaggerApp = require('./swaggerApp');

const env = process.env.NODE_ENV;
const port = process.env.PORT;
const swaggerPort = process.env.SWAGGER_PORT;

mongooseConnect(app);

app.on('ready', () => {
  app.listen(port, () => {
    console.log('Server is up on port '+ port)
  })

  if(env === 'development') {
    swaggerApp.listen(swaggerPort, () => {
      console.log('Swagger is up on port '+ swaggerPort)
    })
  }
})