const {
    GoogleSpreadsheet
} = require('google-spreadsheet');
let doc;
const fs = require('fs');
const crypto = require('crypto');
const stream = require('stream');
const {promisify} = require('util');
const got = require('got');
const pipeline = promisify(stream.pipeline);

let data = {};
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function merge(obj1, obj2) {
    answer = {}
    for (key in obj1) {
        if (answer[key] === undefined || answer[key] === null || answer[key] == '')
            answer[key] = obj1[key];
    }
    for (key in obj2) {
        if (answer[key] === undefined || answer[key] === null || answer[key] == '')
            answer[key] = obj2[key];
    }
    return answer
}

function parseTimezone(str) {
    switch (str) {
        case 'Americas (UTC-8...-3)':
            return 1;
            break;
        case 'Europe, Africa & Middle East (UTC-2...+3)':
            return 2;
            break;
        case 'India & Central Asia (UTC+4...+7)':
            return 3;
            break;
        case 'Asia-Pacific (UTC+8...+12)':
            return 4;
            break;
        default:
            return -1;
    }
}
async function cacheImage(url) {
    const cacheSalt = 'just-in-case';
    let hash = crypto.createHash('md5').update(url + cacheSalt).digest("hex");
    let filename = 'usercontent_cache/' + hash;
    if (!fs.existsSync(filename)) {
        if (url.startsWith('http')) {
            console.log('Downloading ' + filename)
            await pipeline(
                got.stream(url, {
                    headers: {
                        'Accept': 'image/*'
                    }
                }),
                fs.createWriteStream(filename)
            );
            return filename;
        } else {
            return url;
        }
    } else {
        return filename;
    }

}

async function parseRow(row, i) {
    if (row['Spam'] == "yes") {
        console.log('Spam!');
        return;
    }
    if (data.people[row['Sähköpostiosoite']] == undefined) {
        console.log('New people')
        data.people[row['Sähköpostiosoite']] = {};
    }
    let pictureURL = await cacheImage(row['Picture URL']);
    let tempPerson = {
        index: i,
        name: row['First name'],
        organization: row['Your organization'],
        special: row['Special'],
        description: row['Write one sentence about yourself to introduce you to the other participants'],
        timezone: parseTimezone(row["What's your timezone group?"]),
        type: row['Which of these best describe you'],
        skillsAndInterests: row['List some skills and interests you would like to work with'],
        languages: row['Which languages are you comfortable working with?'].trim().replaceAll('& ', ' ').replaceAll('and ', ' ').replaceAll(',', ' ').replace(/\s+/g, " ").split(' ').join(', '),
        website: row['Website'],
        social: {
            twitter: row['Twitter'],
            facebook: row['Facebook'],
            linkedin: row['LinkedIn'],
            wikimedia: row['Wikimedia'],
            github: row['GitHub'],
            instagram: row['Instagram'],
            flickr: row['Flickr'],
        },
        picture: pictureURL,
        gravatar: gravatarURL(row['Sähköpostiosoite'])
    }
    data.people[row['Sähköpostiosoite']] = merge(tempPerson, data.people[row['Sähköpostiosoite']]);
    if (row['What kind of proposal is it?'] == 'Project') {
        let projectId = row['Sähköpostiosoite'] + '-' + row['Title'];
        if (data.projects[projectId] == undefined) {
            console.log('New project')
            data.projects[projectId] = {};
        }
        data.projects[projectId] = {
            index: i,
            title: row['Title'],
            description: row['Description'],
            homepage: row['Link to documentation / homepage'],
            codebase: row['Link to the codebase'],
            thumbnail: row['Link to a thumbnail image'],
            video: row['Link to a presentation video'],
            owner: {
                name: data.people[row['Sähköpostiosoite']].name,
                email: row['Sähköpostiosoite']
            }
        };
    } else if (row['What kind of proposal is it?'] == 'Dataset, collection') {
        let collectionId = row['Sähköpostiosoite'] + '-' + row['Title'];
        if (data.collections[collectionId] == undefined) {
            console.log('New collection')
            data.collections[collectionId] = {};
        }
        data.collections[collectionId] = {
            index: i,
            title: row['Title'],
            description: row['Description'],
            homepage: row['Link to documentation / homepage'],
            codebase: row['Link to the codebase'],
            thumbnail: row['Link to a thumbnail image'],
            owner: {
                name: data.people[row['Sähköpostiosoite']].name,
                email: row['Sähköpostiosoite']
            },
            organization: row['The holder of the collection'],
            country: row['The country of origin of the collection'],
            access: row['How can the collection be accessed?'],
            copyright: row['Copyright status of the collection'],
            other: row['Other considerations'],
            contact: row['Contact information']
        };
    }

}

function gravatarURL(email) {
    return 'https://www.gravatar.com/avatar/' + crypto.createHash('md5').update(email).digest('hex') + '?d=404';
}

module.exports = function (creds, spreadsheet) {
    doc = new GoogleSpreadsheet(spreadsheet);
    return {
        updateData: async function () {
            data = {
                people: {},
                projects: {},
                collections: {}
            };

            await doc.useServiceAccountAuth(creds);

            await doc.loadInfo();
            //console.log(doc.title);
            const sheet = doc.sheetsByIndex[0];
            const rows = await sheet.getRows();

            rows.forEach(parseRow);

            return data;
        }
    };
}