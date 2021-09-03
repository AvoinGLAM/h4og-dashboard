import { proposalTypes } from './utils.js';


/*
Check row:
 - translate row letters into numbers
 - index - 1

EXAMPLE: W - 23 -> [22]

BB -> 54 -> [53]
*/

/**
 * Cast raw row data into a formatted object
 * @param {Array} data Raw row data from the spreadsheet
 * @returns {Object}
 */
 export const mapData = (data, extrasData) => ({
    timestamp: data[0],
    person: {
        email: data[1],
        firstName: data[3],
        lastName: data[4],
        organization: data[5],
        organizationRole: data[51],
        volunteering: data[6],
        shortDescription: data[7],
        timezone: data[8],
        city: data[9],
        describers: data[10],
        interests: data[11],
        languages: data[12],
        otherLanguages: data[13],
        socials: {
            website: data[14],
            twitter: data[15],
            github: data[16],
            facebook: data[17],
            instagram: data[18],
            flickr: data[19],
            linkedin: data[20],
            wikimedia: data[21]
        },
        emailAllowed: data[22] == 'Yes',
        pictureUrl: data[23],
        eventRole: extrasData ? extrasData[2] : false
    },
    proposal: {
        type: data[29],
        keywords: data[53],
        title: data[30],
        shortDescription: data[31],
        description: data[32],
        links: {
            homepage: data[34],
            codebase: data[35]
        },
        media: {
            thumbnail: data[36],
            video: data[37]
        }
    },
    collection: {
        holder: data[38],
        url: data[39],
        country: data[40],
        access: data[41],
        copyright: data[42],
        considerations: data[43],
        contactEmail: data[44]
    },
    workshop: {
        language: data[45],
        requirements: data[46],
        level: data[47]
    },
    importedBefore: extrasData ? extrasData[1] : '0' // Make sure this matches with the letters in import.js
});

/**
 * Check what data types a row contains
 * @param {Array} row 
 * @returns {Array}
 */
export const findDataTypes = (row) => {
    let types = [];
    if (row.person.firstName) types.push("people");
    if (row.proposal.type == proposalTypes["collections"]) types.push("collections");
    if (row.proposal.type == proposalTypes["projects"]) types.push("projects");
    if (row.proposal.type == proposalTypes["tools"]) types.push("tools");
    if (row.proposal.type == proposalTypes["workshops"]) types.push("workshops");

    return types;
};