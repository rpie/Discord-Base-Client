const https = require('https')

function getMessages(channel, token){
    console.log(channel, token)
    const options = {
        hostname: 'https://discord.com',
        path: `api/v9/${channel}/messages`,
        port: 443,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }
    
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
        
            res.on('data', d => {
                process.stdout.write(d)
            })
        })
        
        req.on('error', error => {
        console.error(error)
    })
    
    req.end()
}
