const googleCreds = require('./config/google-key.json'); 
const config = require('./config/config.json');
const parse = require('./parse.js')(googleCreds, config.spreadsheet);
const express = require('express');
const app = express();
let data;

(async () => {
    data = await parse.updateData();
    console.log(data);
})();

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('test', {data: data});
});

app.listen(80);