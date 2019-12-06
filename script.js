const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.SENTRY_RELEASE
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// All controllers should live here
app.get('/', function rootHandler(req, res) {
  console.log("/ endpoint hit");
  res.send('Here, have an env var from heroku: ' + process.env.SENTRY_ORG + ' and sentry release: ' + process.env.SENTRY_RELEASE);
});

app.get('/debug-sentry', function mainHandler(req, res) {
  console.log("hit /debug-sentry");
  throw new Error('My first Sentry error!');
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  console.log(res);
  res.end(res.sentry + "\n");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

