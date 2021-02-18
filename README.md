# mailbook-app
Simple, focused and clean email reader for Gmail

Since I don't feel like implementing a whole server side oAuth flow, you'll need to register your own Gmail API client for this. Follow the instructions here:

# How to Install

There are two options. If you want the quickest way, just grab one of the releases. 

### Option 1: Download a Release

Right side of the screen. 

### Option 2: Self Build

Clone the repo and run ```npx electron-forge make```. This might take some time, go do something else in the meanwhile. Find the exe in the ```out``` directory. 



# How to Use

Don't worry, you only need to do these steps once.

1. Go to [this page](https://developers.google.com/gmail/api/quickstart/nodejs#step_1_turn_on_the "Google Tutorial") and do ONLY STEP ONE. Click the button. For client type select "DESKTOP APP". Save the client config (using the button) as __```credentials.json```__ to the ```src``` directory wherever you downloaded the app. 
2. Confused? If you __installed__ the app, open explorer and navigate to ```%localappdata%/mailbook/app-1.0.0/resources/app/src```, save the config as __```credentials.json```__ in that folder.

# FAQ

* Do I have to allow MailBook through the defender firewall? 
* * NO. It asks for that only during authorization but it's not necessary at all. Just click cancel.
* Google is warning me this app is unverified! What do i do? 
* * You created it yourself. Don't worry about it, just click advanced and proceed. You'll see your own email in the publisher field.
