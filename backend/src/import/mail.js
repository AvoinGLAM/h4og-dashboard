import nodemailer from 'nodemailer';
import config from '../../../config/config.json';
import logger from '../logger/logger.js';

const transport = nodemailer.createTransport(config.smtp);
const isDryRun = process.argv.includes('--dry-run') ? 'DRY ' : '';

export const sendMail = (options) => {
    logger.info(`${isDryRun}Sending mail to ${options.to} (${options.internal})`);

    if (isDryRun) return;
    return transport.sendMail({
        from: config.mailFrom,
        ...options
    });
};


export const mailTemplates = {
    newUserAndChannel: (name, slug) => (
`Hello ${name}!
            
Thank you for your registration.

We have created a text channel for you on our community platform. Please sign up using the following link: 

https://community.okf.fi/signup_user_complete/?id=3r9hjzqzx3g1xj55ynumk9isny&redirect_to=%2Fhack4openglam%2Fchannels%2Fproject-${slug}

If you have already signed up, you can access your text channel #project-${slug} using the following link:

https://community.okf.fi/hack4openglam/channels/project-${slug}

If you wish to edit your submission, you can do so here:
https://docs.google.com/forms/d/e/1FAIpQLSc-ANlrZl9HDIYOP8d2MRzFK7v6WOuzNOpYxy2Roy-pgX3BOg/viewform


---
The Hack4OpenGLAM Team`),

    newUser: (name) => (
`Hello ${name}!

Thank you for your registration.

Please sign up to our community platform using the following link: 

https://community.okf.fi/signup_user_complete/?id=3r9hjzqzx3g1xj55ynumk9isny

If you wish to edit your submission, you can do so here:
https://docs.google.com/forms/d/e/1FAIpQLSc-ANlrZl9HDIYOP8d2MRzFK7v6WOuzNOpYxy2Roy-pgX3BOg/viewform


---
The Hack4OpenGLAM Team`
    )
};