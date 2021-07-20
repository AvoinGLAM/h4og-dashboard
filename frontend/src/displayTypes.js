import { PeopleCard, CollectionsCard, GhostCard, ProjectsCard } from './components/types/cards';
import { PeoplePage, CollectionsPage, ProjectsPage } from './components/types/pages';

export const displayTypes = {
    "All": "",
    "People": "people",

    "Workshops": "workshops",
    "Projects": "projects",
    "Collections and Datasets": "collections"
};

// "Card" stands for what is shown in the results
// "Single" stands for a full page about the single card
export const typeComponents = {
    "people": {
        card: PeopleCard,
        page: PeoplePage
    },
    
    "collections": {
        card: CollectionsCard,
        page: CollectionsPage
    },

    "ghost": {
        card: GhostCard
    },

    "projects": {
        card: ProjectsCard,
        page: ProjectsPage
    }
};

export function getDisplayTypeName(displayType) {
    return Object.keys(displayTypes).find(key => displayTypes[key] === displayType);
}