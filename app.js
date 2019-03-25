const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');

const { env } = process;

dotenv.config();

const log = require('console-log-level')({
  prefix: () => new Date().toISOString(),
  level: process.env.loglevel || 'info',
});

const accessLog = rfs('access.log', {
  interval: env.logrotation,
  path: path.join(__dirname, 'log'),
});

const errorLog = rfs('error.log', {
  interval: env.logrotation,
  path: path.join(__dirname, 'log'),
});

const loggerError = morgan('combined', {
  skip: (req, res) => res.statusCode < 400,
  stream: errorLog,
});

const loggerAccess = morgan('common', {
  stream: accessLog,
});

const { msg } = require('./lib/messages');

const {
  dbuser,
  dbpass,
  dbhost,
  dbparam,
} = env;

const dburi = `mongodb+srv://${dbuser}:${dbpass}@${dbhost}/${dbparam}`;
mongoose.connect(
  dburi,
  { useNewUrlParser: true },
).then(
  () => (log.info(msg.db.ok)),
  err => (log.error(msg.db.nook, err)),
);

const app = express();

const indexRouter = require('./routes');

app.use(cors());
app.use(loggerError);
app.use(loggerAccess);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(indexRouter);
app.listen(env.port || 3000, () => {
  log.info(msg.server, env.port);
});
