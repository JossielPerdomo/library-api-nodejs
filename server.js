const express = require('express');
const mysql = require('mysql');
const mycon = require('express-myconnection');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.set('port', process.env.PORT || 9000);
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'josiel117',
    database: 'library'
}

// midlewares
app.use(mycon(mysql, dbOptions, 'single'));
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.send('welcome to my api');
});

app.use('/api', routes);

// server running
app.listen(app.get('port'), () => {
    console.log('server running on port', app.get('port'));
});