// Load environment variables using dotenv
require('dotenv').config({ path: __dirname + '/../.env' })

let CONFIG = {};

CONFIG.env  = process.env.APP_ENV || 'development'
CONFIG.port = process.env.APP_PORT || 8091;

CONFIG.db_dialect   = process.env.DB_DIALECT  || 'mysql';
CONFIG.db_host      = process.env.DB_HOST     || 'localhost';
CONFIG.db_port      = process.env.DB_PORT     || 3306;
CONFIG.db_name      = process.env.DB_NAME     || 'test';
CONFIG.db_user      = process.env.DB_USER     || 'root';
CONFIG.db_password  = process.env.DB_PASSWORD || '';
CONFIG.db_secure    = process.env.DB_SECURE   || true;

module.exports = CONFIG;