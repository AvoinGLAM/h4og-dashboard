const googleCreds = require('./config/google-key.json');
const config = require('./config/config.json');
const parse = require('./parse.js')(googleCreds, config);
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const readChunk = require('read-chunk')
const fileType = require('file-type')
const cors = require('cors')
let data;

(async () => {
    data = await parse.updateData();
    console.log('Ready!');
    fs.writeFile('latest.json', JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        }
    })
})();

app.set('view engine', 'ejs');
app.use(cors())

app.use(express.static('public'))

app.get('/usercontent_cache/:filename', async function (req, res) {
    const filePath = path.join('./usercontent_cache/', req.params.filename);
    const buffer = readChunk.sync(filePath, 0, 4100);
    const storedMimeType = await fileType.fromBuffer(buffer);
    if (storedMimeType) {
        res.setHeader('Content-Type', storedMimeType.mime);
        fs.createReadStream(filePath).pipe(res);
    } else {
        res.status(404).end();
    }
});

app.get('/', async function (req, res) {
    let refreshed;
    if (process.env.NODE_ENV == 'production') {
        let startTime = new Date().getTime();
        data = await parse.updateData();
        refreshed = (new Date().getTime() - startTime);
    }
    console.log(new Date(), '[HTTP] [R=' + (refreshed ? refreshed + 'ms' : 'n/A') + '] Requested / by ' + req.headers['user-agent']);
    res.render('test', {
        data: data,
        baseurl: config.baseurl || ''
    });
});

app.listen(process.env.PORT || 80);