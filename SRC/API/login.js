const got = require('got');
const notifier = require('node-notifier');

async function getUserInfofromToken(token) {
    const response = await got.get('https://discord.com/api/v9/users/@me', {
        headers: {
            authorization: token,
        },
        responseType: 'json',
    });

    return response;
}

async function getUserrelationships(token) {
    const response = await got.get('https://discord.com/api/v9/users/@me/relationships', {
        headers: {
            authorization: token,
        },
        responseType: 'json',
    });

    return response;
}

async function checkLogin(token) {
    try {
        const jsonResp = await getUserInfofromToken(token);
        const userinfo = JSON.parse(jsonResp.body)
        notifier.notify({
            'title': 'HellCord',
            'icon': 'images/logo.png',
            'message': `Now logging in as ${userinfo.username}#${userinfo.discriminator}`,
            'contentImage': 'images/logo.png',
            'wait': false
        });
        window.localStorage.setItem('token', token);
        window.location = 'home.html';
    }
    catch (error) {
        notifier.notify({
            'title': 'HellCord',
            'icon': 'images/logo.png',
            'message': `Invalid Token!`,
            'contentImage': 'images/logo.png',
            'wait': false
        });   
    }
}
