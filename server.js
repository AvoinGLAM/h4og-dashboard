const googleCreds = require('./config/google-key.json'); 
const config = require('./config/config.json');
const parse = require('./parse.js')(googleCreds, config.spreadsheet);
const express = require('express');
const app = express();
const fs = require('fs');
let data;


(async () => {
    data = await parse.updateData();
    fs.writeFile('latest.json', JSON.stringify(data), (err) => {
        if (err) { console.log(err); }
    })
    //console.log(data);
})();

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('test', {data: data});
});

app.listen(process.env.PORT || 80);