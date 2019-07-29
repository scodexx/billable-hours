const api = require('express').Router();
const cors = require('cors');

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

// Enable cors
api.use(cors());

module.exports = api;