import people from './components/types/people';
import collections from './components/types/collections';
import ghost from './components/types/ghost';
import projects from './components/types/projects';
import workshops from './components/types/workshops';
import tools from './components/types/tools';

// to-do: combine these two objects into array of objects
export const displayTypes = {
    "All": "",
    "People": "people",
    "Workshops": "workshops",
    "Projects": "projects",
    "Technology, tool or platform": "tools",
    "Collections and Datasets": "collections"
};

export const typeComponents = {
    people,
    collections,
    ghost,
    projects,
    workshops,
    tools
};

export function getDisplayTypeName(displayType) {
    return Object.keys(displayTypes).find(key => displayTypes[key] === displayType);
}