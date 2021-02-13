const mongooseConnect = require('./db/mongoose');
const app = require('./app');
const swaggerApp = require('./swaggerApp');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 8081;
const swaggerPort = 8080;

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