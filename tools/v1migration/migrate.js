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
        const defaultAvatarIndex = Math.floor(Math.random() * 9);
        // We pick random number 1-9 for default avatar for missing avatars

        resolve({
            type,
            name,
            company,
            skills,
            languages,
            city,
            picture,
            defaultAvatarIndex,
            email
        });
    }))
}

Promise.all(promises)
    .then((results) => {
        console.log(`Saving ${results.length} results`)
        fs.writeFile('output.json', JSON.stringify(results.filter(p => p.name != ''), null, 4));
    })
    .catch((reason) => {
        console.log(reason);
    })


