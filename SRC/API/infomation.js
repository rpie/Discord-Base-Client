const got = require('got');

async function getRequestAPI(token) {
    const response = await got.get('https://discord.com/api/v9/users/@me', {
        headers: {
            authorization: token,
        },
        responseType: 'json',
    });

    return response;
}

async function getInfomation() {
    try {
        var token = localStorage.getItem("token"); 
        const jsonResp = await getRequestAPI(token);
        const userinfo = JSON.parse(jsonResp.body);

        const username = userinfo.username;
        const discrimi = userinfo.discriminator;
        
        const avatarEN = userinfo.avatar;
        const userID = userinfo.id;

        const avatar = `https://cdn.discordapp.com/avatars/${userID}/${avatarEN}`;

        document.getElementById("ava").src = avatar;
    }
    catch (error) {
        console.error(error);
    }
}
