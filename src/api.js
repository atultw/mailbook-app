const fs = require('fs');
const {google} = require('googleapis');
const BrowserWindow = require('electron')
const path = require("path");

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(__dirname, 'token.json');

function ApiCall(method, callback, args) {
    fs.readFile(path.join(__dirname, 'credentials.json'), (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Gmail API.
        var credentials = JSON.parse(content);
        var {client_secret, client_id} = credentials.installed;
        var oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, 'http://localhost:3000/authorize');

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getNewToken(oAuth2Client, callback, method, args);
            oAuth2Client.setCredentials(JSON.parse(token));
            method(oAuth2Client, callback, args);
        });
    });
}

function getNewToken(oAuth2Client, callback, method, args) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    require('electron').shell.openExternal(authUrl);
    // mini server for authorization

    const express = require('express')()

    //express part
    express.get('/authorize', function (req, res) {
        oAuth2Client.getToken(req.query.code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            method(oAuth2Client, callback, args);

        });
        res.sendFile(path.join(__dirname, 'authorize.html'));
    });

    express.listen(3000, () => {
        console.log(`Example app listening at http://localhost:3000`)
    })

}

module.exports = ApiCall

