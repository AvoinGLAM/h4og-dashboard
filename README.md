# hack4openglam-visualization

# Getting Started

## Installation
Clone this repo to your local machine. Run command `npm install` to install the required dependencies.

## Setup
### Step 1: Set up your Google Project & enable the Sheets API

1. Go to the [Google Developers Console](https://console.developers.google.com/)
2. Select your project or create a new one (and then select it)
3. Enable the Sheets API for your project
4. In the sidebar on the left, select APIs & Services > Library
5. Search for "sheets"
6. Click on "Google Sheets API"
7. click the blue "Enable" button

### Step 2: Create a service account

1. Follow steps above to set up project and enable sheets API
2. Create a service account for your project
* In the sidebar on the left, select APIs & Services > Credentials
* Click blue "+ CREATE CREDENITALS" and select "Service account" option
* Enter name, description, click "CREATE"
* You can skip permissions, click "CONTINUE"
* Click "+ CREATE KEY" button
* Select the "JSON" key type option
* Click "Create" button
* your JSON key file is generated and downloaded to your machine (it is the only copy!)
* click "DONE"
* note your service account's email address (also available in the JSON key file)
3. **Share the Google Sheet (that is connected to the Forms) with your service account using the email noted above** (important)

### Step 3: Create the configuration files

1. Move the JSON key file downloaded in the previous step to `config/google-key.json`
2. Create a JSON file `config/config.json`, with the following content:
```json
{
    "spreadsheet": "SPREADSHEET_ID_HERE"
}
```
You can obtain the spreadsheet ID from the URL-address of the spreadsheet, which looks like this: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID_IS_HERE]/edit`

## Usage

Run the server using `npm start`. The server will start on http://localhost:80.

You can also optionally specify `PORT` environment variable to change the http server port. 
