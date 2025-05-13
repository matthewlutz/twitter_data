// config
import 'dotenv/config';

// dependencies
import createError from 'http-errors';
import express from 'express';
import http from 'http';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mysql from 'mysql2/promise';
import createDebug from 'debug';

import login from './routes/login.js';
import logout from './routes/logout.js';
import wall from './routes/wall.js';
import search from './routes/search.js';

const debug = createDebug('server');
const __dirname = path.resolve();

const db = mysql.createPool({
    host: process.env.DB_ADDR,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

// initilize app
var app = express();
app.set('port', process.env.DB_PORT);

// app middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : {
      secure: false,
      maxAge: 360000
    }  
}));

// user authentication
app.use('/login', login);
app.use('/logout', logout);
app.use('/api', wall);

// data lookup and CRUD operations
app.use('/api', search);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send(err.message);
});
  

// initilize HTTP server and load app into it
var server = http.createServer(app);

server.listen(process.env.WS_PORT);
server.on('listening', onListening);
server.on('error', onError);

// event handler to note when server is listening
function onListening() {
    debug('Listening on ' + process.env.WS_PORT);
}

// event handler for server errors
function onError(error) {

    // if error isn't related to listening, throw error without further processing
    if (error.syscall !== 'listen') throw error;

    // print error to console with further description and exit process
    switch (error.code) {
        case 'EACCES':
            console.error('Insufficient privilages to bind on' + process.env.PORT);
            process.exit(1);
        case 'EADDRINUSE':
            console.error('System already using ' + process.env.PORT);
            process.exit(1);
        default:
            throw error;
    }
}

export const data = db;