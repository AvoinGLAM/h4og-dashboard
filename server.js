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
const ejs = require('ejs')
const linkify = require('linkifyjs/html');
let data;
let production = false;

(async () => {
    if (process.env.NODE_ENV) {
        production = process.env.NODE_ENV.trim().toLowerCase() == 'production';
    } else {
        data = await parse.updateData();
        console.log('[DEVELOPMENT] Data parsed and saved to the variable!');
    }
    if (config.spreadsheet && googleCreds.client_email) {
        console.log('[H4OG] Make sure to have sheet ' + config.spreadsheet + ' shared to ' + googleCreds.client_email);
    } else {
        throw 'Configuration variables missing';
    }
    console.log('');
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

app.get('/', async function (req, res, next) {
    let refreshed;
    if (production) {
        let startTime = new Date().getTime();
        data = await parse.updateData();
        refreshed = (new Date().getTime() - startTime);
    }
    if (data != undefined) {
        console.log(new Date(), '[HTTP] [R=' + (refreshed ? refreshed + 'ms' : 'n/A') + '] Requested / by ' + req.headers['user-agent']);
        res.render('test', {
            data: data,
            baseurl: config.baseurl || ''
        });
    } else {
        next();
    }
});
/*
function findEverywhereByIndex(index) {
    function find(index, where) {
        var result = Object.values(data[where]).filter(obj => {
            return obj.index === index;
        })
        if (result.length > 0) {
            return {
                data: result[0],
                type: where
            };
        } else {
            return false;
        }
    }
    let people =        find(index, 'people');
    let projects =      find(index, 'projects');
    let collections =   find(index, 'collections');
    return (people || projects || collections);
}*/
function findByIndex(index, where) {
    try {
        var result = Object.values(data[where]).filter(obj => {
            return obj.index === index;
        })
        if (result.length > 0) {
            return {
                data: result[0],
                type: where
            };
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}
//if (!production) {
/* development routes */
app.get('/modal', async function (req, res, next) {
    if (req.query.id && req.query.type) {
        let query = findByIndex(parseInt(req.query.id), req.query.type);
        if (query) {
            res.render('modal', {
                ...query,
                baseurl: config.baseurl || '',
                escape: ejs.escapeXML,
                linkify: linkify
            });
        } else {
            res.end('');
        }

    } else {
        res.status(400).end('Bad Request');
    }
});
//}

app.use((req, res) => {
    res.end('Something unexpected happened! Please come back later to try again.');
});

app.listen(process.env.PORT || 80);