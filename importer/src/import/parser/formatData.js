import * as utils from './utils.js';
import * as rawRow from './rawRow.js';

// Proposal data types (collections, projects, tools, workshops) share the same base object

const proposalBase = (row, index) => {
    const { proposal, person } = row;
    return {
        name: proposal.title,
        shortDescription: proposal.shortDescription,
        description: proposal.description,
        keywords: proposal.keywords,
        links: {
            homepage: proposal.links.homepage,
            codebase: proposal.links.codebase
        },
        index: index,
        meta: {
            owner: {
                name: person.firstName,
                email: person.email
            },
            importedBefore: row.importedBefore
        },
        defaultPictureIndex: utils.randomDefaultPictureIndex(),
    };
}
const people = async (row, index) => {
    const { person } = row;

    return {
        type: "people",
        name: person.firstName,
        lastName: person.lastName,
        company: person.organization,
        companyRole: person.organizationRole,
        languages: person.languages?.split('\n'), // make use of the otherLanguages as well
        skills: person.describers?.split('\n'), // consider splitting also by a comma, in case someone doesn't read the instructions
        interests: person.interests?.split('\n'), // consider splitting also by a comma, in case someone doesn't read the instructions
        city: person.city,
        picture: await utils.testPictureUrl(
            person.pictureUrl, 
            utils.getGravatarUrl(person.email)
        ),
        defaultPictureIndex: utils.randomDefaultPictureIndex(),
        email: person.email,
        index: index,
        description: person.shortDescription,
        social: person.socials, // we should maybe do some parsing for these, we'll see
        meta: { // Meta object will be removed later in the import process
            emailAllowed: person.emailAllowed, 
            importedBefore: row.importedBefore,
            rowIncludesProjectProposal: rawRow.findDataTypes(row).includes("projects"),
            lastName: person.lastName
        },
        eventRole: person.eventRole
    }
}

const collections = async (row, index) => {
    const { collection } = row;

    return {
        ...proposalBase(row, index),
        type: "collections",
        access: collection.access,
        considerations: collection.considerations,
        organization: collection.holder,
        country: collection.country,
        copyright: collection.copyright,
        media: {
            thumbnail: await utils.testPictureUrl(row.proposal.media.thumbnail),
            video: row.proposal.media.video
        },
        contactEmail: collection.contactEmail
    };
};

const projects = async (row, index) => {
    const { proposal } = row;
    const data = {
        ...proposalBase(row, index),
        type: "projects",
        media: {
            thumbnail: await utils.testPictureUrl(proposal.media.thumbnail),
            video: proposal.media.video,
        }
    };

    return data;
}

const workshops = async (row, index) => {
    const { workshop } = row;

    return {
        ...proposalBase(row, index),
        type: "workshops",
        language: workshop.language,
        requirements: workshop.requirements,
        media: {
            thumbnail: await utils.testPictureUrl(row.proposal.media.thumbnail),
            video: row.proposal.media.video
        },
        level: workshop.level
    };
}

const tools = async (row, index) => {
    const { proposal } = row;
    const data = {
        ...proposalBase(row, index),
        type: "tools",
        media: {
            thumbnail: await utils.testPictureUrl(proposal.media.thumbnail),
            video: proposal.media.video,
        }
    };
    data.meta.importedBefore = row.importedBefore;

    return data;
};

export const type = {
    "people": people,
    "collections": collections,
    "workshops": workshops,
    "projects": projects,
    "tools": tools
}