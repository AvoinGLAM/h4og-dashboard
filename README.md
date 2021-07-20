# Hack4OpenGLAM Dashboard 

[![Build and push](https://github.com/AvoinGLAM/h4og-dashboard/actions/workflows/main.yml/badge.svg)](https://github.com/AvoinGLAM/h4og-dashboard/actions/workflows/main.yml)

The app fetches data from Google Forms, parses it, and visualizes it publicly on a web interface. [Learn more about Hack4OpenGLAM (summit.creativecommons.org)...](https://summit.creativecommons.org/hack4openglam-launch/)

## Front-end

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn v1migrate:win32`

Migrates Hack4OpenGLAM 2020's data into Hack4OpenGLAM 2021's data format. Can be used as a sample dataset for development purposes. Move the `latest.json` and `usercontent_cache/` in the `tools/v1migration/` folder first. You can ask Mikael for a copy of the dataset.

### Attributions

#### [/src/assets/images/frame.png](https://github.com/ahnl/h4og-dashboard/blob/master/src/assets/images/frame.png)
Commons user Sailko, CC BY 3.0 <https://creativecommons.org/licenses/by/3.0>, via Wikimedia Commons

#### [/src/assets/images/frame2.png](https://github.com/ahnl/h4og-dashboard/blob/master/src/assets/images/frame2.png)
["Goldener Bilderrahmen - gold picture frame"](https://www.flickr.com/photos/37977505@N00/2303608353) by [eriwst](https://www.flickr.com/photos/37977505@N00) is licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/?ref=ccsearch&atype=rich)

## Back-end

### Troubleshooting

#### `Error: invalid_grant: Invalid JWT: Token must be a short-lived token (60 minutes) and in a reasonable timeframe. Check your iat and exp values in the JWT claim.`
Check if the clock in the Docker container is off. You can re-sync the clock by running the following command:
`docker run --rm --privileged node:lts-alpine hwclock -s`
