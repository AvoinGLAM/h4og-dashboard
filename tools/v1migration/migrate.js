const fs = require('fs').promises;
const data = require('./latest.json');
const axios = require('axios');

let promises = [];

const languageOptions = {
    "English": "en",
    "Finnish": "fi"
}

const cityOptions = [
    "",
    "Americas",
    "Europe",
    "India",
    "Asia"
];

/**
 * Tests if picture url is accessible and is an image
 * @param {String} url 
 * @returns the passed url if image is working, otherwise false
 */
function testPictureUrl(url) {
    return axios.head(url)
    .then(response => {
        if (!response.headers['content-type'].includes('image')) throw `Not an image: ${response.headers['content-type']}`;
        return url;
    })
    .catch((reason) => {
        return false;
    })
}

/**
 * Input human written presenter info (answer to the question "Write the name and email address of each presenter on a separate row. You can leave the email address out if you wish. ") and return machine readable array with objects of name and address
 * @param {String} data 
 * @returns {Array}
 */
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

// people
for (const email in data.people) {
    promises.push(new Promise(async (resolve, reject) => {
        const person = data.people[email];
        const company = person.organization;
        const name = person.name;
        const type = "people";
        const skills = person.type.split(', ');
        const languages = person.languages.split(', ').map(i => languageOptions[i] || 'unknown');
        const city = cityOptions[person.timezone] || 'The Earth'; 
        const picture = await testPictureUrl(person.picture.length > 0 ? person.picture : person.gravatar); // assuming the v1 server is still up and hosts the pictures
        const defaultPictureIndex = Math.floor(Math.random() * 9);
        // We pick random number 1-9 for default avatar for missing avatars

        const indexFromMigration = person.index;

        resolve({
            type,
            name,
            company,
            skills,
            languages,
            city,
            picture,
            defaultPictureIndex,
            email,
            indexFromMigration
        });
    }))
}

for (const collectionId in data.collections) {
    promises.push(new Promise(async (resolve, reject) => {
        
        const collection = data.collections[collectionId];
        const name = collection.title;
        const type = "collections";

        const shortDescription = collection.short;
        const description = collection.description;
        const access = collection.access;
        const considerations = "";

        const presenters = [{...collection.owner}];
        const links = {
            homepage: collection.homepage,
            codebase: collection.codebase,
            organization: ''
        };
        const media = {
            thumbnail: await testPictureUrl(collection.thumbnail),
            video: collection.video
        };
        const organization = collection.organization; // holder of the collection
        const country = collection.country;
        const copyright = collection.copyright;
        const email = collection.contact;

        const indexFromMigration = collection.index;

        const defaultPictureIndex = Math.floor(Math.random() * 9);

        resolve({
            name,
            type, 
            shortDescription,
            description,
            access,
            considerations,
            presenters,
            links,
            media,
            organization,
            country,
            copyright,
            email,
            defaultPictureIndex,
            indexFromMigration
        });
    }))
}

Promise.all(promises)
    .then((results) => {
        results = results.filter(p => p.name != '');
        results.sort((a, b) => (a.indexFromMigration - b.indexFromMigration));
        results = results.map(i => {
            delete i.indexFromMigration;
            return i;
        });

        console.log(`Saving ${results.length} results`)
        fs.writeFile('output.json', JSON.stringify(results, null, 4));
    })
    .catch((reason) => {
        console.log(reason);
    })


