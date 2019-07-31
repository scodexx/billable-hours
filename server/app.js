const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const errorhandler = require('errorhandler')
const compression = require('compression')
const helmet = require('helmet')
const path = require('path')
const fs = require('fs')
const redis = require('redis')
const expressLimiter = require('express-limiter')
const methodOverride = require('method-override')

const React = require('react')
const { renderToString } = require('react-dom/server')
const { Helmet } = require('react-helmet')
const App = require('../src/containers/App').default
const { StaticRouter } = require('react-router-dom')

// Import server configurations
const CONFIG = require('./config')

// Define server environment
const isProduction = CONFIG.env === 'production';

const app = express()
const router = express.Router()

// Only use morgan logger in development environment
app.use(require('morgan')('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

/**
 * Compression settings
 */
app.use(compression({
    filter: (req, res) => {
        if(req.headers['x-no-compression']) {
            // don't compress responses with this request header
            return false
        }
        // fallback to standard filter function
        return compression.filter(req, res)
    }
}));

/**
 * Helmet::security
 */
app.use(helmet())

/**
 * (Rate limit) Limit unnecessary conections
 * Needs Redis server
 * 
 * brew install redis [https://gist.github.com/nrollr/eb24336b8fb8e7ba5630]
 * apt-get install redis-server
 */
const redisClient = redis.createClient()
const limiter = expressLimiter(app, redisClient)
// Limit requests to 100 per hour per ip address.
limiter({
    method: 'all',
    lookup: ['connection.remoteAddress'],
    // limit to 100 concurrent connections every hour
    total: 100,
    expire: 1000 * 60 * 60, // every 
})

// Remove (x-powered-by) http request header
app.disable('x-powered-by');

app.use(methodOverride())

/** Use error handler if in development environment */
if(!isProduction) {
    app.use(errorhandler());
} else {
    app.use(errorhandler({
        dumpExceptions: true,
        showStack: true
    }))
}

// Api
router.use('/api', require('./routes/api'));
// Define static files location
router.use('/static', express.static(path.resolve(__dirname, '..', 'build', 'static'), { 
    maxAge: '30d',
}));
// Others
router.use('*', (req, res) => {
    const indexFile = path.resolve('./build/index.html');

    fs.readFile(indexFile, 'utf8', async (err, data) => {
        if(err) {
            console.log(err);
            return res.status(500).send('An error occurred')
        }

        const context = {data: {}, head: []};
        const markup = `<div id="root" class="h-100p">${renderToString(
            <StaticRouter location={req.baseUrl} context={context}>
                <App />
            </StaticRouter>
        )}</div>`;

        const keys = Object.keys(context.data)
        const promises = keys.map(k => context.data[k])
    
        const resolved = await Promise.all(promises)
        resolved.forEach((r, i) => context.data[keys[i]] = r)
        
        renderToString(
            <StaticRouter location={req.baseUrl} context={context}>
                <App />
            </StaticRouter>
        )
        const helmetData = Helmet.renderStatic();

        let htmlData = data.replace('<div id="root" class="h-100p"></div>', markup)

        htmlData = htmlData.replace(/<title>...<\/title>/g, helmetData.title.toString())
        htmlData = htmlData.replace(/<meta\/>/g, helmetData.meta.toString())

        // .writeHead( 200, { "Content-Type": "text/html" } )
        res.set('Content-Type', 'text/html').send(htmlData)
    });
})

app.use(router);

// Force all requests on production to be served over https
app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https' && CONFIG.env === 'production') {
        const secureUrl = 'https://' + req.hostname + req.originalUrl
        res.redirect(302, secureUrl)
    }

    next()
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
// development error handler
// will print stacktrace
if(!isProduction) {
    app.use(function(err, req, res) {
      console.log(err.stack);
  
      res.status(err.status || 500);
  
      res.json({'errors': {
        message: err.message,
        error: err,
      }});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.json({'errors': {
        message: err.message,
        error: {},
    }});
});

// Initialize server
const server = app.listen(CONFIG.port || 8000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`Server started @http://${host}:${port}`, host, port)
});