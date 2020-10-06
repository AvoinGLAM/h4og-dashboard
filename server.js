const googleCreds = require('./config/google-key.json');
const config = require('./config/config.json');
const parse = require('./parse.js')(googleCreds, config.spreadsheet);
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const readChunk = require('read-chunk')
const fileType = require('file-type')
let data;

(async () => {
    data = await parse.updateData();
    fs.writeFile('latest.json', JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        }
    })
    //console.log(data);
})();

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/usercontent_cache/:filename', async function (req, res) {
    const filePath = path.join('./usercontent_cache/', req.params.filename);
    const buffer = readChunk.sync(filePath, 0, 4100);
    const storedMimeType = await fileType.fromBuffer(buffer);
    console.log(storedMimeType);
    if (storedMimeType) {
        res.setHeader('Content-Type', storedMimeType.mime);
        fs.createReadStream(filePath).pipe(res);
        console.log('Success!');
    } else {
        res.status(404).end();
        console.log('Fail!');
    }

    //res.render('test', {data: data});
});

app.get('/', function (req, res) {
    res.render('test', {
        data: data
    });
});

app.listen(process.env.PORT || 80);