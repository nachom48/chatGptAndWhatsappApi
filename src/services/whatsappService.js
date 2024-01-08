
const https = require('https')


const sendMessageWhatsapp = (data) => {

    const options = {
        host: "graph.facebook.com",
        path: '/v17.0/171303802735472/messages',
        method: "POST",
        body:data,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer EAAOwOftkj8EBO10nUH2pypO6WVUVcNOQjtDNxhhs27w9ztXbyDfn7t8Q3D6Xz5q5fbCvxvYI57idJpMVdoaZCLvYZC9nDusyOH4C3HXREVywAvhiYaZB1E0CJmKMFYZBtcJE0ZA0h5EQ7SLYD9ijofuASSdlhKBmjnZChRdT7s1h1ZAMYkTGRLXoda7hFwjoBR7BjAxMZBq3PshlwewF"
        }
    };

    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d);
        });
    });

    req.on("error", error => {
        console.log("Este error tengo", error);
    });

    req.write(data);
    req.end();
}



module.exports = {
    sendMessageWhatsapp
}