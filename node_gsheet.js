// node_gsheet.js
// By Josh Sonstroem (jsonstro@ucsc.edu)
//
// (Modified version of docs from: https://developers.google.com/drive/v3/web/quickstart/nodejs)
// Step 1: Turn on the Drive API
// a) Use this wizard (https://console.developers.google.com/start/api?id=drive) to create or select a project in the Google Developers Console and automatically turn on the API. Click Continue, then Go to credentials.
// b) On the Add credentials to your project page, click the Cancel button.
// c) At the top of the page, select the OAuth consent screen tab. Select an Email address, enter a Product name if not already set, and click the Save button.
// d) Select the Credentials tab, click the Create credentials button and select OAuth client ID.
// e) Select the application type Other, enter the name "Drive API Quickstart", and click the Create button.
// f) Click OK to dismiss the resulting dialog.
// h) Click the file_download (Download JSON) button to the right of the client ID.
// i) Move this file to your working directory and rename it client_secret.json
//
// Sign in and get the code
// Enter the code in the terminal and press enter
//

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
//var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
//var SCOPES = ['https://www.googleapis.com/auth/drive.metadata'];
var SCOPES = ['https://www.googleapis.com/auth/drive'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

const fs = require('fs');
const readline = require('readline');
const {OAuth2Client} = require('google-auth-library');
const {google} = require('googleapis')
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const opn = require('opn');
const util = require('util');
const keys = require('./credentials.json');

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

/**
 * This is the main loop which does the searches
 */
async function main() {
  getCreds(TOKEN_PATH)
  .then(oa2 => {
    listFiles(oa2);
    listMajors(oa2);
  })
  .catch(err => {
    console.error(err);
  });
}

/**
 * This function returns a pre-authenticated oAuth2 client token from file
 *
 * @param {Object} token The token to be read from disk.
 */
function getCreds(token) {
  return new Promise((resolve, reject) => {
    const oAuth2Client = new OAuth2Client(
      keys.installed.client_id,
      keys.installed.client_secret,
      keys.installed.redirect_uris[0]
    );
    readFile(token, 'utf-8')
    .then(result => {
      oAuth2Client.credentials = JSON.parse(result);
      console.log('Using Token from ' + TOKEN_PATH);
      resolve(oAuth2Client);
    })
    .catch(async err => {
      // Didn't find token in file so generate a new one, then store it
      const oAuth2Client = await getAuthenticatedClient();
      storeToken(oAuth2Client)
      .then(res => {
        resolve(res);
      })
    });
  })
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  return new Promise((resolve, reject) => {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token.credentials), (error) => { if (error) { console.error(error); } });
    console.log('Token stored to ' + TOKEN_PATH);
    resolve(token);
  });
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors (auth) {
  const sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E'
  }, (err, res) => {
    console.log("");
    if (err) {
      console.error('The API returned an error.');
      throw err;
    }
    const rows = res.data.values;
    if (rows.length === 0) {
      console.log('No data found.');
    } else {
      console.log('Name, Major:');
      for (const row of rows) {
        // Print columns A and E, which correspond to indices 0 and 4.
        console.log(`${row[0]}, ${row[4]}`);
      }
    }
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const service = google.drive('v3');
  service.files.list({
    auth: auth,
    pageSize: 10,
    fields: "nextPageToken, files(id, name)"
  }, function(err, response) {
    console.log("");
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    const files = response.data.files;
    if (files.length == 0) {
      console.log('No files found.');
    } else {
      console.log('Files:');
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log('%s (%s)', file.name, file.id);
      }
    }
  });
}

/**
 * Create a new OAuth2Client, and go through the OAuth2 content
 * workflow.  Return the full client to the callback.
 */
function getAuthenticatedClient() {
  return new Promise((resolve, reject) => {
    // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
    // which should be downloaded from the Google Developers Console.
    const oAuth2Client = new OAuth2Client(
      keys.installed.client_id,
      keys.installed.client_secret,
      keys.installed.redirect_uris[0]
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES[0]
    });

    opn(authorizeUrl);

    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter the code from that page here: ', function(code) {
      rl.close();
      // console.log(`Code is ${code}`);
      // Now that we have the code, use that to acquire tokens.
      oAuth2Client.getToken(code)
        .then(result=>{
          // console.info(result);
          // Make sure to set the credentials on the OAuth2 client.
          oAuth2Client.setCredentials(result.tokens);
          console.info('Tokens acquired.');
          // console.info(result.tokens);
          resolve(oAuth2Client);
        })
        .catch(error=>{
          console.error(error);
        });
    });
  });
}

main();
