"use strict";

(function () {
    // Grab token from storage
    const token = localStorage.getItem("token");
    
    // Discord Gateway url
    const GATEWAY_URL = "wss://gateway.discord.gg/?v=9&encoding=json";
    
    // Websocket object
    let ws = null;
    
    // when page loads, connect to gateway
    window.onload = function () {
        connect();
    };
    
    // connect to gateway
    function connect() {
        ws = new WebSocket(GATEWAY_URL); // opens the websocket connection and creates WS object
        ws.onmessage = messageHandler; // on message event
        ws.onclose = connect; // reopen websockets when closed by discord
    }
    
    // called with websocket onmessage event
    function messageHandler(message) {
        let json = message.data; // string version of the JSON data
        json = JSON.parse(json);
        
        if (json.op == 10) { // hello gateway event
            doLogin();
        } else if (json.op == 0) { // dispatch gateway event
            if (json.t == "MESSAGE_CREATE") {
                let author = json.d.author.username;
                let userid = json.d.author.id;
                let avatar = json.d.author.avatar;
                let msg = json.d.content;
                let attachments = json.d.attachments;
                insertMessage(avatar, userid, author, msg, attachments);

                // Basic logs for RPC data and op handlers
                console.log(`%c[HellCord RPC]%c ${json}`, 'color: lightblue', 'color: white')
            }

            if (json.t == "MESSAGE_DELETE") {
                let msg = json.d.content;

                // Deleted message logger
                console.log(`%c[HellCord RPC]%c ${json}`, 'color: lightblue', 'color: white')
            }
        }
    }
    
    // logins to gateway with the given info
    function doLogin() {
        let msg = {
            "token": token,
            "properties": {
                "$os": "browser",
                "$browser": "chrome",
                "$device": "HellSec Was Here"
            },
            "compress": false
        };
        let payload = {"op": 2, "d": msg}; // identify
        ws.send(JSON.stringify(payload)); // make it into a JSON string & send it out the door
    }
    
    // provided the strings of avatar hash, username, and message, it appends a message element to the chatbox
    function insertMessage(avatar, userid, username, message) {
        let chatbox = document.getElementById("chatbox"); // whole outer chatbox containing all msgs

        if (message == ""){
            console.log('No Message')
            return;
        }

        let parent = document.createElement("div"); // a message container. contains avatar, username, and msg
        parent.classList.add("msg");

        if (avatar == "null" | avatar == null){
            let avatarImg = document.createElement("img"); // create img for avatar
            avatarImg.classList.add("ava");
            avatarImg.src = "images/profilePictures/pfp.png";
            parent.appendChild(avatarImg);
        }
        else{
            let avatarImg = document.createElement("img"); // create img for avatar
            avatarImg.classList.add("ava");
            avatarImg.src = "https://cdn.discordapp.com/avatars/" + userid + "/" + avatar + ".png";
            parent.appendChild(avatarImg);
        }
        
        let usernameDiv = document.createElement("div"); // username text element
        usernameDiv.classList.add("author");
        usernameDiv.innerText = username;
        parent.appendChild(usernameDiv);
        
        let messageDiv = document.createElement("p"); // message text element
        messageDiv.classList.add("text");
        messageDiv.innerText = message;
        parent.appendChild(messageDiv);

        console.log(message)
        
        chatbox.appendChild(parent); // last but not least, add message container to the chatbox
    }
})();