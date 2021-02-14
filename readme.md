## General info
Stage 2B submission for XMeme
	
## Technologies
Project is created with:
* Reactjs, Semantic UI (Frontend)
* Nodejs, Express (Backend)
* Mongodb (Database)

## Directory Structure

### Frontend

* src
  * assets: Contains assets like images which are to be served.
  * components: Contains various react components which are to be used in the project
  * containers: Contains the containers which uses components to make different pages.
  * axios-meme.js: Instantiates the axios with defined base URL
  * index.js: entry point of the react app
  
* public: contains all the static assets like html and favicons which are to be served
* .env.example: copy this file in .env and set the values of the environment variables.

### Backend
* src
  * db/mongoose.js: Configures the database.
  * models: Defines different mongoose models.
  * routers: Defines routers for the main express app.
  * app.js: Instantiates and configures the main app.
  * swaggerApp.js: Instantiates and configures the swagger app. This app is run only in development on host 8081.
  * swagger.json: Swagger document for the swagger UI.
  
* .env.example: copy this file to .env file and the set the values for different env variables. Don't set SWAGGER_PORT while deploying
  
## Setup
To run this project, install it locally using npm:

### Backend (assuming in the root directory)

copy the .env.example to .env and set the env variables accordingly
Make sure your database is running properly

Then
For development
```
$ cd ./
$ npm install
$ npm run-script dev
```

For production
```
$ cd ./
$ npm install
$ npm run-script dev
```

### Frontend (assuming in the root directory)

copy the .env.example to .env and set the env variables accordingly

```
$ cd ./
$ npm install
$ npm start
```
