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
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

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

// add our sequelize db model
const Data = require('./server/models').Data

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

/**
 * This is the main loop which does the searches
 */
async function main() {
  getCreds(TOKEN_PATH)
  .then(oa2 => {
    //listFiles(oa2);
    getRows(oa2);
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
 * Create rows in the Data model from rows in the gsheet spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function getRows (auth) {
  const sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '',
    range: 'Production Data!A2:Z'
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
      const c = 0;
      // query api for last row in postgres data table and get the 'last_gdoc_row_id' from that record
      const q = Data.findAll({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]]
      })
      .then(entries => {
        console.log(entries.last_gdoc_row_id);
        return entries.last_gdoc_row_id || 0;
      })
      .catch(
        err => console.error(err);
      );
      for (const row of rows) {
        if (c > q) then { 
          // Print columns A thru Z, which correspond to indices 0 and 25.
          console.log(`${row[0]},${row[1]},${row[2]},${row[3]},${row[4]},${row[5]},${row[6]},${row[7]},${row[8]},${row[9]},${row[10]},${row[11]},${row[12]},${row[13]},${row[14]},${row[15]},${row[16]},${row[17]},${row[18]},${row[19]},${row[20]},${row[21]},${row[22]},${row[23]},${row[24]},${row[25]}`);
          // Construct the result object from each row and run create
          const resultObj = {
            date: row[0], //a
            deck_sn: row[1],
            motor_sn_l: row[2],
            motor_sn_r: row[3], //d
            motor_failure_code: row[4],
            motor_comments: row[5],
            motor_qa_sign_off: row[6],
            ma1_date: row[7],
            bcu_version: row[8], //i
            fw_version: row[9],
            main_board_sn: row[10],
            ma_failure_code: row[11],
            ma_comments: row[12],
            ma_qa_sign_off: row[13],
            pkg_date: row[14], //o
            remote_sn: row[15],
            battery_sn: row[16],
            battery_failure_code: row[17],
            battery_comments: row[18],
            battery_qa_sign_off: row[19],
            rflx_date: row[20], //u
            pcba_sn: row[21],
            external_sn: row[22],
            rflx_failure_code: row[23],
            rflx_comments: row[24],
            rflx_qa_sign_off: row[25],
            last_gdoc_row_id: rows.length,
          }
          Data.create(resultObj)
          .then(rush => res.status(201).send(rush))
          .catch(err => console.error(err));
          c += 1;
        }
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
