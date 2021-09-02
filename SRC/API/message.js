async function messageRequest(message, token, channelID) {
    await fetch(`https://discord.com/api/v9/channels/${channelID}/messages`, {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "*/*",
            "Accept-Language": "en-US",
            "Content-Type": "application/json",
            "Authorization": token,
            "X-Super-Properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRmlyZWZveCIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJlbi1VUyIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2OjkxLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvOTEuMCIsImJyb3dzZXJfdmVyc2lvbiI6IjkxLjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6OTYxNTcsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
            "X-Debug-Options": "bugReporterEnabled",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Sec-GPC": "1"
        },
        "body": `{\"content\":\"${message}\",\"tts\":false}`,
        "method": "POST",
        "mode": "cors"
    });
}

async function getMessages(token, channelID){
    await fetch(`https://discord.com/api/v9/channels/${channelID}/messages`, {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "*/*",
            "Accept-Language": "en-US",
            "Content-Type": "application/json",
            "Authorization": token,
            "X-Super-Properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRmlyZWZveCIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJlbi1VUyIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2OjkxLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvOTEuMCIsImJyb3dzZXJfdmVyc2lvbiI6IjkxLjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6OTYxNTcsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
            "X-Debug-Options": "bugReporterEnabled",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Sec-GPC": "1"
        },
        "method": "GET",
        "mode": "cors"
    });
}

async function sendMessage(message, token, channelID) {
    try {
        const jsonResp = messageRequest(message, token, channelID);
        console.log(jsonResp)
    }
    catch (error) {
        console.error(error);
    }
}

async function getMessage(token, channelID) {
    try {
        const jsonResp = getMessages(token, channelID);
        document.getElementById("app").append(jsonResp);
    }
    catch (error) {
        console.error(error);
    }
}