# Hack4OpenGLAM Dashboard

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.

The app fetches data from Google Forms, parses it, and visualizes it publicly on a web interface. [Learn more about Hack4OpenGLAM (summit.creativecommons.org)...](https://summit.creativecommons.org/hack4openglam-launch/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn v1migrate:win32`

Migrates Hack4OpenGLAM 2020's data into Hack4OpenGLAM 2021's data format. Can be used as a sample dataset for development purposes. Move the `latest.json` and `usercontent_cache/` in the `tools/v1migration/` folder first. You can ask Mikael for a copy of the dataset.
