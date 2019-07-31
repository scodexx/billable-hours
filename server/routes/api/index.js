const api = require('express').Router();
const cors = require('cors');
const { routeError } = require('../../handlers/ErrorHandlers')

// We are currently not using cors whilelisting
// const whitelist = [];

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//           callback(null, true)
//         } else {
//           callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

// Enable cors without options
api.use(cors());
api.use('/v1', require('./v1'));

// catch invalid route access
api.use(routeError)

module.exports = api;