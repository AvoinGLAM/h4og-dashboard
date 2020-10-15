const {
    GoogleSpreadsheet
} = require('google-spreadsheet');
let doc;
const fs = require('fs');
const crypto = require('crypto');
const stream = require('stream');
const {
    promisify
} = require('util');
const got = require('got');
const pipeline = promisify(stream.pipeline);
let baseurl;

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
            return undefined;
    }
}
async function cacheImage(url) {
    try {
        const cacheSalt = 'just-in-case';
        let hash = crypto.createHash('md5').update(url + cacheSalt).digest("hex");
        let filename = 'usercontent_cache/' + hash;
        if (!fs.existsSync(filename)) {
            if (url.startsWith('http')) {
                console.log('[CACHE] Downloading ' + filename)
                await pipeline(
                    got.stream(url, {
                        headers: {
                            'Accept': 'image/*'
                        }
                    }),
                    fs.createWriteStream(filename)
                );
                return baseurl + '/' + filename;
            } else {
                return url;
            }
        } else {
            return baseurl + '/' + filename;
        }
    } catch (e) {
        return url;
    }
   

}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

function normalizeSocial(input, urlStart) {
    let str = input.trim().replace('www.', '');
    let url;

    if (urlStart.includes('wikimedia.org') && str.startsWith('User:')) {
        str = str.split('User:')[1];
    }
    if (input.length > 0) {
        if (!str.startsWith('http')) {
            if (!str.startsWith(urlStart)) {
                if (!str.startsWith('@')) {
                    if (!str.includes('@') && !str.includes(' ')) {
                        url = urlStart + str;
                    } else {
                        url = '';
                    }
                } else {
                    url = urlStart + str.substring(1);
                }
            } else {
                url = str;
            }

        } else {
            url = str;
        }
    } else {
        url = '';
    }

    return url;
}
function parsePresenters(data) {
    if (data) {
        presenters = [];
        presentersRows = data.trim().split('\n');
        presentersRows.forEach((presenter) => {
            let name = '';
            let address = '';
            if (presenter.includes(',') || presenter.includes(' ')) {
                let presenterData = presenter.trim().replace(', ', ',').split(/,| /g);

                if (presenterData[presenterData.length - 1].includes('.')) {
                    address = presenterData[presenterData.length - 1];
                    presenterData.pop();
                }
                name = presenterData.join(' ');
            } else {
                name = presenter;
            }
            presenters.push({
                name: name,
                address: address
            });
        });
        return presenters;
    } else {
        return;
    }
}
async function parseRow(row, i) {
    if (row['Spam'] == "yes") {
        //Spam!
        return;
    }
    if (data.people[row['Sähköpostiosoite']] == undefined) {
        data.people[row['Sähköpostiosoite']] = {};
    }
    let pictureURL = await cacheImage(row['Picture URL']);

    let languages = titleCase(row['Which languages are you comfortable working with?'].trim().replaceAll('& ', ' ').replaceAll('and ', ' ').replaceAll(',', ' ').replace(/\s+/g, " ").replace(/ *\([^)]*\) */g, "")).split(' '); // clean up and try to normalize the messy data

    let tempPerson = {
        index: i,
        name: row['First name'],
        organization: row['Your organization'],
        special: row['Special'],
        description: row['Write one sentence about yourself to introduce you to the other participants'],
        timezone: parseTimezone(row["What's your timezone group?"]),
        timezoneText: row["What's your timezone group?"],
        type: titleCase(row['Which of these best describe you']).trim(),
        skillsAndInterests: row['List some skills and interests you would like to work with'],
        languages: languages.join(', '),
        website: row['Website'],
        social: {
            twitter: normalizeSocial(row['Twitter'], 'https://twitter.com/'),
            facebook: normalizeSocial(row['Facebook'], 'https://facebook.com/'),
            linkedin: normalizeSocial(row['LinkedIn'], 'https://www.linkedin.com/in/'),
            wikimedia: normalizeSocial(row['Wikimedia'], 'https://meta.wikimedia.org/wiki/User:'),
            github: normalizeSocial(row['GitHub'], 'https://github.com/'),
            instagram: normalizeSocial(row['Instagram'], 'https://instagram.com/'),
            flickr: normalizeSocial(row['Flickr'], 'https://www.flickr.com/photos/'),
        },
        picture: pictureURL,
        gravatar: gravatarURL(row['Sähköpostiosoite'])
    }
    languages.forEach((language) => {
        if (!data.meta.languages.join(', ').toLowerCase().includes(language.toLowerCase())) {
            data.meta.languages.push(language);
        }
    });
    row['Which of these best describe you'].split(', ').forEach((item) => {
        if (!data.meta.types.join(',').toLowerCase().includes(item.toLowerCase().trim())) {
            data.meta.types.push(titleCase(item).trim());
        }
    });

    data.people[row['Sähköpostiosoite']] = merge(tempPerson, data.people[row['Sähköpostiosoite']]);
    if (row['What kind of proposal is it?'] == 'Dataset, collection') {
        let collectionId = row['Sähköpostiosoite'] + '-' + row['Title'];
        if (data.collections[collectionId] == undefined) {
            data.collections[collectionId] = {};
        }

        let pictureURL = await cacheImage(row['Link to a thumbnail image']);

        data.collections[collectionId] = {
            index: i,
            title: row['Title'],
            short: row['Write a one-sentence description to use on the web'],
            description: row['Description'],
            interests: row['List some skills and interests you would like to work with'],
            homepage: row['Link to documentation / homepage'],
            codebase: row['Link to the codebase'],
            api: row['API url'],
            search: row['Search url'],
            help: row['Help url'],
            thumbnail: pictureURL,
            owner: {
                name: data.people[row['Sähköpostiosoite']].name,
                email: row['Sähköpostiosoite']
            },
            organization: row['The holder of the collection'],
            country: row['The country of origin of the collection'],
            access: row['How can the collection be accessed?'],
            copyright: row['Copyright status of the collection'],
            video: row['Link to a presentation video'],
            other: row['Other considerations'],
            contact: row['Contact information'],
            type: row['What kind of proposal is it?']
        };
    } else if (row['What kind of proposal is it?'] == 'Workshop') {
        let workshopId = row['Sähköpostiosoite'] + '-' + row['Title'];
        if (data.workshops[workshopId] == undefined) {
            data.workshops[workshopId] = {};
        }
        let pictureURL = await cacheImage(row['Link to a thumbnail image']);
        let presenters = parsePresenters(row['Presenters']);
        data.workshops[workshopId] = {
            index: i,
            title: row['Title'],
            short: row['Write a one-sentence description to use on the web'],
            description: row['Description'],
            homepage: row['Link to documentation / homepage'],
            codebase: row['Link to the codebase'],
            hopin: row['Hopin'],
            time: row['Time'],
            presenters: presenters,
            thumbnail: pictureURL,
            typ: row['What kind of proposal is it?'],
            video: row['Link to a presentation video'],
            owner: {
                name: data.people[row['Sähköpostiosoite']].name,
                email: row['Sähköpostiosoite']
            }
        };
    } else if (row['What kind of proposal is it?'] != '') {
        let projectId = row['Sähköpostiosoite'] + '-' + row['Title'];
        if (data.projects[projectId] == undefined) {
            data.projects[projectId] = {};
        }
        let pictureURL = await cacheImage(row['Link to a thumbnail image']);
        let presenters = parsePresenters(row['Presenters']);
        
        data.projects[projectId] = {
            index: i,
            title: row['Title'],
            short: row['Write a one-sentence description to use on the web'],
            description: row['Description'],
            homepage: row['Link to documentation / homepage'],
            codebase: row['Link to the codebase'],
            slack: row['Slack'],
            presenters: presenters,

            type: row['What kind of proposal is it?'],
            thumbnail: pictureURL,

            video: row['Link to a presentation video'],
            owner: {
                name: data.people[row['Sähköpostiosoite']].name,
                email: row['Sähköpostiosoite']
            }
        };
    }
}

function gravatarURL(email) {
    return 'https://www.gravatar.com/avatar/' + crypto.createHash('md5').update(email).digest('hex') + '?d=404';
}

module.exports = function (creds, config) {
    doc = new GoogleSpreadsheet(config.spreadsheet);
    baseurl = config.baseurl;
    return {
        updateData: async function () {
            data = {
                people: {},
                projects: {},
                collections: {},
                workshops: {},
                meta: {
                    languages: [],
                    types: []
                }
            };

            await doc.useServiceAccountAuth(creds);

            await doc.loadInfo();
            const sheet = doc.sheetsByIndex[0];
            const rows = await sheet.getRows();
            rows.forEach(parseRow);

            return data;
        }
    };
}