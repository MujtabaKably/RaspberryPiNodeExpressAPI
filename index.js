const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const http = require('http');

//init express
const app = express();

//the custom userObject, that is shared over the application via the require cache.
require.cache.userObject = {
  app 
};

//the base __dirname
require.cache.userObject.appPath = __dirname; 

app.use(compression());
app.use(bodyParser.json({limit:'50mb'}));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

const appRouter = require(path.join(__dirname, '/routes.js'));

app.use('/', appRouter);

const server = http.createServer(app);

//server object
server.listen(8080)
  .on('error', error => {
    console.error(error);
  })
  .on('listening', () => {
    console.info(`Express listening on ${'8080'}`);
  });

//catching uncaught excpetions and terminating the application.
process.on('uncaughtException', (err) => {
  console.error('whoops! there was an error', err.message);
  process.exit(0);
});