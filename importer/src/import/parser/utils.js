import axios from 'axios';
import crypto from 'crypto';

export const randomDefaultPictureIndex = () => Math.floor(Math.random() * 9);

export const proposalTypes = {
    "projects": "Project",
    "workshops": "Workshop",
    "collections": "Dataset, collection",
    "tools": "Technology, tool or platform"
}

/**
 * Tests if picture url is accessible and is an image
 * @param {...String} url Input one or multiple urls
 * @returns The passed url if image is found working,otherwise false
 */
export const testPictureUrl = async (...urls) => {
    for (const url of urls) {
        try {
            if (!url) continue;
    
            const response = await axios.head(url);
            if (!response.headers['content-type'].includes('image')) throw `Not an image: ${response.headers['content-type']}`;
            
            return url;
        } catch (reason) {
            continue;
        }
    }
    return false;
}

export const getGravatarUrl = (email) => 'https://www.gravatar.com/avatar/' + crypto.createHash('md5').update(email).digest('hex') + '?d=404';