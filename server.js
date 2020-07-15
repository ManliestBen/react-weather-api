const express = require('express');
const app = express();
const logger = require('morgan');
const port = process.env.PORT || 3001;
const path = require('path');
const favicon = require('serve-favicon');
const apiRouter = require('./routes/api');
const cors = require('cors');

require('dotenv').config();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use('/api', apiRouter);
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(port, ()=> {
    console.log(`Express is listening on port ${port}.`)
});
