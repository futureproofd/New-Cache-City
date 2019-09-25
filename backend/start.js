const mongoose = require('mongoose');
const app = require('./app');

// import env variables from our file
require('dotenv').config({ path: 'variables.env' });

// connect our DB
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // ES6 Promises
mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`);
});

// Start server
app.set('port', process.env.PORT || 7889);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on PORT: ${server.address().port}`);
});
