const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

//NODE Environment 
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//Initialization
const app = express();
require('./src/auth/auth');

//settings
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cors());

//Static Files
app.use(express.static(__dirname + '/public'));

//Routes
app.use('/api/task', require('./src/routes/tasks'));
app.use('/api/user', require('./src/routes/user'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

module.exports = app;