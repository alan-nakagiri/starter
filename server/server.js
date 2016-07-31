var express = require('express'),
  path = require('path'),
  fs = require('fs'),
  uuid = require('uuid'),
  cookieSession = require('cookie-session'),
  cookieParser = require('cookie-parser'),
  assign = require('object-assign'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  app = express();


app.set('trust proxy', 1);
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['superLongKeysAreGreatForLotsOfTyping', 'AnotherKeyIsUsedAsASecondaryKey'],
  secure: global.__PROD__,
  secureProxy: global.__PROD__,
  httpOnly: true
}));

app.use(compress());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/heartbeat', (req, res) => { res.sendStatus(200); });

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(process.env.PORT || 8080,
  console.log('web server loaded at localhost:'+(process.env.PORT || 8080)
));
