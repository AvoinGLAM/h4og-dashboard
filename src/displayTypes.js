export const displayTypes = {
    "All": "",
    "Workshops": "workshops",
    "People": "people",
    "Projects": "projects",
    "Collections and Datasets": "collections"
};

export function getDisplayTypeName(displayType) {
    return Object.keys(displayTypes).find(key => displayTypes[key] === displayType);
}