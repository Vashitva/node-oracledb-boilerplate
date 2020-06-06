const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const oracleDataSource = require('./datasource/datasource-oracle')
var RateLimit = require("express-rate-limit");

// use this port for socket connection
const PORT = config.server.port;

//create an express app
const app = express();

// parse request of the contenttype - application/x-www-form-urlencoded
app.use( bodyParser.urlencoded({extended : true})); 

//parse the application/json
app.use( bodyParser.json());

app.get('/', (req, res) => {
    res.json({'message':'Hi there!!!, this is just for starters, main course later'});
});
app.use('/api/test', (req, res) => {
    res.json({'message':'Hi there!!!, this is just for starters, main course later'});
});
app.post('/test', (req, res) => {
    console.log(req.body);
    requestValidator.validate(req.body);
    res.json({'message':'Hi there!!!, this is just for starters, main course later'});
});

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

const initializePool = async () => {
    const dbConf = config.dbPoolConfig;
    console.log(dbConf)
    await oracleDataSource.createPool(dbConf);
};

const startApp = async (serverPort) => {
    try {
        //await initializePool();
        await app.listen(serverPort);
        console.log(`Server started on port - ${serverPort}`);

    } catch(err) {
        console.log(`Error while starting server - ${err.message}`);
    }
}

startApp(PORT);