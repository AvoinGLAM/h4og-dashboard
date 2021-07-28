import people from './components/types/people';
import collections from './components/types/collections';
import ghost from './components/types/ghost';
import projects from './components/types/projects';

// to-do: combine these two objects into array of objects
export const displayTypes = {
    "All": "",
    "People": "people",
    "Workshops": "workshops",
    "Projects": "projects",
    "Collections and Datasets": "collections"
};

export const typeComponents = {
    people,
    collections,
    ghost,
    projects
};

export function getDisplayTypeName(displayType) {
    return Object.keys(displayTypes).find(key => displayTypes[key] === displayType);
}