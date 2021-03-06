#!/usr/bin/env node

/**
 * Module dependencies.
 */
const http = require('http');
const app = require('./app');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const p = parseInt(val, 10);

  if (Number.isNaN(p)) {
    // named pipe
    return val;
  }

  if (p >= 0) {
    // port number
    return p;
  }

  return false;
}

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const port = normalizePort(process.env.PORT || '5000');

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  console.log(`Listening on ${addr.port}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

app.set('port', port);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
