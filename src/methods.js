/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const {google} = require("googleapis");

function listLabels(auth, callback) {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.labels.list({
        userId: 'me',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        callback(res.data.labels);
    });
}

function listMessages(auth, callback, args) {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.list({
        userId: 'me',
        maxResults: args.count,
        q: args.query
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        callback(res.data.messages);
    });
}

function getMessage(auth, callback, args) {
    var id = args;
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.get({
        userId: 'me',
        id: id
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        // var buf = Buffer.from(res.data.payload.body.data, 'base64').toString();
        var buf = res.data.snippet
        console.log(buf);
        callback(buf);
    });
}

function getMessageList(auth, callback, args) {
    const msgs = args;
    const gmail = google.gmail({version: 'v1', auth});
    function ret(dat, i) {
        gmail.users.messages.get({
            userId: 'me',
            id: msgs[i].id
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            // var buf = Buffer.from(res.data.payload.body.data, 'base64').toString();
            console.log(res)
            callback(res)
            if (msgs[i+1]){
                ret(dat, i+1)
            } else {
                // add final congrats message
                var card = document.createElement('DIV');
                card.setAttribute('class', 'card_last')
                document.getElementById('mail_cards').appendChild(card);
                card.innerHTML= "<img src='resources/check_circle_outline-24px.svg' width='96' alt='done!'><br><div>Great! You're done with all your emails.</div>"

                //end thing placeholder
                var card2 = document.createElement('DIV');
                card2.classList.add('card_blank')
                document.getElementById('mail_cards').appendChild(card2);

                console.log('end of messages')
            }
        });
    }

    ret(msgs, 0)

}

function getMessagesNative(auth, callback, args) {
    var msgs = []
    for (let i = 0; i < args.length; i++) {
        msgs.push(args[i].id)
    }
    const gmail = google.gmail({version: 'v1', auth});
    console.log(msgs)
    gmail.users.messages.get({
        userId: 'me',
        ids: msgs
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        // var buf = Buffer.from(res.data.payload.body.data, 'base64').toString();
        console.log(res)
    });

}

module.exports.listLabels = listLabels
module.exports.listMessages = listMessages
module.exports.getMessage = getMessage
module.exports.getMessageList = getMessageList
module.exports.getMessagesNative = getMessagesNative
