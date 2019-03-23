const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const APP_PORT  = process.env.APP_PORT || 5000;
const APP_DEBUG = process.env.APP_DEBUG || true;
const APP_ENV   = process.env.APP_ENV || process.env.NODE_ENV || 'local';
const APP_URL   = process.env.APP_URL || 'http://localhost:' + port;
const COUCHDB_HOST = process.env.COUCHDB_HOST || 'http://localhost:5984';


const routes = require('./routes/routes');
const database = require('./database/couchdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.enable('trust proxy');
if(APP_ENV == 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.use(routes);


app.listen(APP_PORT, () => {
    console.log('server started in port', APP_PORT);
});