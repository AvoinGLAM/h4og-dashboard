import { PeopleCard, CollectionsCard, GhostCard } from './components/types/cards';
import { PeoplePage, CollectionsPage } from './components/types/pages';

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
    }
};

export function getDisplayTypeName(displayType) {
    return Object.keys(displayTypes).find(key => displayTypes[key] === displayType);
}