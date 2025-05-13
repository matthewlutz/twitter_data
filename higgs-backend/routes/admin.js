import express from 'express';
import {data as db} from '../app.js';

const router = express.Router();

// returns list of all admin users.
router.get('/admin', (req, res, next) => {

});

// create a new admin user.
router.post('/admin', (req, res, next) => {

});

// update existing admin user name and/or password.
router.put('/admin/:id', (req, res, next) => {

});

// delete an admin user.
router.delete('/admin/:id', (req, res, next) => {

});
