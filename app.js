const express = require('express');
const app = express();
const cors = require('cors');
const routing = require('./routes');
const todo = require('./routes/todoRoute');

const port = 3000;
require('dotenv').config();
const request = require('request');
const mongoose   = require('mongoose');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/',routing);
app.use('/todo',todo);


//Connecting to Mongoose
// const url = 'mongodb://admin:todolist1234@ds117830.mlab.com:17830/todo-list';
// const url = 'mongodb://mbmcorp:mbm1234@ds229290.mlab.com:29290/mbm';
const url = 'mongodb://localhost:27017/to-do-list';

mongoose.connect(url,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected');
});

app.listen(port,()=>{
  console.log(`application is on port:${port}`);
});



