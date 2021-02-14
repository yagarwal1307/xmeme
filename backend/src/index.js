//Import database connect function
const mongooseConnect = require('./db/mongoose');

//Import app and swagger app
const app = require('./app');
const swaggerApp = require('./swaggerApp');

const env = process.env.NODE_ENV;
const port = process.env.PORT;
const swaggerPort = process.env.SWAGGER_PORT;

//Call mongooseConnect
//If app gets connected to database.
mongooseConnect(app);

//If app gets connected to database successfully it emits ready and triggers the function
app.on('ready', () => {

  //Serve the app 
  app.listen(port, () => {
    console.log('Server is up on port '+ port)
  })

  //Serve the swagger app on a different PORT only in development environment
  if(env === 'development') {
    swaggerApp.listen(swaggerPort, () => {
      console.log('Swagger is up on port '+ swaggerPort)
    })
  }
})