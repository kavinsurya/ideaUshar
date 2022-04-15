// Bring Mongoose into the app
const mongoose = require('mongoose');
const constants = require('../common/constants');
// Create the database connection
console.log('constants.DB_URL :::: ', constants.DB_URL);
const db = mongoose.createConnection(constants.DB_URL, constants.DB_OPTIONS);
mongoose.set('debug', true);

// CONNECTION EVENTS

// When successfully connected
db.on('connected', () => {
  console.log('Mongoose connection open to master DB');
});

// If the connection throws an error
db.on('error', (err) => {
  console.log(`Mongoose connection error for master DB: ${err}`);
});

// When the connection is disconnected
db.on('disconnected', () => {
  console.log('Mongoose connection disconnected for master DB');
});

// When connection is reconnected
db.on('reconnected', () => {
  console.log('Mongoose connection reconnected for master DB');
});
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  db.close(() => {
    console.log(
      'Mongoose connection disconnected for master DB through app termination'
    );
    process.exit(0);
  });
});

module.exports = db;
