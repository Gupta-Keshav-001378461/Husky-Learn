// const router = require('express').Router();

// router.use('/api', require('./api'));

// module.exports = router;



'use strict';

const appRoute = require('./../routes/app-routes');

module.exports = (app) => {
    appRoute(app);
};