console.log('hi')

const request = require('./api')
const methods = require('./methods')
const replyParser = require("node-email-reply-parser");

global.fetch = fetch;

request(methods.listMessages, update, {count: 20, query: "in:inbox is:unread is:important -unsubscribe"})

async function update(i) {
    function insert(n) {
        var card = document.createElement('DIV');
        card.setAttribute('class', 'card')
        document.getElementById('mail_cards').appendChild(card);

        // SUBJECT
        // FROM
        var sub = ""
        var sub_field = document.createElement('DIV');
        for (const h in n.data.payload.headers) {
            if (n.data.payload.headers[h].name === "Subject") {
                sub = n.data.payload.headers[h].value
            }
        }
        sub_field.innerText = sub
            // .split('<')[0].replace(/[\[\]"]+/g, '');
        card.appendChild(sub_field)
        sub_field.setAttribute('class', 'title');


        // FROM
        var from = ""
        var from_field = document.createElement('DIV');
        for (const h in n.data.payload.headers) {
            if (n.data.payload.headers[h].name === "From") {
                from = n.data.payload.headers[h].value
            }
        }
        from_field.innerText = from.split('<')[0].replace(/[\[\]"]+/g, '');
        card.appendChild(from_field)
        from_field.setAttribute('class', 'title2');

        // CONTENT
        var dat = ""
        var contentstr = "";
        var contentcard = document.createElement('DIV');
        contentcard.setAttribute('class', 'card_content')
        try {
            if (n.data.payload.parts[0].body.data) {
                dat = n.data.payload.parts[0].body.data
            }
        } catch(err) { console.log('err') }

        try {
            if (n.data.payload.parts[0].parts[0].parts[0].body.data) {
                dat = n.data.payload.parts[0].parts[0].parts[0].body.data;
            }
        } catch(err){ console.log('err') }

        try {
            if (n.data.payload.parts[0].parts[0].body.data) {
                dat = n.data.payload.parts[0].parts[0].body.data
            }
        } catch(err){ console.log('err') }

        try {
            if (n.data.payload.body.data) {
                dat = n.data.payload.body.data
            }
        } catch(err){ console.log('err') }

        let buff = new Buffer.from(dat, 'base64').toString().substr(0, 300);
        // if (buff.toString().substr(0, 500).search(/On .*? wrote:/g)) {
        //     console.log('found reply')
        //     contentstr = buff.toString().substr(0, 500).split(/On .*? wrote:/g)[0]
        // } else {
        //     contentstr = buff.toString().substr(0, 500)
        // }
        contentstr = replyParser(buff, true).toString();
        if (contentstr !== "") {
            contentcard.innerHTML = contentstr;
            card.appendChild(contentcard)
        } else {
            document.getElementById('mail_cards').removeChild(card);
        }

        // distance listener thing

    }

    request(methods.getMessageList, insert, i)
}

// function init() {
//     document.getElementById("minimize").addEventListener("click", function (e) {
//         var window = BrowserWindow.getCurrentWindow();
//         window.minimize();
//     });
//
//     document.getElementById("minimize").addEventListener("click", function (e) {
//         var window = BrowserWindow.getCurrentWindow();
//         window.maximize();
//     });
//
//     document.getElementById("close").addEventListener("click", function (e) {
//         var window = BrowserWindow.getCurrentWindow();
//         window.close();
//         console.log('closing??')
//     });
// };
//
// document.onreadystatechange = function () {
//     if (document.readyState === "complete") {
//         console.log('ready')
//         init();
//     }
// }
