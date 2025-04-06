

// dependencies
import createError from 'http-errors';
import express from 'express';
import http from 'http';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

const debug = require('debug')('higgs-backend:server');

// initilize app
var app = express();
app.set('port', process.env.PORT);

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

// TODO: connect to database

// user authentication
app.use(passport.initialize());
app.use(passport.session());

// TODO: routers

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

server.listen(process.env.PORT);
server.on('listening', onListening);
server.on('error', onError);

// event handler to note when server is listening
function onListening() {
    debug('Listening on ' + process.env.PORT);
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