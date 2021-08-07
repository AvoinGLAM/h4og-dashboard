import { FaTwitter, FaGithub, FaFacebook, FaInstagram, FaFlickr, FaLinkedin, FaWikipediaW, FaGlobe, FaLaptopCode, FaComments } from 'react-icons/fa';

import '../../styles/inline.css';

const socialPlatforms = {
    "website": {
        icon: FaGlobe,
        name: "Website",
        
    },
    "twitter": {
        icon: FaTwitter,
        name: "Twitter",
        urlStart: 'https://twitter.com/'
    },
    "github": {
        icon: FaGithub,
        name: "GitHub",
        urlStart: 'https://github.com/'
    },
    "facebook": {
        icon: FaFacebook,
        name: "Facebook",
        urlStart: 'https://facebook.com/'
    },
    "instagram": {
        icon: FaInstagram,
        name: "Instagram",
        urlStart: 'https://instagram.com/'
    },
    "flickr": {
        icon: FaFlickr,
        name: "Flickr",
        urlStart: 'https://www.flickr.com/photos/'
    },
    "linkedin": {
        icon: FaLinkedin,
        name: "LinkedIn",
        urlStart: 'https://www.linkedin.com/in/'
    },
    "wikimedia": {
        icon: FaWikipediaW,
        name: "Wikimedia",
        urlStart: 'https://meta.wikimedia.org/wiki/User:'
    },
    "homepage": {
        icon: FaGlobe,
        name: "Homepage",
    },
    "codebase": {
        icon: FaLaptopCode,
        name: "Codebase",
    },
    "slack": {
        icon: FaComments,
        name: "Join the channel on Mattermost!"
    }
};

function SocialTile({platformKey, target}) {
    const platform = socialPlatforms[platformKey];
    const Icon = platform.icon;

    if (target.trim().length === 0) return <></>;

    return (
        <a className="socialTile" href={normalizeSocial(target, platform.urlStart)} target="_blank" rel="noreferrer">
            <Icon />
            <span className="platformName">
                {platform.name}
            </span>
        </a>
    )
}
export function Socials({data}) {
    if (typeof data != "object") return <></>;

    return (
        <div className="socials">
            {Object.keys(data).map(social => (
                <SocialTile platformKey={social} target={data[social]} />   
            ))}            
        </div>
    );
} 

export function isSocialsEmpty(data) {
    return !Object.keys(data).some(key => (data[key].trim().length !== 0));
}

// from h4og-dashboard v1.0
function normalizeSocial(input, urlStart) {
    console.log(input, urlStart)
    if (!urlStart) return input;

    if (!urlStart) return input;

    let str = input.trim().replace('www.', '');
    let url;

    if (urlStart.includes('wikimedia.org') && str.startsWith('User:')) {
        str = str.split('User:')[1];
    }
    if (input.length > 0) {
        if (!str.startsWith('http')) {
            if (!str.startsWith(urlStart)) {
                if (!str.startsWith('@')) {
                    if (!str.includes('@') && !str.includes(' ')) {
                        url = urlStart + str;
                    } else {
                        url = '';
                    }
                } else {
                    url = urlStart + str.substring(1);
                }
            } else {
                url = str;
            }

        } else {
            url = str;
        }
    } else {
        url = '';
    }

    return url;
}