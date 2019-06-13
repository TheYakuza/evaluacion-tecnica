const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');
const passport = require('passport');
const errorHandler = require('errorhandler');

dotenv.config();

const app = express();

const { env } = process;

const {
  LOGLEVEL: loglevel,
  LOGROTATION: logrotation,
  DBUSER: dbuser,
  DBPASS: dbpass,
  DBHOST: dbhost,
  DBPARAM: dbparam,
  PORT: port,
  NODE_ENV: nodeEnv,
} = env;

const log = require('console-log-level')({
  prefix: () => new Date().toISOString(),
  level: loglevel || 'info',
});

const { msg } = require('./lib/messages');

const accessLog = rfs('access.log', {
  interval: logrotation || '1d',
  path: path.join(__dirname, 'log'),
});

const errorLog = rfs('error.log', {
  interval: logrotation || '1d',
  path: path.join(__dirname, 'log'),
});

const loggerError = morgan('combined', {
  skip: (req, res) => res.statusCode < 400,
  stream: errorLog,
});

const loggerAccess = morgan('common', {
  stream: accessLog,
});

const isProduction = nodeEnv === 'production';

if (!isProduction) {
  app.use(errorHandler());
}


const dburi = `mongodb+srv://${dbuser}:${dbpass}@${dbhost}/${dbparam}`;
mongoose.connect(
  dburi,
  { useNewUrlParser: true },
).then(
  () => (log.info(msg.db.ok)),
).catch(
  err => (log.error(msg.db.nook, err)),
);

const indexRouter = require('./routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(loggerError);
app.use(loggerAccess);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(indexRouter);
app.listen(port || 3000, () => {
  log.info(msg.server, port);
});
